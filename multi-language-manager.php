<?php

/**
 * Plugin Name: Multiple Language Manager Translation
 * Description: Create atomatic translations for wordpress post, terms ...
 * Version: 1.0
 * Author: Julioedi
 */

namespace MultiLanguageManager;

if (!defined('ABSPATH')) exit;

if (!defined("mlmt_dir")) {
    define("mlmt_dir", __DIR__);
}
if (!defined("mlmt_lang")) {
    define("mlmt_lang", "multi_language_manager_translation");
}
if (!defined("mlmt_url")) {
    define("mlmt_url", plugin_dir_url(__FILE__));
}
require_once mlmt_dir . "/classes/lang_query.php";
require_once mlmt_dir . "/classes/adminpage.php";
require_once mlmt_dir . "/classes/langtable.php";
require_once mlmt_dir . "/classes/traits.php";
require_once mlmt_dir . "/classes/posts.php";
require_once mlmt_dir . "/classes/postmeta.php";
require_once mlmt_dir . "/classes/terms.php";
require_once mlmt_dir . "/classes/termsmeta.php";
require_once mlmt_dir . "/classes/termtaxonomy.php";
require_once mlmt_dir . "/classes/usersmeta.php";
require_once mlmt_dir . "/classes/options.php";
require_once mlmt_dir . "/classes/restapi.php";
require_once mlmt_dir . "/classes/blocks.php";

class MultiLanguageManagerPlugin
{
    /**
     * @var LangTable[]
     */
    private $tables = [];
    public function __construct()
    {
        // Initialize all multilingual tables handlers
        $this->tables = [
            new LangPosts(),
            new LangPostMeta(),
            new LangTerms(),
            new LangTermsMeta(),
            new LangTermTaxonomy(),
            new LangUsersMeta(),
            new LangOptions(),
        ];


        $prefix = LangTable::$prefix;
        register_activation_hook(__FILE__, [$this, 'on_activate']);

        add_action('init', [$this, 'register_all_hooks']);
        add_action('admin_menu', [$this, "register_admin_page"]);
        add_action("admin_enqueue_scripts", [$this, "register_admin_head"]);
        add_filter("query_vars", [$this, "query_vars"]);
        add_action("rest_api_init", [$this, "register_routes"]);

        add_filter("do_parse_request", [$this, "parse_request"], 10, 3);

        add_action("wp_ajax_{$prefix}_update_admin_language", [LangLanguagesAdmin::class, "update_table_data"]);
        add_action("template_redirect", [$this, "url"]);
        add_filter("user_trailingslashit", [$this,"user_trailingslashit"]);
        add_filter("wp_get_nav_menu_items",[$this,"wp_get_nav_menu_items"]);

    }

    public function wp_get_nav_menu_items($menu_items){
        $lang =  get_query_var("lang", null);
        if (!$lang) {
            return $menu_items;
        }
        $lang = explode("_",$lang);
        foreach ($menu_items as &$item) {
            if (preg_match("/^\//",$item->url) && !preg_match("/^\/\//",$item->url)) {
                $item->url = "/" . $lang[0] . $item->url;
            }
        }
        return $menu_items;
    }

    public function user_trailingslashit($url)
    {
        $lang =  get_query_var("lang", null);
        if (!$lang) {
            return $url;
        }
        $lang = explode("_", $lang);
        if (preg_match("/^http\:/", $url)) {
            return preg_replace("/^(http\:\/\/.*?\/)/", "$1" . $lang[0] . "/", $url);
        }
        return $lang[0] . $url;
    }

