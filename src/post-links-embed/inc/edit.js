import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { RichText } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import ReadMoreLink  from './read-more';
/**
 * Script for handling the editor section. 
 */
export const Edit =( { attributes, setAttributes } ) => {
    const blockProps = useBlockProps();
    /**
     * 1. postResults - attribute is used to contain the searched posts from the API and is displayed in InspectorControls. 
     * 2. content - attribute is used to contain the links which are inserted in RichText
     * 3. keyword - attribute for the search keyword which is typed by the user in the searchbox. 
     * -- This gets reset everytime the component is mounted. 
     */
    const { postResults, content, keyword  } = attributes;

    /**
     * This is the method which renders the post links within the Inspector Controls. 
     * ** Sets Attribute of "postResults"
     * @param {JSON} json - 
     */
    const setPostLinks = ( json ) => {
        const postLinks = json.map((post, index) => (
            <React.Fragment key={index}>
                <a href={post.permalink} 
                    onClick={ (e) => { e.preventDefault(); setAttributes( { content: post } ); } } >
                    {post.title}
                </a>
                <br />
            </React.Fragment>
        ));
        setAttributes( { postResults: postLinks } );
    }
    /**
     * Event handler for the search posts text input field. 
     * 
     * ** Sets Attributes "postResults" only if no post is found. 
     * 
     * @param {string} keywords - Search keywords for searching the posts. 
     */
    const searchPosts = async ( keywords ) => {
        let host   = 'http://localhost'; 
        let route  = '/wp-json/wp-post-link-post-embed/v1/get';
        let params = `?type=post&page=1&keyword=${keywords}`;
        
        // Set the loading post indicator. 
        setAttributes( { keyword: keywords, postResults: "Loading..."} );
        let response = await fetch( host + route + params );

        // If the post(s) have not been found for any reason, show the error. 
        if( response.status !== 200 ){
            setAttributes( { postResults: "No posts founds!"} );
        }
        // Otherwise just process the response. 
        else{
            let json = await response.json();
            setPostLinks(json);
        }
    }
    /**
     * Used to render the default state of the component. 
     */
    useEffect( async () => {
        // API configuration for recent posts. 
        let host   = 'http://localhost'; 
        let route  = '/wp-json/wp-post-link-post-embed/v1/get';
        let params = `?type=post&page=1`;
        // Get recent posts. 
        let response = await fetch( host + route + params );
        // If the post(s) have not been found for any reason, show the error. 
        if( response.status !== 200 ){
            setAttributes( { postResults: "No posts founds!"} );
        }
        else{
            let json = await response.json();
            setPostLinks(json);
        }
        // Reset the keywords.
        setAttributes( { keyword: "" } );
    }, []); 
    return ( 
    <div { ...blockProps }>
    
        <InspectorControls>
            <PanelBody title={ __('Insert Posts Links', 'posts-embed-block') }>
                <TextControl
                label="Search Posts"
                onChange={ searchPosts }
                value={keyword}
                />
                {keyword ? '' : <label><b>Recent posts</b></label>}
                <div id={"post-results"}>{postResults}</div>
            </PanelBody>
        </InspectorControls>
        {<ReadMoreLink href={content.permalink}>{content.title}</ReadMoreLink>}

    </div>
    );
}

