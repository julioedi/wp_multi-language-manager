<?php

namespace MultiLanguageManager;

class LangLanguagesTable
{
    public static $allLanguages = null;
    public static function get_all_languages()
    {
        if (self::$allLanguages) {
            return self::$allLanguages;
        }
        global $wpdb;
        $table = $wpdb->prefix . LangTable::$prefix . '_languages';
        self::$allLanguages = $wpdb->get_results("SELECT * FROM $table ");
        return self::$allLanguages;
    }


    public static $registered_translations = null;
    public static function register_routes()
    {
        register_rest_route('mlmt/v1', '/languages/', array(
            'methods' => 'GET',
            'callback' => [self::class, "api_languages"],
        ));
    }

    public static function api_languages(\WP_REST_Request $request)
    {
        require_once(ABSPATH . 'wp-admin/includes/translation-install.php');
        $translations = LangLanguagesAdmin::get_translation_laguages();

        $locale = get_locale();
        $translations_menu = array(
            "en_US" => array(
                "key" => "en_US",
                "value" => LangLanguagesAdmin::get_tranlation_name()
            ),
        );
        foreach ($translations as $key => $value) {
            $translations_menu[$key] = array(
                "key" => $key,
                "value" => LangLanguagesAdmin::get_tranlation_name($key, $value)
            );
        }

        return array(
            "locale" => $locale,
            "translations" => (array) $translations_menu,
            "languages" => $translations_menu
        );
    }

    public static function insert_language($data)
    {
        global $wpdb;
        $table = $wpdb->prefix . LangTable::$prefix . 'languages';

        // Validar que no exista código duplicado
        $exists = $wpdb->get_var($wpdb->prepare("SELECT id FROM $table WHERE code = %s", $data['code']));
        if ($exists) {
            return false;
        }


        return $wpdb->insert($table, $data);
    }
}