    public $got_lang = null;
    public $langCode = null;
    public function url()
    {
        if (!$this->got_lang) {
            return;
        }
        set_query_var('lang', $this->got_lang);
    }
    public function parse_request($wp, $class, $extra_query_vars)
    {
        global $wp_rewrite, $extra_query_vars;
        if (!isset($_SERVER["REDIRECT_URL"])) {
            return $wp;
        }
        $_SERVER["REDIRECT_URL"] = preg_replace("/\/+/", "/", $_SERVER["REDIRECT_URL"]);
        if (isset($_SERVER["REDIRECT_QUERY_STRING"]) && strpos($_SERVER["REDIRECT_QUERY_STRING"], "lang=")) {
            return $wp;
        }
        $regReplace = "/^\/([a-z]{2,4})($|\/(.*?)$|(.*?)$)/i";
        if (!preg_match($regReplace, $_SERVER["REQUEST_URI"])) {
            return $wp;
        }
        $langCode = preg_replace($regReplace, "$1", $_SERVER["REQUEST_URI"]);
        $langCode = strtolower($langCode);
        $langs = LangLanguagesTable::get_all_languages();

        $currentLang = null;
        foreach ($langs as $lang) {
            $code = preg_replace("/^(\w+)_.*?$/i", "$1", $lang->code);
            if ($code == $langCode) {
                $currentLang = $lang->code;
                break;
            }
        }
        if (!$currentLang) {
            return $wp;
        }

        /**
         * Modify the server request before to parse and keep asolutes url like "/es/my-post/" processed as "/my-post/"
         */
        if (!isset($_SERVER["QUERY_STRING"])) {
            $_SERVER["QUERY_STRING"] = "";
        }

        $_SERVER["QUERY_STRING"] = trim($_SERVER["QUERY_STRING"]);
        if (!isset($_SERVER["REDIRECT_QUERY_STRING"])) {
            $_SERVER["REDIRECT_QUERY_STRING"] = "";
        }
        if (empty($_SERVER["QUERY_STRING"])) {
            $_SERVER["QUERY_STRING"] = "lang=" . $currentLang;
            $_SERVER["REQUEST_URI"] .= "?lang=" . $currentLang;
            $_SERVER["REDIRECT_QUERY_STRING"] .= "lang=" . $currentLang;
        } else {
            $_SERVER["QUERY_STRING"] .= "&lang=" . $currentLang;
            $_SERVER["REQUEST_URI"] .= "&lang=" . $currentLang;
            $_SERVER["REDIRECT_QUERY_STRING"] .= "&lang=" . $currentLang;
        }

        $_SERVER["REQUEST_URI"] = preg_replace($regReplace, "$2", $_SERVER["REQUEST_URI"]);
        $_SERVER["REDIRECT_URL"] = preg_replace($regReplace, "$2", $_SERVER["REDIRECT_URL"]);
        $this->got_lang = $currentLang;
        $this->langCode = $langCode;
        $wp_rewrite->add_rule("^{$langCode}/$", 'index.php');
        $wp_rewrite->add_rule("^{$langCode}/(.+)$", 'index.php?pagename=$matches[1]');
        add_filter("locale", function () use ($currentLang) {
            return $currentLang;
        }, 10);
        return $wp;
    }

    public function register_routes()
    {
        LangRestApi::init();
        LangLanguagesTable::register_routes();
    }

    public function query_vars($query_vars)
    {
        if (!in_array("lang", $query_vars)) {
            $query_vars[] = "lang";
            $query_vars[] = "lang_force";
        }
        return $query_vars;
    }


    public function register_admin_head($hook_suffix)
    {
        if ("toplevel_page_mlmt-language-manager" !== $hook_suffix) {
            return;
        }
        wp_enqueue_script(
            "mlmt_admin",
            // mlmt_url . "/assets/js/mlmt_admin.js",
            "http://localhost:3000/bundle.js",
            array(
                'wp-i18n',
            ),
            null,
            array(
                "strategy" => "defer"
            )
        );
        wp_enqueue_style("mlmt_admin", mlmt_url . "/assets/css/mlmt_admin.css");
        $data = LangLanguagesTable::get_languages_flags();
        wp_localize_script('mlmt_admin', 'mlmtData', $data);
    }
    public function register_admin_page()
    {
        add_menu_page(
            'Language Manager',           // Título página
            'Language Manager',           // Título menú
            'manage_options',             // Capability
            'mlmt-language-manager',      // Slug
            [LangLanguagesAdmin::class, 'render_admin_page'],  // Callback
            'dashicons-translation',      // Icono
            20                           // Posición
        );
    }

    public function render_admin_page() {}

    public function create_languages_table()
    {
        global $wpdb;
        $prefix = LangTable::$prefix;

        $table = $wpdb->prefix . $prefix . '_languages';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE $table (
            id INT NOT NULL AUTO_INCREMENT,
            code VARCHAR(10) NOT NULL,
            active TINYINT(1) DEFAULT 1,
            PRIMARY KEY (id),
            UNIQUE KEY code_unique (code)
        ) $charset_collate COMMENT='Languages supported by MLMT plugin';";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
    }

    protected $default_tables = [
        'posts',
        'postmeta',
        'terms',
        'term_taxonomy',
        'termmeta',
        'usermeta',
        'options',
        // más tablas permitidas...
    ];



    public function on_activate()
    {
        $this->create_languages_table();
        foreach ($this->tables as $table_handler) {
            if ($table_handler instanceof LangTable && method_exists($table_handler, 'activate')) {
                $table_handler->activate();
            }
        }
    }

    public function register_all_hooks()
    {
        foreach ($this->tables as $table_handler) {
            if ($table_handler instanceof LangTable && method_exists($table_handler, 'register_hooks')) {
                $table_handler->register_hooks();
            }
        }
    }
}

do_action("before_mlmt_init");
new MultiLanguageManagerPlugin();
do_action("after_mlmt_init");
