<?php

namespace MultiLanguageManager;

class LangPosts extends LangTable
{

    use TraitLangPostTypes;
    use TraitLangGetFlags;
    use TraitLangCacheElements;
    public function __construct()
    {
        parent::__construct('posts', 'ID');
    }

    public function register_hooks()
    {
        self::set_cached_name("posts");
        add_action('delete_post', [$this, 'delete_translations']);
        add_action("the_post", [$this, "get_single_translation"]);
        add_action('template_redirect', [$this, "template_redirect"]);
        add_action("posts_results", [$this, "posts_results"], 10, 2);
        add_action("admin_init", [$this, "admin_init"]);

        add_action("posts_results", [$this, "query_loop_start"], 10, 2);
        add_filter('the_posts', [$this, 'filter_posts'], 10, 2);



        add_action("replace_editor", [$this, "gutemberg_change_posts"], 10, 2);


        add_action("pre_post_update", [$this, "pre_post_update"], 10, 2);

        add_filter("block_editor_rest_api_preload_paths", [$this, "block_editor_rest_api_preload_paths"], 0);

        add_filter("rest_prepare_autosave", [$this, "rest_prepare_autosave"], 10, 3);
        add_filter("wp_insert_post_data", [$this, "wp_insert_post_data"], 10, 4);

        add_action("rest_prepare_post", [$this, "rest_prepare_post"], 10, 3);

        new LangLanguagesAdminColumns("posts", "post");
    }


    public function rest_prepare_post($response, $post, $request)
    {
        $lang = get_query_var("lang", null);
        if (!$lang) {
            $lang = LangLanguagesTable::get_admin_lang();
        }
        $lang = LangLanguagesTable::valid_lang($lang);
        if ($lang) {
            if (isset($response->data['guid']['rendered']) && is_string($response->data['guid']['rendered'])) {
                $response->data['guid']['rendered'] = add_query_arg("lang", $lang, $response->data['guid']['rendered']);
            }

            if (isset($response->data['link']) && is_string($response->data['link'])) {
                $response->data['link'] = LangLanguagesTable::add_lang_var_link($response->data['link'], $lang);
            }
            $links = $response->get_links();
            foreach ($links as $linkKey => &$_links) {
                foreach ($_links as $key => $value) {
                    if (isset($value["href"])) {
                        $_links[$key]["href"] = LangLanguagesTable::add_lang_var_link($value["href"], $lang, false);
                    }
                }
                $response->remove_link($linkKey);
            }
            $response->add_links($links);
        }
        return $response;
    }


    public function wp_insert_post_data($data, $postarr, $unsanitized_postarr, $update)
    {
        $lang = get_query_var("lang", null);
        if (!$lang) {
            $lang = LangLanguagesTable::get_admin_lang();
        }
        $lang = LangLanguagesTable::valid_lang($lang);
        if (!$lang) {
            return $data;
        }
        return $data;
    }


    public function rest_prepare_autosave($response, $autosave, $request)
    {
        if (!isset($autosave->parent)) {
            return $response;
        }
        add_filter("wp_insert_post_data", [$this, "post"]);
        $dataRequest = print_r($request, true);
        $myfile = fopen(ABSPATH . "/testfile.txt", "w");
        fwrite($myfile, json_encode([$_SERVER, $autosave], JSON_PRETTY_PRINT) . $dataRequest);
        fclose($myfile);

        return $response;
    }


    public function modifyPath(mixed $data)
    {
        $lang = LangLanguagesTable::get_admin_lang();
        if (!$lang) {
            return $data;
        }

        if (is_string($data)) {
            // Solo modificar si contiene "/wp/" y no tiene ya el lang
            if (preg_match("/\/wp\//i", $data) && strpos($data, 'lang=') === false) {
                // if (!preg_match("/\/wp\/v\d+\/posts\/\d+/i", $data)) {
                $data = add_query_arg("lang", $lang, $data);   # code...
                // }

                echo "<pre>$data</pre>";
            }
            return $data;
        }

        if (is_array($data)) {
            foreach ($data as $key => $value) {
                $data[$key] = $this->modifyPath($value);
            }
            return $data;
        }

        // Ignorar si no es string ni array
        return $data;
    }



    public function block_editor_rest_api_preload_paths($preload_paths)
    {
        $lang = LangLanguagesTable::get_admin_lang();
        if ($lang) {
            switch_to_locale($lang);
            $preload_paths = $this->modifyPath($preload_paths);
        }
        return $preload_paths;
    }

    public function pre_post_update($post_id, $data)
    {
        return $post_id;
    }


    public $single_translation = null;


    public function gutemberg_change_posts($val)
    {

        if ($this->single_translation == true) return $val;


        global $pagenow;
        if (!in_array($pagenow, ["post.php"])) return $val;
        $lang = LangLanguagesTable::get_admin_lang();
        global $post;
        if (!$lang || !$post) {
            return $lang;
        }

        $this->single_translation = true;
        $translation = $this->get_translation_post($post->ID, $lang);
        if ($translation) {
            $post = new \WP_Post($translation);
            $GLOBALS["post"] = $translation;
            self::wp_cached_element($post->ID, $post);
        }
        return $val;
    }

