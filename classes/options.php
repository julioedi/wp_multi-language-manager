<?php

namespace MultiLanguageManager;

class LangOptions extends LangTable {
    public function __construct() {
        parent::__construct('options', 'option_id');
    }

    public function register_hooks() {
        add_action('pre_delete_option', [$this, 'delete_translations']);
    }

    public function delete_translations($option_name) {
        global $wpdb;

        $row = $wpdb->get_row($wpdb->prepare(
            "SELECT option_id FROM {$wpdb->options} WHERE option_name = %s",
            $option_name
        ));

        if ($row) {
            $wpdb->delete($this->duplicate_table, ['option_id' => $row->option_id]);
        }
    }
}
