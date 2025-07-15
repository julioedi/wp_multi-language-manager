<?php

namespace MultiLanguageManager;

class LangUsersMeta extends LangTable {
    public function __construct() {
        parent::__construct('usermeta', 'umeta_id');
    }

    public function register_hooks() {
        add_action('deleted_user_meta', [$this, 'delete_translations'], 10, 2);
    }

    public function delete_translations($meta_id, $user_id) {
        global $wpdb;
        $wpdb->delete($this->duplicate_table, ['umeta_id' => $meta_id]);
    }
}
