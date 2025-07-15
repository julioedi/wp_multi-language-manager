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
        if (isset($_POST["{$prefix}_add_language_nonce"]) && wp_verify_nonce($_POST["{$prefix}_add_language_nonce"], "{$prefix}_add_language")) {
            self::handle_form_submission();
        }

        // Obtener idiomas actuales
        $languages = LangLanguagesTable::get_all_languages();

        // Mostrar formulario y lista
        self::render_form($languages);
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
        require_once(ABSPATH . 'wp-admin/includes/translation-install.php');
        wp_enqueue_style("admin_language", mlmt_url . "/assets/css/admin.css");

        $list_languages    = \get_available_languages();
        $translations = self::get_translation_laguages();

        $locale = self::$locale;
        $languages_codes = array_map(function ($lang) {
            return $lang->code;
        }, $languages);


        $locale = get_locale();
        $translations_menu = array(
            "en_US" => array(
                "key" => "en_US",
                "value" => self::get_tranlation_name()
            ),
        );
        // if ($locale !== "en_US" &&  !in_array("en_US", $languages_codes)) {
            // $translations_menu["en_US"] = array(
            //     'language' => 'en_US',
            //     'version' => wp_get_wp_version(),
            //     'updated' => current_time('mysql'),
            //     'english_name' => 'English (United States)',
            //     'native_name' => 'English',
            //     'package' => 'https://downloads.wordpress.org/translation/core/6.8.1/en_US.zip',
            //     'iso' => array(
            //         1 => 'en',
            //         2 => 'eng'
            //     ),
            //     'strings' => array(
            //         'continue' => 'Continue'
            //     )
            // );
        // }
        foreach ($translations as $key => $value) {

            //prevent to add website default language
            // if ($key === $locale) {
            //     continue;
            // }
            // //exclude already installed languages
            // if (in_array($key, $languages_codes)) {
            //     continue;
            // }
            $translations_menu[$key] = array(
                "key" => $key,
                "value" => self::get_tranlation_name($key, $value)
            );
        }

        echo "<pre>";
        echo json_encode(array(
            "locale" => $locale,
            "translations" => (array) $translations_menu,
            "languages" => $languages
        ),JSON_PRETTY_PRINT);
        // echo json_encode(array_merge(
        //     array(
        //         "en_US" => "English USA"
        //     ),
        //     array_map(function ($lang) {
        //         return $lang["english_name"];
        //     }, $translations)
        // ),JSON_PRETTY_PRINT);
        echo "</pre>";
        // echo $locale;
?>
        <div class="wrap">
            <h1>Language Manager</h1>

            <form method="post" style="margin-bottom: 2em;">
                <?php wp_nonce_field('mlmt_add_language', 'mlmt_add_language_nonce'); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="active">Active</label></th>
                        <td><input name="active" id="active" type="checkbox" checked></td>
                    </tr>
                    <tr>
                        <th><label for="code">Language</label></th>
                        <th>
                            <select name="code" id="code" class="custom-select-class">
                                <option hidden selected value="">
                                    <?php
                                    echo esc_html(__("Select new language", mlmt_lang));
                                    ?>
                                </option>
                                <?php
                                /*
                                $images = mlmt_url . "/assets/flags";
                                foreach ($translations_menu as $key => $value) {
                                    $svg = "$images/$key.svg";
                                    echo "<option data-icon='$svg'>";
                                    echo self::get_tranlation_name($key, $value);
                                    echo "</option>";
                                }
                                    */
                                ?>
                            </select>
                            <?php

                            // wp_dropdown_languages(
                            //     array(
                            //         'name'                        => 'code',
                            //         'id'                          => 'code',
                            //         'selected'                    => '',
                            //         'show_option_en_us'           => $locale !== "en_US" && !in_array("en_US", $languages_codes),
                            //         'languages'                   => $list_languages,
                            //         'translations'                => $translations_menu,
                            //         'show_available_translations' => current_user_can('install_languages') && wp_can_install_language_pack(),
                            //     )
                            // );
                            ?>
                        </th>
                    </tr>
                </table>
                <input type="submit" class="button button-primary" value="Add Language">
            </form>

            <h2>Existing Languages</h2>
            <table class="widefat fixed striped">
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    <?php
                    $name = self::get_tranlation_name($locale);
                    ?>

                    <td><?php echo esc_html($locale) ?></td>
                    <td><?php echo esc_html("$name " . __("(Default)", mlmt_lang)); ?></td>
                    <td><?php echo esc_html(__("Active", mlmt_lang)); ?></td>
                    <?php
                    foreach ($languages as $lang) :
                        if ($lang->code == $locale) {
                            continue;
                        }
                    ?>
                        <tr>
                            <td><?php echo esc_html($lang->code); ?></td>
                            <td>
                                <?php
                                $name = $lang->code;
                                echo self::get_tranlation_name($lang->code);
                                ?>
                            </td>
                            <td><?php echo esc_html($lang->active ? __("Active", mlmt_lang) : __("Deactivated", mlmt_lang)); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
<?php
    }
}
