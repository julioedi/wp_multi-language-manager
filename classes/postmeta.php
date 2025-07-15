<?php

namespace MultiLanguageManager;

class LangPostMeta extends LangTable {
    public function __construct() {
        parent::__construct('postmeta', 'meta_id');
    }

    public function register_hooks() {
        add_action('deleted_post_meta', [$this, 'delete_translations']);
    }

    /**
     * deleted_post_meta passes meta_id and post_id
     */
    public function delete_translations($meta_id, $post_id) {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['meta_id' => $meta_id]);
    }
}
