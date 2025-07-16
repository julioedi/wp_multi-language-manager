<?php

namespace MultiLanguageManager;

trait TraitLangPostTypes
{
    public static $post_types = null;
    public static function get_post_types(): \WP_Post_Type|array
    {
        if (self::$post_types) {
            return self::$post_types;
        }
        $get_post_types = get_post_types();
        self::$post_types = array_filter($get_post_types, function ($item) {
            if (preg_match("/^(wp_|custom|oembed|nav_|user_)/", $item)) {
                return false;
            }
            return true;
        });
        return self::$post_types;
    }
}


trait TraitLangGetFlags
{
    public static $language_flags = null;
    public static function get_flags()
    {
        if (self::$language_flags) {
            return self::$language_flags;
        }
        self::$language_flags = LangLanguagesTable::get_languages_flags();
        return self::$language_flags;
    }
}
