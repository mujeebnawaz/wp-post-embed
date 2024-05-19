<?php
/*
Plugin Name: DMG TEST
Author: Mujeeb Nawaz
Description: A plugin developed as part of a coding test for DMG. 
Version: 1.0
*/

// Define the plugin directory path
define( 'DMG_DIR', plugin_dir_path( __FILE__ ) );
define( 'DMG_SLUG', 'dmg-test-plugin' );

// Require WP-CLI subcommand class. 
require_once( DMG_DIR.'/classes/class-search-command.php' );
// Requier API class. 
require_once( DMG_DIR.'/classes/class-api.php' );
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
    if( !file_exists( DMG_DIR . '/build/dmg-posts/block.json' ) ){
        return;
    }
	// Register the block!
    register_block_type( DMG_DIR . '/build/dmg-posts/block.json' ) ;

}
add_action( 'init', 'register_posts_embed_block' );

