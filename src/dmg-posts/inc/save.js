/**
 * WordPress dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

// Save method just renders the content as RawHTML.
export const Save = ( { attributes, setAttributes } ) => {
	const { content, keyword } = attributes;
    const blockProps = useBlockProps.save();
    return (
        <div { ...blockProps }> <RawHTML>{content}</RawHTML> </div>
    );
}