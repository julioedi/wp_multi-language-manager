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


trait TraitLangCacheElements
{
    public static $cache_elements_ids = array();
    public static function get_cache_element(string|int $id)
    {
        if (!is_numeric($id)) {
            return null;
        }
        if (isset(self::$cache_elements_ids["cache_{$id}"])) {
            return self::$cache_elements_ids["cache_{$id}"];
        }
        return null;
    }

    public static function set_cache_element(string|int $id, array|object $data): bool
    {
        if (!is_numeric($id)) {
            return false;
        }

        if (isset(self::$cache_elements_ids["cache_{$id}"])) {
            return false;
        }
        self::$cache_elements_ids["cache_{$id}"] = $data;
        return true;
    }

    public static $cached_ids = [];
    public static function is_cached_id(int|string $id): bool
    {
        if (!is_numeric($id)) {
            return false;
        }
        return in_array($id, self::$cached_ids);
    }

    public static $name = "";
    public static function set_cached_name(string $name): void
    {
        self::$name = $name;
    }

    public static function wp_cached_element(int|string $id, array|object $data): bool
    {
        if (!is_numeric($id)) {
            return false;
        }
        $id = (int)  $id;
        // self::$name;
        if (self::is_cached_id($id)) {
            return false;
        }
        self::$cached_ids[] = $id;
        global $wp_object_cache;
        $wp_object_cache->set($id, $data, self::$name);
        return true;
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
