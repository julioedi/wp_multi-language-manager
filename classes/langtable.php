<?php

namespace MultiLanguageManager;


abstract class LangTable
{
    public static $prefix = 'mlmt';
    protected $base_table;
    protected $duplicate_table;
    protected $primary_key;
    public function create_table()
    {
        global $wpdb;
        // Create duplicate table structure
        $wpdb->query("CREATE TABLE IF NOT EXISTS {$this->duplicate_table} LIKE {$wpdb->prefix}{$this->base_table}");

        // Add lang column if not exists
        $columns = $wpdb->get_col("DESC {$this->duplicate_table}", 0);
        if (!in_array('lang', $columns)) {
            $wpdb->query("ALTER TABLE {$this->duplicate_table} ADD COLUMN lang VARCHAR(10) NOT NULL AFTER {$this->primary_key}");
        }

        // Add unique index on (primary_key, lang) if not exists
        $index_name = "unique_{$this->primary_key}_lang";
        $indexes = $wpdb->get_results("SHOW INDEX FROM {$this->duplicate_table} WHERE Key_name = '$index_name'");
        if (empty($indexes)) {
            $wpdb->query("ALTER TABLE {$this->duplicate_table} ADD UNIQUE KEY $index_name ({$this->primary_key}, lang)");
        }
    }
    public function __construct(string $base_table, string $primary_key)
    {
        global $wpdb;
        $this->base_table = $base_table;
        $this->primary_key = $primary_key;
        $this->duplicate_table = $wpdb->prefix .  self::$prefix . "_"  . $base_table;
    }

    /**
     * Run on plugin activation to create duplicated tables.
     */
    public function activate()
    {
        $this->create_table();
    }

    /**
     * Register WordPress hooks for syncing deletions.
     */
    abstract public function register_hooks();
}
