import React from 'react';

const ReadMoreLink = ( props ) => {
  return <a {...props}>Read More: {props.children}</a>;
};

export default ReadMoreLink;
