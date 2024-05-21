<?php
/*
Plugin Name: WP_POST_LINK TEST
Author: Mujeeb Nawaz
Description: A plugin developed as part of a coding test for WP_POST_LINK. 
Version: 1.0
*/

// Define the plugin directory path
define( 'WP_POST_LINK_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_POST_LINK_SLUG', 'wp-post-link-test-plugin' );

// Require WP-CLI subcommand class. 
require_once( WP_POST_LINK_DIR.'/classes/class-search-command.php' );
// Requier API class. 
require_once( WP_POST_LINK_DIR.'/classes/class-api.php' );
$api = new API();

/**
 * 'init' - hook
 * Callback method for init hook, registers the posts embed block.
 */
function register_posts_embed_block() {
    // Do not do anything - If older version of WP or wrong hook. 
    if ( ! function_exists( 'register_block_type' ) ) {
        return;
    }
    // Do not register the block if the block has not been built.
    if( !file_exists( WP_POST_LINK_DIR . '/build/wp-post-link-posts/block.json' ) ){
        return;
    }
	// Register the block!
    register_block_type( WP_POST_LINK_DIR . '/build/wp-post-link-posts/block.json' ) ;

}
add_action( 'init', 'register_posts_embed_block' );

