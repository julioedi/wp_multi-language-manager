<?php

namespace MultiLanguageManager;

class LangPosts extends LangTable
{
    public function __construct()
    {
        parent::__construct('posts', 'ID');
    }

    public function register_hooks()
    {
        add_action('delete_post', [$this, 'delete_translations']);
        add_action("the_post", [$this, "get_single_translation"]);
        add_action( 'template_redirect', [$this,"template_redirect"] );
    }

    public function template_redirect(){
        if (is_single() || is_singular() || is_front_page()) {
           $this->get_single_translation();
        }
    }

    public function delete_translations($post_id)
    {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['ID' => $post_id]);
    }


    use TraitLangPostTypes;
    use TraitLangGetFlags;

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
    public function get_single_translation()
    {
        global $wpdb, $post;
        if (!$post) {
            return;
        }
        $flags = self::get_flags();
        //languages

        // Obtener el ID del post
        $lang = get_query_var("lang", "");
        if (empty($lang) || !in_array($lang, $flags["languages"])) {
            return;
        }

        $post_id = $post->ID;
        $table = $this->duplicate_table;
        $translated = $this->get_translation_post($post_id, $lang);


        if ($translated) {
            // $translated->post_id = $translated->ID;
            // unset($translated->post_id);
            // usnet($translated->lang);
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
            $newData[$key] = $value;
        }


        $newData["lang"] = $lang;
        $wpdb->insert(
            $table,
            $newData
        );
    }
}
