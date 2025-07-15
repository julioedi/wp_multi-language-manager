<?php

namespace MultiLanguageManager;

class LangPosts extends LangTable {
    public function __construct() {
        parent::__construct('posts', 'ID');
    }

    public function register_hooks() {
        add_action('delete_post', [$this, 'delete_translations']);
    }

    public function delete_translations($post_id) {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['ID' => $post_id]);
    }
}
