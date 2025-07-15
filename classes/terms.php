<?php

namespace MultiLanguageManager;

class LangTerms extends LangTable {
    public function __construct() {
        parent::__construct('terms', 'term_id');
    }

    public function register_hooks() {
        add_action('deleted_term', [$this, 'delete_translations']);
    }


    public function delete_translations($term_id) {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['term_id' => $term_id]);
    }
}
