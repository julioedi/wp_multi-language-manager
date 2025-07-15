<?php

namespace MultiLanguageManager;

class LangTermTaxonomy extends LangTable
{
    public function __construct()
    {
        parent::__construct('term_taxonomy', 'term_taxonomy_id');
    }

    public function register_hooks()
    {
        add_action('deleted_term', [$this, 'delete_by_term']);
    }

    public function delete_by_term($term_id)
    {
        if (!$term_id || !is_numeric($term_id)) {
            return;
        }

        global $wpdb;
        $taxonomy_ids = $wpdb->get_col($wpdb->prepare(
            "SELECT term_taxonomy_id FROM {$wpdb->prefix}term_taxonomy WHERE term_id = %d",
            $term_id
        ));

        foreach ($taxonomy_ids as $id) {
            $wpdb->delete($this->duplicate_table, ['term_taxonomy_id' => $id]);
        }
    }
}
