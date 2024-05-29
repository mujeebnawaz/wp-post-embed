/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/post-links-embed/inc/edit.js":
/*!******************************************!*\
  !*** ./src/post-links-embed/inc/edit.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Edit: () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _read_more__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./read-more */ "./src/post-links-embed/inc/read-more.js");








/**
 * Script for handling the editor section. 
 */
const Edit = ({
  attributes,
  setAttributes
}) => {
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)();
  /**
   * 1. postResults - attribute is used to contain the searched posts from the API and is displayed in InspectorControls. 
   * 2. content - attribute is used to contain the links which are inserted in RichText
   * 3. keyword - attribute for the search keyword which is typed by the user in the searchbox. 
   * -- This gets reset everytime the component is mounted. 
   */
  const {
    postResults,
    content,
    keyword
  } = attributes;

  /**
   * This is the method which renders the post links within the Inspector Controls. 
   * ** Sets Attribute of "postResults"
   * @param {JSON} json - 
   */
  const setPostLinks = json => {
    const postLinks = json.map((post, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(React.Fragment, {
      key: index
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: post.permalink,
      onClick: e => {
        e.preventDefault();
        setAttributes({
          content: post
        });
      }
    }, post.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null)));
    setAttributes({
      postResults: postLinks
    });
  };
  /**
   * Event handler for the search posts text input field. 
   * 
   * ** Sets Attributes "postResults" only if no post is found. 
   * 
   * @param {string} keywords - Search keywords for searching the posts. 
   */
  const searchPosts = async keywords => {
    let host = 'http://localhost';
    let route = '/wp-json/wp-post-link-post-embed/v1/get';
    let params = `?type=post&page=1&keyword=${keywords}`;

    // Set the loading post indicator. 
    setAttributes({
      keyword: keywords,
      postResults: "Loading..."
    });
    let response = await fetch(host + route + params);

    // If the post(s) have not been found for any reason, show the error. 
    if (response.status !== 200) {
      setAttributes({
        postResults: "No posts founds!"
      });
    }
    // Otherwise just process the response. 
    else {
      let json = await response.json();
      setPostLinks(json);
    }
  };
  /**
   * Used to render the default state of the component. 
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(async () => {
    // API configuration for recent posts. 
    let host = 'http://localhost';
    let route = '/wp-json/wp-post-link-post-embed/v1/get';
    let params = `?type=post&page=1`;
    // Get recent posts. 
    let response = await fetch(host + route + params);
    // If the post(s) have not been found for any reason, show the error. 
    if (response.status !== 200) {
      setAttributes({
        postResults: "No posts founds!"
      });
    } else {
      let json = await response.json();
      setPostLinks(json);
    }
    // Reset the keywords.
    setAttributes({
      keyword: ""
    });
  }, []);
  // Stopping the link from rerendering.
  const readMoreLink = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useMemo)(() => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_read_more__WEBPACK_IMPORTED_MODULE_5__["default"], {
      href: content.permalink
    }, content.title);
  }, [content]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Insert Posts Links', 'posts-embed-block')
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: "Search Posts",
    onChange: searchPosts,
    value: keyword
  }), keyword ? '' : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("label", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("b", null, "Recent posts")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "post-results"
  }, postResults))), readMoreLink);
};

/***/ }),

/***/ "./src/post-links-embed/inc/read-more.js":
/*!***********************************************!*\
  !*** ./src/post-links-embed/inc/read-more.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const ReadMoreLink = props => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    ...props
  }, "Read More: ", props.children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReadMoreLink);

/***/ }),

/***/ "./src/post-links-embed/inc/save.js":
/*!******************************************!*\
  !*** ./src/post-links-embed/inc/save.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Save: () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _read_more__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./read-more */ "./src/post-links-embed/inc/read-more.js");

/**
 * WordPress dependencies
 */





// Save method just renders the content as RawHTML.
const Save = ({
  attributes,
  setAttributes
}) => {
  const {
    content,
    keyword
  } = attributes;
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...blockProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_read_more__WEBPACK_IMPORTED_MODULE_3__["default"], {
    href: content.permalink
  }, content.title));
};

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/post-links-embed/block.json":
/*!*****************************************!*\
  !*** ./src/post-links-embed/block.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"apiVersion":3,"name":"post-links-embed/read-more","title":"Post Links Embed","category":"media","icon":"embed-post","editorScript":"file:./index.js","attributes":{"keyword":{"type":"string","default":""},"postResults":{"type":"string","default":""},"content":{"type":"object","default":{"link":"#","title":"Search for the post to insert a link"}}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./src/post-links-embed/index.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _inc_edit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inc/edit */ "./src/post-links-embed/inc/edit.js");
/* harmony import */ var _inc_save__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inc/save */ "./src/post-links-embed/inc/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/post-links-embed/block.json");





// Registers the block 
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  edit: _inc_edit__WEBPACK_IMPORTED_MODULE_1__.Edit,
  save: _inc_save__WEBPACK_IMPORTED_MODULE_2__.Save
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map