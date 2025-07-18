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
        // add_action("the_post", [$this, "get_single_translation"]);
        add_action('template_redirect', [$this, "template_redirect"]);
        // add_action("posts_results", [$this, "posts_results"], 10, 2);
        add_action("admin_init", [$this, "admin_init"]);

        add_action("posts_results", [$this, "query_loop_start"], 10, 2);
        add_filter('the_posts', [$this, 'filter_posts'], 10, 2);

        new LangLanguagesAdminColumns("posts", "post");
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
                    global $wp_object_cache;
                    foreach ($results as $value) {
                        if (isset($PreData["post_{$value->ID}"])) {
                            $single = new \WP_Post($value);
                            self::wp_cached_element($value->ID,$single);
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
        if (is_admin()) {
            $lang = isset($_GET["lang"]) ? $_GET["lang"] : null;
        } else {
            $lang = get_query_var("lang", null);
        }

        $lang = LangLanguagesTable::valid_lang($lang);
        if (!$lang) {
            return;
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
            $post = &$translated;
            $GLOBALS["post"] = &$translated;
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
