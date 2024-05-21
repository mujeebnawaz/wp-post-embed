import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './inc/edit';
import { Save } from './inc/save'

// Registers the block 
registerBlockType( 'wp-post-link-test/posts-embed', {
    edit: Edit,
    save: Save
} );