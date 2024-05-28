<?php 
/**
 * Class responsible for registering the '/get' rest route for the plugin. 
 * Uses WP_REST_Request and WP_REST_Response
 * 
 * @see https://developer.wordpress.org/reference/functions/rest_ensure_response/
 */
class API{
    function __construct() {
        add_action( 'rest_api_init', [ $this, 'get_route' ] );
    }
    /**
     * 'rest_api_init' 
     * - Registers the 'get' route.
     */
    public function get_route() {
        register_rest_route( 'wp-post-link-post-embed/v1', '/get', 
            array(
                'methods' => 'GET',
                'callback' => [ $this, 'post_links_get_posts' ],
                'permission_callback' => '__return_true', 
            ) 
        );
    }
    /**
     * Callback method for 'register_rest_route'
     * Gets invoked for 'wp-post-link-post-embed/v1/get' rest route. 
     * 
     * By default:
     * - 10 posts are shown.
     * @todo Add pagination to show more posts.
     *   
     * @param WP_REST_Request object which contains the request parameters. 
     * @return WP_REST_Response respone
     */
    public function post_links_get_posts( $request ){
        $request_params = $request->get_params();
        // Initialiase keyword to an empty string. 
        $keyword = '';

        /**
         * Checks for the required parameters
         * - If no correct parameters are given
         * -- Responds with HTTP 400.
         */
        if( !isset( $request_params['type'] ) && empty( $request_params['type'] )  ){
            $data = array(
                'error' => "Bad Request"
            );
            return rest_ensure_response( new WP_REST_Response( $data, 400 ) );
        }  
        
        if( isset( $request_params['keyword'] ) && !empty( $request_params['keyword'] ) ){
            $keyword = sanitize_text_field( $request_params['keyword'] );
        } 

        $post_type = sanitize_text_field( $request_params['type'] ) ;

        
        $args = array(
            'post_type'      => $post_type,
            'posts_per_page' => 10, 
            'post_status'    => 'publish',
            's'              =>  $keyword,
        );

        $query = new WP_Query($args);
        /**
         * If no posts are found
         *  -- Responds with HTTP 404.
         */
        if( $query->post_count < 1 ){
            $data = array(
                'error' => "No posts found"
            );
            return rest_ensure_response( new WP_REST_Response( $data, 404 ) );
        }

        $posts = $query->posts;
        $response = array();

        foreach ($posts as $post) {
            $response[] = array(
                'title' => get_the_title($post),
                'permalink' => get_permalink($post)
            );
        }
        // If everything is fine, responds with HTTP 200. 
        return rest_ensure_response( $response );
    }
}
