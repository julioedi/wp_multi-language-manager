<?php

namespace MultiLanguageManager;

class LangLanguagesTable
{
    public static $allLanguages = null;
    public static $allLanguageKeys = array();
    public static function get_all_languages()
    {
        if (self::$allLanguages) {
            return self::$allLanguages;
        }
        global $wpdb;
        $table = $wpdb->prefix . LangTable::$prefix . '_languages';
        self::$allLanguages = $wpdb->get_results("SELECT * FROM $table ");
        foreach (self::$allLanguages as $value) {
            $allLanguageKeys[$value->code] = $value;
        }
        return self::$allLanguages;
    }

    public static function language_exists(string $code)
    {
        self::get_all_languages();
        return array(
            "registered" => self::$allLanguageKeys
        );
    }


    public static function remove_language(string $code)
    {
        global $wpdb;

        ob_start();
        try {

            $table = $wpdb->prefix . LangTable::$prefix . '_languages';

            // Datos a insertar
            $deleted = $wpdb->delete($table, array('code' => $code), array('%s'));

            // Verificar si la inserción fue exitosa
            ob_end_clean();
            if (!empty($deleted)) {
                return true; // La inserción fue exitosa
            } else {
                return false; // Hubo un error en la inserción
            }
        } catch (\Exception $error) {
            ob_end_clean();
            return false;
        }
    }

    public static function add_language(string $code, $status = 1)
    {
        global $wpdb;

        ob_start();
        try {

            $table = $wpdb->prefix . LangTable::$prefix . '_languages';

            // Datos a insertar
            $data = array(
                'code' => $code,        // Código del idioma (por ejemplo: 'es', 'en', etc.)
                'active' => $status     // Estado del idioma (1 = activo, 0 = inactivo)
            );

            // Formato de los datos (definir el tipo de datos que estamos insertando)
            $format = array('%s', '%s'); // %s para strings, %d para enteros
            // Insertar el nuevo idioma en la tabla
            $wpdb->insert($table, $data, $format);

            // Verificar si la inserción fue exitosa
            ob_end_clean();
            if ($wpdb->insert_id) {
                return true; // La inserción fue exitosa
            } else {
                return false; // Hubo un error en la inserción
            }
        } catch (\Exception $error) {
            ob_end_clean();
            return false;
        }
    }

    public static $registered_translations = null;
    public static function register_routes()
    {
        register_rest_route('mlmt/v1', '/languages/', array(
            'methods' => 'GET',
            'callback' => [self::class, "get_languages_flags"],
            'permission_callback' => '__return_true',
        ));
    }


    public static function get_flag(string $flag, bool $file = false): bool|string
    {
        $path = "/assets/flags/$flag.svg";
        $route = mlmt_dir . $path;
        if (file_exists($route)) {
            if ($file) {
                return file_get_contents($route);
            }
            return true;
        }
        return false;
    }
    public static $languages_flags = null;
    public static function get_languages_flags()
    {

        if (self::$languages_flags) {
            return self::$languages_flags;
        }
        $languages = LangLanguagesTable::get_all_languages();
        require_once(ABSPATH . 'wp-admin/includes/translation-install.php');
        $translations = LangLanguagesAdmin::get_translation_laguages();

        $locale = get_locale();
        $translations_menu = array(
            "en_US" => array(
                "key"   => "en_US",
                "value" => LangLanguagesAdmin::get_tranlation_name(),
                "native_name" => "English (US)",
                "flag"  => self::get_flag("en_US")
            ),
        );
        foreach ($translations as $key => $value) {
            $translations_menu[$key] = array(
                "key" => $key,
                "value" => LangLanguagesAdmin::get_tranlation_name($key, $value),
                "native_name" => $value["native_name"],
                "flag"  => self::get_flag($key)
            );
        }

        self::$languages_flags =  array(
            "locale" => $locale,
            "languages" => array_map(function ($lang) {
                return $lang->code;
            }, $languages),
            "translations" => $translations_menu,
            "flags_folder" => mlmt_url . "/assets/flags",
            "default_flag" => "default",
            "lang" => mlmt_lang,
            "ajax" => admin_url('admin-ajax.php')
        );

        return self::$languages_flags;
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
