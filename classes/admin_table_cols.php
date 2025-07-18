<?php

namespace MultiLanguageManager;

class LangLanguagesAdminColumns
{
    public function __construct(string $type,string $edit)
    {
        add_filter("manage_{$type}_columns", [$this, "custom_column"]);
        add_filter("manage_{$type}_custom_column", [$this, "show_custom_column"]);
        add_filter("get_edit_{$edit}_link", [LangLanguagesTable::class,"add_lang_link"]);
    }

    public function custom_column($columns)
    {

        $newColumns = [];
        $index = -1;
        foreach ($columns as $key => $value) {
            $index++;
            if ($index === 1) {
                $newColumns["lang"] = "&nbsp;";
            }
            $newColumns[$key] = $value;
            # code...
        }
        return $newColumns;
    }

    public function show_custom_column($column_name)
    {
        if ($column_name !== "lang") return;
        $langsflags = LangLanguagesTable::get_languages_flags();
        $lang = get_query_var("lang", null);
        $lang = LangLanguagesTable::valid_lang($lang);
        $lang = $lang ? $lang : $langsflags["locale"];

        $flag = $langsflags["translations"][$lang] ?? null;
        if ($flag && $flag["flag"]) {
            $flag = $lang;
        } else {
            $flag = $langsflags["default"];
        }
        echo '<img width="24" height="24" src="' . mlmt_url . '/assets/flags/' . $flag . '.svg">';
    }
}
