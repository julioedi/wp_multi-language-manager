<?php

namespace MultiLanguageManager;

class LangLanguagesAdmin
{
    public static function render_admin_page()
    {
        if (!current_user_can('manage_options')) {
            wp_die('No permission.');
        }

        $prefix = LangTable::$prefix;
        // Procesar formulario si se envió
        $nonce = "{$prefix}_update_language_nonce";
        $field = "{$prefix}_update_language";

        // Obtener idiomas actuales
        $languages = LangLanguagesTable::get_all_languages();

        // Mostrar formulario y lista

        wp_nonce_field($nonce, $field);
        self::render_form($languages);
    }

    public static function update_table_data()
    {

        $prefix = LangTable::$prefix;
        // Procesar formulario si se envió
        $nonce = "{$prefix}_update_language_nonce";
        if (!isset($_POST["nonce"]) || !wp_verify_nonce($_POST["nonce"], $nonce)) {
            wp_send_json_error(array(
                "code" => 401,
                "message" => __("Unauthorized", mlmt_lang),
                "post" => $_POST
            ), 401);
            die();
        }
        if (!isset($_POST["code"]) || !is_string($_POST["code"])) {
            wp_send_json_error(array(
                "code" => 400,
                "message" => __("Language code missing", mlmt_lang)
            ), 400);
            die();
        }

        $code = $_POST["code"];
        LangLanguagesTable::get_all_languages();
        if (isset(LangLanguagesTable::$allLanguageKeys[$code])) {
            wp_send_json_error(array(
                "code" => 409,
                "message" => __("Language already exists", mlmt_lang)
            ), 409);
            die();
        }
        
        if (isset($_POST["delete"])) {
            $error = null;
            try {
                $deleted = LangLanguagesTable::remove_language($code);
            } catch (\Exception $e) {
                $error = $e;
                $deleted = false;
            }
            if ($deleted === false) {
                wp_send_json_error(array(
                    "code" => 409,
                    "message" => __("Something get wrong", mlmt_lang),
                    "error" =>$error
                ), 409);
                die();
            }
            wp_send_json(array(
                "code" => 200,
                "message" => __("Language deleted", mlmt_lang),
                "error" => $deleted
            ), 200);

            die();
        }


        try {
            $added = LangLanguagesTable::add_language($code);
        } catch (\Exception $e) {
            $added = false;
        }

        if ($added === false) {
            wp_send_json_error(array(
                "code" => 409,
                "message" => __("Language already exists", mlmt_lang)
            ), 409);
            die();
        }
        wp_send_json(array(
            "code" => 200,
            "message" => __("Language added", mlmt_lang),
            "added" => $added
        ), 200);
        die();
    }

    public static $translation_laguages = array();

    public static $locale = "en_us";
    public static function get_translation_laguages()
    {
        if (empty($translation_laguages)) {

            $locale = get_locale();
            self::$locale = $locale;
            self::$translation_laguages = \wp_get_available_translations();
        }
        return self::$translation_laguages;
    }
    public static function get_tranlation_name(string $code = "en_US", $item = null)
    {
        $translations = self::get_translation_laguages();
        if ($item) {
            if (self::$locale === $code) {
                return $item["native_name"];
            }
            return __($item["english_name"]);
        }
        if ($code === "en_US") {
            return __("English (US)", mlmt_lang);
        }
        if (!isset($translations[$code]) || !isset($translations[$code]["english_name"])) {
            return ucfirst(preg_replace("/\+/", " ", $code));
        }
        if (self::$locale === $code) {
            return $translations[$code]["native_name"];
        }
        return __($translations[$code]["english_name"]);
    }


    protected static function handle_form_submission()
    {
        $code = sanitize_text_field($_POST['code'] ?? '');
        $active = isset($_POST['active']) ? 1 : 0;

        if (!$code || !$active) {
            echo '<div class="notice notice-error"><p>' . __("Please fill all required fields.", mlmt_lang) . '</p></div>';
            return;
        }

        // Insertar nuevo idioma
        $inserted = LangLanguagesTable::insert_language(compact('code', 'active'));

        if ($inserted) {
            echo '<div class="notice notice-success"><p>' . __("Language added successfully.", mlmt_lang) . '</p></div>';
        } else {
            echo '<div class="notice notice-error"><p>' . __("Failed to add language (maybe code already exists)", mlmt_lang) . '.</p></div>';
        }
    }

    protected static function render_form($languages)
    {
        echo '<div id="root"></div>';
    }
}
