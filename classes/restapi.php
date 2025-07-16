<?php

namespace MultiLanguageManager;

use WP_Post;

class LangRestApi
{
    public static $post_types = null;
    public static $language_flags = null;

    public static function get_post_types(): \WP_Post_Type|array
    {
        if (self::$post_types) {
            return self::$post_types;
        }
        $get_post_types = get_post_types();
        self::$post_types = array_filter($get_post_types, function ($item) {
            if (preg_match("/^(wp_|custom|oembed|nav_|user_)/", $item)) {
                return false;
            }
            return true;
        });
        return self::$post_types;
    }

    public static function init()
    {
        $types = self::get_post_types();
        foreach ($types as $key => $value) {
            add_filter("rest_prepare_{$key}", [self::class, "single_post_response"], 10, 3);
        }
    }


    public static function get_flags()
    {
        if (self::$language_flags) {
            return self::$language_flags;
        }
        self::$language_flags = LangLanguagesTable::get_languages_flags();
        return self::$language_flags;
    }



    public static function single_post_response(\WP_REST_Response $response, \WP_Post $post, \WP_REST_Request $request)
    {
        // $get_post_types = \MultiLanguageManager\LangRestApi::get_post_types();
        $params = $request->get_query_params();
        $flags = self::get_flags();
        $data = $response->get_data();
        $data["lang"] = $flags["locale"];


        //check if is set lang
        if (!isset($params["lang"])) {
            return $response;
            $response->set_data($data);
        }

        //check if is included in site active languages
        $code = $params["lang"];
        if (!in_array($code, $flags["languages"])) {
            return $response;
            $response->set_data($data);
        }

        $data["lang"] = $code;
        $response->set_data($data);
        // if (!in_array($post->post_type, $get_post_types)) {
        //     # code...
        // }
        return $response;
    }
}
