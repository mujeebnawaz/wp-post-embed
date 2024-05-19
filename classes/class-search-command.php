<?php
/**
 * Class responsible for adding a sub-commpand to wp cli.
 * 
 * Adds command:
 * - dmg-read-more search
 * 
 * Usage:
 * - wp dmg-read-more search --date-after=dd/mm/yyyy --date-before=dd/mm/yyyy
 * 
 * Example:
 * - wp dmg-read-more search --date-after=01/01/2020 --date-before=02/01/2024 
 * 
 * @see https://developer.wordpress.org/cli/commands/
 * @see https://make.wordpress.org/cli/handbook/guides/commands-cookbook/
 * 
 */
if ( defined( 'WP_CLI' ) && WP_CLI ) {

    class Search_Command extends WP_CLI_Command {
        /**
         * Static method for executing WP_QUERY
         * - Outputs the post with pagination if the result of the WP_Query has more than 15 posts. 
         * - ** Maximum posts per page is taken from "posts_per_page" in query arguments
         * -- If posts_per_page not defined the function and command would not work. 
         * 
         * @param array - Arguments for WP_Query. 
         * @see https://developer.wordpress.org/reference/classes/wp_query/
         * @return void
         */
        public static function get_paginated_posts( $query_args ){
            if( !isset( $initial_query) && empty( $query_args ) ){
                return;
            }
            if( !isset( $query_args['posts_per_page'] ) ) {
                WP_CLI::error( "Error: maximum posts_per_page is not defined!" );
                return;
            }
            $dmg_query = new WP_Query( $query_args );
            $page = 1;
            /**
             * Cycles through all the posts and breaks if any of the following is true:
             * - Next page has less posts than maximum posts allowed to be shown on one page. 
             * - User has inputted "q" and pressed enter.
             * 
             * @uses fread method to read from STDIN
             * @see https://www.php.net/manual/en/function.fread.php
             */
            while ( true ) {
                if ( $dmg_query->have_posts() ) {
                    while ( $dmg_query->have_posts() ) {
                        $dmg_query->the_post();
                        WP_CLI::line( get_the_ID() );   
                    }
                }
                else{
                    WP_CLI::error( "Error: No posts found!" );
                }
                if ( $dmg_query->post_count < $query_args['posts_per_page'] ) {
                    break;
                } else {
                    $page++;
                    $key = fread( STDIN, 1 );
                    if ( $key === 'q' ) {
                        break;
                    }
                }
                $query_args['paged'] = $page;
                $dmg_query = new WP_Query( $query_args );
            }
            wp_reset_postdata();
        }
        /**
         * Static method to parse dates from associative arguments provide by __invoke method.
         * 
         * @param array - associative array containing the dates. 
         * - Expects 'date-before' and 'date-after' elements in the provided array. 
         * 
         * @return array|void 
         * - If the before AND after date are not available, returns an array containing date
         * configuration for showing posts from last 30 days.
         * - If either of before or after date is available:
         * -- Validates the date format
         * -- returns an array of date_query
         * 
         * @see https://make.wordpress.org/cli/handbook/guides/commands-cookbook/#:~:text=__invoke()%20is%20treated,will%20be%20registered%20as%20commands.
         */
        public static function parseDates( $assoc_args ){
            if( ! is_array( $assoc_args) ){
                return;
            }
            if( !isset( $assoc_args['date-before'] ) && !isset( $assoc_args['date-after'] ) ){
                return array( 'after' => date( 'Y-m-d', strtotime( '-30 days' ) ) );
            }
            $date_query = array();
            foreach ($assoc_args as $key => $value) {
                $date = DateTime::createFromFormat( 'd/m/Y', $value );
                if( $date ){
                    $key = explode("-", $key)[1];
                    $date_query[$key] = $date->format('d/m/Y');; 
                }
                else{
                    WP_CLI::error( "Invalid date: ". $key );
                }
            }
            return $date_query;
        }
        /**
         * Validates the date ranges.
         * Note: Should only be called after parseDates as this method does not validate the dates themselves. 
         * 
         * - Checks if its a valid range i.e., --date-after is not after --date-before. 
         */
        public static function validate_ranges( $dates ){
            if( !isset($dates['after']) || !isset($dates['before']) ){
                // If both dates are not given, no point of running the method. 
                return true;
            }
            $after  = DateTime::createFromFormat( 'd/m/Y', $dates['after'] );
            $before = DateTime::createFromFormat( 'd/m/Y', $dates['before'] );

            if( $after >= $before ){
                WP_CLI::error( 'Invalid Range, make sure --after-date is lesser than --before-date' );
            }
            // If everything is fine, just return true;
            return true;

        }
        // Main method which gets invoked by WP_CLI
        public function __invoke( $args, $assoc_args ) {
            // Step 1: Default Arguments.
            $query_args = array(
                'post_type'      => 'post',
                'post_status'    => 'publish',
                'posts_per_page' => 15,
                's'              => 'dmg-test/posts-embed'
            );
            // Parse dates
            $parsed_dates = Search_Command::parseDates($assoc_args);
            // If the both dates were given and dates were of valid ranges
            if( Search_Command::validate_ranges( $parsed_dates )) {
                // Add the date query.
                $query_args['date_query'] = $parsed_dates;
            }
            // Execute the query!
            Search_Command::get_paginated_posts( $query_args );         
        }
    }

    // Register the dmg-read-more search command with WP_CLI.
    WP_CLI::add_command( 'dmg-read-more search', 'Search_Command' );
}
