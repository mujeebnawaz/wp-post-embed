<?php
/*
Plugin Name: Post Links Embed
Author: Mujeeb Nawaz
Description: A simple gutenberg block to add read more link to a specific post. 
Version: 1.0
--
*/

// Define the plugin directory path
define( 'WP_POST_LINK_DIR', plugin_dir_path( __FILE__ ) );
define( 'WP_POST_LINK_SLUG', 'post-links-embed' );

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
    if( !file_exists( WP_POST_LINK_DIR . '/build/post-links-embed/block.json' ) ){
        return;
    }
	// Register the block!
    register_block_type( WP_POST_LINK_DIR . '/build/post-links-embed/block.json' );


}
add_action( 'init', 'register_posts_embed_block' );

