<?php

/**
 * Plugin Name: Multiple Language Manager Translation
 * Description: Create atomatic translations for wordpress post, terms ...
 * Version: 1.0
 * Author: Julioedi
 */

namespace MultiLanguageManager;

if (!defined('ABSPATH')) exit;

if (!defined("mlm_dir")) {
    define("mlm_dir", __DIR__);
}
if (!defined("mlmt_lang")) {
    define("mlmt_lang", "multi_language_manager_translation");
}
if (!defined("mlmt_url")) {
    define("mlmt_url",plugin_dir_url( __FILE__ ));
}
require_once mlm_dir . "/classes/lang_query.php";
require_once mlm_dir . "/classes/adminpage.php";
require_once mlm_dir . "/classes/langtable.php";
require_once mlm_dir . "/classes/posts.php";
require_once mlm_dir . "/classes/postmeta.php";
require_once mlm_dir . "/classes/terms.php";
require_once mlm_dir . "/classes/termsmeta.php";
require_once mlm_dir . "/classes/termtaxonomy.php";
require_once mlm_dir . "/classes/usersmeta.php";
require_once mlm_dir . "/classes/options.php";
require_once mlm_dir . "/classes/restapi.php";

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

        register_activation_hook(__FILE__, [$this, 'on_activate']);

        add_action('init', [$this, 'register_all_hooks']);
        add_action('admin_menu', [$this, "register_admin_page"]);
        add_filter("query_vars",[$this,"query_vars"]);
        add_action("rest_api_init",[LangLanguagesTable::class,"register_routes"]);
    }

    public function query_vars($query_vars){
        if (!in_array("lang",$query_vars)) {
            $query_vars[] = "lang";
        }
        return $query_vars;
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