    public function filter_posts($posts, $query)
    {
        if (!LangLanguagesTable::$is_front_lang || empty($posts)) {
            return $posts;
        }

        if ($posts[0]->post_type === 'post') {
            $PreData = array();
            $ids = [];

            foreach ($posts as $key => $post) {
                if (self::is_cached_id($post->ID)) {
                    continue;
                }
                $PreData["post_{$post->ID}"] = $key;
                $ids[] = $post->ID;
            }
            if (!empty($ids)) {
                $results = $this->get_translation_ids($ids);
                if (is_array($results) && !empty($results)) {
                    foreach ($results as $value) {
                        if (isset($PreData["post_{$value->ID}"])) {
                            $single = new \WP_Post($value);
                            self::wp_cached_element($value->ID, $single);
                            $posts[$PreData["post_{$value->ID}"]] = new \WP_Post($value);
                        }
                    }
                }
            }
        }

        return $posts;
    }

    public function query_loop_start($posts, $query)
    {
        if (!LangLanguagesTable::$is_front_lang || !$posts || empty($posts)) {
            return $posts;
        }

        $PreData = array();
        $ids = [];
        foreach ($posts as $key => $post) {
            $PreData["post_{$post->ID}"] = $key;
            $ids[] = $post->ID;
        }
        $results = $this->get_translation_ids($ids);
        if (is_array($results)) {
            foreach ($results as $value) {
                if (isset($PreData["post_{$value->ID}"])) {
                    $posts[$PreData["post_{$value->ID}"]] = $value;
                }
            }
        }

        return $posts;
    }

    public function admin_init()
    {
        if (!is_admin()) {
            return;
        }
        $lang = isset($_GET["lang"]) ? $_GET["lang"] : null;

        $lang = LangLanguagesTable::valid_lang($lang);
        if (!$lang) {
            return;
        }
        global $pagenow;
        if ($pagenow === "post.php") {
            // echo "<pre>";
            // print_r($GLOBALS);
            // echo "</pre>";
            // die();
        }
    }

    public function posts_results($posts, $query)
    {
        if (empty($posts)) return $posts;

        if (!isset($query->query_vars['lang'])) {
            return $posts;
            echo $query->query_vars['lang'];
        }
        $lang = $query->query_vars['lang'];
        $lang = LangLanguagesTable::valid_lang($lang);
        if ($lang == null) {
            return $posts;
        }
        $PreData = array();
        $ids = [];
        foreach ($posts as $key => $post) {
            $PreData["post_{$post->ID}"] = $key;
            $ids[] = $post->ID;
        }
        $results = $this->get_translation_ids($ids);
        if (is_array($results)) {
            foreach ($results as $value) {
                if (isset($PreData["post_{$post->ID}"])) {
                    $posts[$PreData["post_{$post->ID}"]] = $value;
                }
            }
        }
        return $posts;
    }

    public function template_redirect()
    {
        if (is_single() || is_singular() || is_front_page()) {
            $this->get_single_translation();
        }
    }

    public function delete_translations($post_id)
    {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['ID' => $post_id]);
    }

    public function get_translation_post($id, $lang)
    {

        $table = $this->duplicate_table;
        global $wpdb;
        $translated = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM `$table` WHERE ID = %d AND lang = %s",
            array(
                $id,
                $lang
            )
        ));
        if ($translated) {
            return $translated;
        }
        return null;
    }


    public function get_translation_ids(array $ids)
    {
        $ids = array_filter($ids, function ($id) {
            return is_numeric($id);
        });

        if (empty($ids)) {
            return [];
        }

        $baseResults = [];
        $preIds = $ids;

        //use cache items if aready called;
        foreach ($preIds as $key => $id) {
            $post = self::get_cache_element($id);
            if ($post) {
                $baseResults[] = $post;
                unset($preIds[$key]);
            }
        }
        global $wpdb;
        $table = $this->duplicate_table;
        $placeholders = implode(',', array_fill(0, count($preIds), '%d'));
        // $original = $wpdb->get_row($wpdb->prepare("SELECT * FROM `{$table}` WHERE id = %d",$ids));
        $query = $wpdb->prepare("SELECT * FROM `{$table}` WHERE id IN ($placeholders)", ...$ids);
        $results = $wpdb->get_results($query);
        return array_merge(
            $results,
            $baseResults
        );
    }

    public $force_lang = true;
    public function get_single_translation()
    {
        global $wpdb, $post;
        if (!$post) {
            return;
        }
        $flags = self::get_flags();
        //languages

        // Obtener el ID del post
        $lang = get_query_var("lang", null);
        $lang  = LangLanguagesTable::valid_lang($lang);
        if (!$lang) {
            return $post;
        }
        if (empty($lang) || !in_array($lang, $flags["languages"])) {
            return;
        }
        $post_id = $post->ID;
        $table = $this->duplicate_table;
        $translated = $this->get_translation_post($post_id, $lang);


        if ($translated) {
            if (isset($translated->guid)) {
                $translated->guid = add_query_arg("lang", $lang, $translated->guid);
            }
            $post = $translated;
            $GLOBALS["post"] = &$translated;
            self::wp_cached_element($post->ID, $post);
            return;
        }

        if (!is_user_logged_in()) {
            return;
        }


        $force_lang = get_query_var("lang_force", null);
        if (empty($force_lang)) {
            return;
        }
        $original = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$wpdb->posts} WHERE id = %d", $post_id));

        if (!$original) {
            return;
        }

        foreach ($original as $key => $value) {
            if ($key == "guid") {
                $value .= "&lang=" . $lang;
            }
            $newData[$key] = $value;
        }


        $newData["lang"] = $lang;
        $wpdb->insert(
            $table,
            $newData
        );
    }
}
