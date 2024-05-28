import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './inc/edit';
import { Save } from './inc/save'
import block  from './block.json';

// Registers the block 
registerBlockType( block.name, {
    edit: Edit,
    save: Save
} );