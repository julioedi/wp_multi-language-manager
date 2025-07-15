<?php

namespace MultiLanguageManager;

class LangTermsMeta extends LangTable {
    public function __construct() {
        parent::__construct('termmeta', 'meta_id');
    }

    public function register_hooks() {
        add_action('deleted_term_meta', [$this, 'delete_translations']);
    }

    /**
     * deleted_term_meta passes an array of meta IDs.
     */
    public function delete_translations($meta_ids) {
        global $wpdb;
        foreach ($meta_ids as $meta_id) {
            $wpdb->delete($this->duplicate_table, ['meta_id' => $meta_id]);
        }
    }   
}
