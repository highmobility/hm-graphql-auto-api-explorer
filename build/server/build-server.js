/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 727:
/***/ ((module) => {

/**
 * This is the app config file. It's defined in the server, so you can access process.env.
 * In React, useAppData can be used to access this config in both the client and server.
 */
module.exports = function () {
  return {//
  };
};

/***/ }),

/***/ 756:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(645);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n\n*,*::before,*::after{box-sizing:inherit}\n\nbody{min-width:320px;box-sizing:border-box}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

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
/******/ 			id: moduleId,
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ server_entry)
});

;// CONCATENATED MODULE: external "@babel/runtime/helpers/asyncToGenerator"
const asyncToGenerator_namespaceObject = require("@babel/runtime/helpers/asyncToGenerator");
var asyncToGenerator_default = /*#__PURE__*/__webpack_require__.n(asyncToGenerator_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/defineProperty"
const defineProperty_namespaceObject = require("@babel/runtime/helpers/defineProperty");
var defineProperty_default = /*#__PURE__*/__webpack_require__.n(defineProperty_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/regenerator"
const regenerator_namespaceObject = require("@babel/runtime/regenerator");
var regenerator_default = /*#__PURE__*/__webpack_require__.n(regenerator_namespaceObject);
;// CONCATENATED MODULE: external "react"
const external_react_namespaceObject = require("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_namespaceObject);
;// CONCATENATED MODULE: external "react-dom/server"
const server_namespaceObject = require("react-dom/server");
var server_default = /*#__PURE__*/__webpack_require__.n(server_namespaceObject);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
var external_fs_default = /*#__PURE__*/__webpack_require__.n(external_fs_namespaceObject);
;// CONCATENATED MODULE: external "serialize-javascript"
const external_serialize_javascript_namespaceObject = require("serialize-javascript");
var external_serialize_javascript_default = /*#__PURE__*/__webpack_require__.n(external_serialize_javascript_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/server/wrapInDocument.js



var _manifest;

function getManifest() {
  // If manifest has already been read, reuse it, so we don't need to keep making fs calls in production
  if (_manifest) return _manifest; // Reads manifest using fs, because require() would try to resolve at build-time

  var manifestString = external_fs_default().readFileSync("/home/kaarel/Code/hm-graphql-scaffold/build/client/asset-manifest.json", 'utf8');

  try {
    _manifest = JSON.parse(manifestString);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to parse manifest. ".concat( false ? 0 : "Ensure that the build correctly created a JSON file at ".concat("/home/kaarel/Code/hm-graphql-scaffold/build/client/asset-manifest.json", ".")));
  }

  return _manifest;
}

function wrapInDocument(content, appData, helmetContext, cspNonce) {
  var inlineStyles = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  /* Get dev-only styles, to prevent FOUC. This is a virtual file injected by the dev server. */
  var styles =  false ? 0 : [];
  /* Get page meta data from react-helmet */

  var helmet = helmetContext.helmet;
  var manifest = getManifest();
  return "<!doctype html>\n<html ".concat(helmet.htmlAttributes.toString(), ">\n  <head>\n    <meta charset=\"UTF-8\">\n    ").concat(helmet.title.toString(), "\n    ").concat(helmet.meta.toString(), "\n    ").concat(helmet.link.toString(), "\n    ").concat(manifest['app.css'] ? "<link rel=\"stylesheet\" href=\"".concat(manifest['app.css'], "\">") : '', "\n    ").concat( false ? 0 : '', "\n    ").concat(helmet.script.toString(), "\n    ").concat(helmet.noscript.toString(), "\n    ").concat(helmet.style.toString(), "\n    ").concat(inlineStyles.join(''), "\n  </head>\n  <body ").concat(helmet.bodyAttributes.toString(), ">\n    <div id=\"react-app\">").concat(content, "</div>\n    <script").concat(cspNonce ? " nonce=\"".concat(cspNonce, "\" ") : '', ">Object.defineProperty(window, '__OCF_APP_DATA__', {\n      value: ").concat(external_serialize_javascript_default()(appData), "\n    });</script>\n    <script ").concat( false ? 0 : '', "src=\"").concat(manifest['app.js'], "\"></script>\n  </body>\n</html>");
}
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/AppDataContext.js

var AppDataContext = /*#__PURE__*/external_react_default().createContext({});
/* harmony default export */ const universal_react_AppDataContext = (AppDataContext);
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/useAppData.js


function useAppData() {
  return external_react_default().useContext(universal_react_AppDataContext);
}
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/index.js



;// CONCATENATED MODULE: external "react-helmet-async"
const external_react_helmet_async_namespaceObject = require("react-helmet-async");
;// CONCATENATED MODULE: external "url"
const external_url_namespaceObject = require("url");
var external_url_default = /*#__PURE__*/__webpack_require__.n(external_url_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/server/render.js




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







/**
 * Server render - renders your react app to string
 *
 * @param ReactComponent - The root component of your React app
 * @param url - The url for the request. For express, you should pass `req.originalUrl`
 * @param props - This will get passed to the App component during server render, and as the 2nd argument to getPageData
 * @param cspNonce - (optional) Sets the `nonce` attribute on the <script> element that create-frontend uses. Use it when implementing a content-security-policy.
 *
 * @return {{ content: String, context: Object }}
 */

function renderOnServer(_x, _x2) {
  return _renderOnServer.apply(this, arguments);
}

function _renderOnServer() {
  _renderOnServer = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(ReactComponent, url) {
    var props,
        cspNonce,
        serverContext,
        helmetContext,
        appData,
        parsedUrl,
        appString,
        jsxStyles,
        _args = arguments;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            props = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            cspNonce = _args.length > 3 ? _args[3] : undefined;
            serverContext = {};
            helmetContext = {};
            appData = {
              url: url,
              pageData: {}
            };
            /**
             * Get page data
             */

            if (!(ReactComponent && typeof ReactComponent.getPageData === 'function')) {
              _context.next = 11;
              break;
            }

            parsedUrl = external_url_default().parse(url);
            _context.next = 9;
            return ReactComponent.getPageData({
              pathname: parsedUrl.pathname,
              search: parsedUrl.search
            }, props);

          case 9:
            _context.t0 = _context.sent;
            appData.pageData = (0, _context.t0)({});

          case 11:
            if (!ReactComponent) {
              // Pass info that we skipped SSR to the browser, so we can fetch data immediately and avoid trying to hydrate
              appData.skippedSSR = true;
            }
            /**
             * Render app to string
             */


            appString = server_default().renderToString( /*#__PURE__*/external_react_default().createElement(universal_react_AppDataContext.Provider, {
              value: _objectSpread(_objectSpread({}, appData), {}, {
                serverContext: serverContext
              })
            }, /*#__PURE__*/external_react_default().createElement(external_react_helmet_async_namespaceObject.HelmetProvider, {
              context: helmetContext
            }, ReactComponent ? /*#__PURE__*/external_react_default().createElement(ReactComponent, props) : ' ')));
            jsxStyles =  false ? 0 : null;
            return _context.abrupt("return", {
              content: wrapInDocument(appString, appData, helmetContext, cspNonce, [jsxStyles]),
              context: serverContext
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _renderOnServer.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/server/index.js


;// CONCATENATED MODULE: external "@babel/runtime/helpers/extends"
const extends_namespaceObject = require("@babel/runtime/helpers/extends");
var extends_default = /*#__PURE__*/__webpack_require__.n(extends_namespaceObject);
// EXTERNAL MODULE: ./app/scss/entry.scss
var entry = __webpack_require__(756);
;// CONCATENATED MODULE: external "react-router-dom"
const external_react_router_dom_namespaceObject = require("react-router-dom");
;// CONCATENATED MODULE: external "@babel/runtime/helpers/classCallCheck"
const classCallCheck_namespaceObject = require("@babel/runtime/helpers/classCallCheck");
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/createClass"
const createClass_namespaceObject = require("@babel/runtime/helpers/createClass");
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/assertThisInitialized"
const assertThisInitialized_namespaceObject = require("@babel/runtime/helpers/assertThisInitialized");
var assertThisInitialized_default = /*#__PURE__*/__webpack_require__.n(assertThisInitialized_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/inherits"
const inherits_namespaceObject = require("@babel/runtime/helpers/inherits");
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/possibleConstructorReturn"
const possibleConstructorReturn_namespaceObject = require("@babel/runtime/helpers/possibleConstructorReturn");
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn_namespaceObject);
;// CONCATENATED MODULE: external "@babel/runtime/helpers/getPrototypeOf"
const getPrototypeOf_namespaceObject = require("@babel/runtime/helpers/getPrototypeOf");
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf_namespaceObject);
;// CONCATENATED MODULE: ./app/components/ErrorBoundary.js








function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = getPrototypeOf_default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = getPrototypeOf_default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return possibleConstructorReturn_default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var ErrorBoundary = /*#__PURE__*/function (_React$Component) {
  inherits_default()(ErrorBoundary, _React$Component);

  var _super = _createSuper(ErrorBoundary);

  function ErrorBoundary() {
    var _this;

    classCallCheck_default()(this, ErrorBoundary);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    defineProperty_default()(assertThisInitialized_default()(_this), "state", {
      error: null
    });

    return _this;
  }

  createClass_default()(ErrorBoundary, [{
    key: "render",
    value: function render() {
      if (this.state.error) {
        return this.props.renderError ? this.props.renderError(this.state.error) : null;
      }

      return this.props.children;
    }
  }], [{
    key: "getDerivedStateFromError",
    value: function getDerivedStateFromError(error) {
      return {
        error: error
      };
    }
  }]);

  return ErrorBoundary;
}((external_react_default()).Component);


;// CONCATENATED MODULE: ./app/pages/ErrorPage.js

function ErrorPage(_ref) {
  var status = _ref.status;
  var messages = {
    '404': 'Page not found'
  };
  return /*#__PURE__*/external_react_default().createElement("h1", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    }
  }, messages[status] || 'Server error');
}
;// CONCATENATED MODULE: external "@babel/runtime/helpers/objectWithoutProperties"
const objectWithoutProperties_namespaceObject = require("@babel/runtime/helpers/objectWithoutProperties");
var objectWithoutProperties_default = /*#__PURE__*/__webpack_require__.n(objectWithoutProperties_namespaceObject);
;// CONCATENATED MODULE: external "react-router"
const external_react_router_namespaceObject = require("react-router");
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/Router.js




var _excluded = ["children"];


function Router_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function Router_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Router_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Router_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }






function usePrevious(value) {
  var ref = external_react_default().useRef();
  external_react_default().useEffect(function () {
    ref.current = value;
  });
  return ref.current;
}

var RouteChangeListener = (0,external_react_router_namespaceObject.withRouter)(function (_ref) {
  var children = _ref.children,
      location = _ref.location,
      onChange = _ref.onChange;
  var prevLocation = usePrevious(location);
  external_react_default().useEffect(function () {
    if (!prevLocation || "".concat(location.pathname).concat(location.search) !== "".concat(prevLocation.pathname).concat(prevLocation.search)) {
      onChange && onChange(location);
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [location, onChange]);
  return children;
});
function Router(_ref2) {
  var children = _ref2.children,
      passthrough = objectWithoutProperties_default()(_ref2, _excluded);

  var appData = useAppData();

  if (false) {}
  /**
   * Server-side render
   */


  return /*#__PURE__*/external_react_default().createElement(external_react_router_namespaceObject.StaticRouter, extends_default()({}, passthrough, {
    location: appData.url,
    context: appData.serverContext
  }), children);
}
function getRouteData(_x, _x2, _x3) {
  return _getRouteData.apply(this, arguments);
}

function _getRouteData() {
  _getRouteData = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(location, routes, backendData) {
    var route, updater;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            route = routes.find(function (x) {
              return (0,external_react_router_namespaceObject.matchPath)(location.pathname, Router_objectSpread({
                exact: true
              }, x));
            });

            if (!(route && route.component && route.component.getPageData)) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return route.component.getPageData(location, (0,external_react_router_namespaceObject.matchPath)(location.pathname, route).params, backendData);

          case 4:
            updater = _context.sent;

          case 5:
            return _context.abrupt("return", updater || function (prevState) {
              return prevState;
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getRouteData.apply(this, arguments);
}
;// CONCATENATED MODULE: ./app/pages/HomePage.js




function HomePage_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function HomePage_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { HomePage_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { HomePage_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }


function HomePage() {
  return /*#__PURE__*/external_react_default().createElement("div", null, "Home page");
}
HomePage.getPageData = /*#__PURE__*/asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee() {
  return regenerator_default().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", function (prevState) {
            return HomePage_objectSpread({}, prevState);
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}));
;// CONCATENATED MODULE: ./app/routes.js

/* harmony default export */ const routes = ([{
  path: '/',
  component: HomePage
}]);
;// CONCATENATED MODULE: ./app/App.js





function App_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function App_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { App_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { App_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }










function App() {
  var appData = useAppData();
  console.log('Hello world!', appData);
  return /*#__PURE__*/external_react_default().createElement((external_react_default()).Fragment, null, /*#__PURE__*/external_react_default().createElement(external_react_helmet_async_namespaceObject.Helmet, null, /*#__PURE__*/external_react_default().createElement("title", null, "New app"), /*#__PURE__*/external_react_default().createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  })), /*#__PURE__*/external_react_default().createElement(ErrorBoundary, {
    renderError: function renderError() {
      return /*#__PURE__*/external_react_default().createElement(ErrorPage, {
        status: 500
      });
    }
  }, /*#__PURE__*/external_react_default().createElement(Router, null, /*#__PURE__*/external_react_default().createElement(external_react_router_dom_namespaceObject.Switch, null, routes.map(function (route) {
    return /*#__PURE__*/external_react_default().createElement(external_react_router_dom_namespaceObject.Route, extends_default()({
      key: route.path,
      exact: true
    }, route));
  }), /*#__PURE__*/external_react_default().createElement(external_react_router_dom_namespaceObject.Route, null, /*#__PURE__*/external_react_default().createElement(ErrorPage, {
    status: 404
  }))))));
}
/**
 * This function gets called once in the server, and in the client whenever the page changes.
 * The result ends up in the AppData.
 */

App.getPageData = /*#__PURE__*/function () {
  var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(location, props) {
    var routeDataSetter;
    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getRouteData(location, routes, props);

          case 2:
            routeDataSetter = _context.sent;
            return _context.abrupt("return", function (prevState) {
              return App_objectSpread(App_objectSpread({}, routeDataSetter(prevState)), {}, {
                // You can set data here that will be added on every page
                config: prevState.config || props.config
              });
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
;// CONCATENATED MODULE: external "express"
const external_express_namespaceObject = require("express");
var external_express_default = /*#__PURE__*/__webpack_require__.n(external_express_namespaceObject);
// EXTERNAL MODULE: ./server/config.js
var config = __webpack_require__(727);
var config_default = /*#__PURE__*/__webpack_require__.n(config);
;// CONCATENATED MODULE: external "helmet"
const external_helmet_namespaceObject = require("helmet");
var external_helmet_default = /*#__PURE__*/__webpack_require__.n(external_helmet_namespaceObject);
;// CONCATENATED MODULE: external "crypto"
const external_crypto_namespaceObject = require("crypto");
var external_crypto_default = /*#__PURE__*/__webpack_require__.n(external_crypto_namespaceObject);
;// CONCATENATED MODULE: ./node_modules/@optimistdigital/create-frontend/universal-react/helmet.js


function helmet_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function helmet_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { helmet_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { helmet_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }



/**
 * Wrapper around helmet that provides defaults that work in local development, and generates a nonce for CSP
 * https://helmetjs.github.io/
 *
 * @param {object | function} opts - Options that get passed to helmet. If a function is passed, it receives the default options as an argument, and should return the options object.
 */

function getHelmetMiddleware(opts) {
  var defaultOpts = {
    hsts: {
      includeSubDomains: false
    },
    contentSecurityPolicy: {
      directives: helmet_objectSpread(helmet_objectSpread({}, external_helmet_default().contentSecurityPolicy.getDefaultDirectives()), {}, {
        'font-src': ["'self'",  false && 0, 'fonts.gstatic.com'].filter(Boolean),
        'img-src': ["'self'",  false && 0, '*', 'data:'].filter(Boolean),
        'media-src': ["'self'",  false && 0, '*', 'data:'].filter(Boolean),
        'default-src': ["'self'",  false && 0,  false && 0].filter(Boolean),
        'script-src': ["'self'",  false && 0, function (_, res) {
          return "'nonce-".concat(res.locals.cspNonce, "'");
        }, 'www.google-analytics.com', 'ajax.googleapis.com', 'https://www.googletagmanager.com'].filter(Boolean),
        'style-src': ["'self'", "https: 'unsafe-inline'", 'fonts.googleapis.com'],
        'connect-src': ["'self'",  false && 0,  false && 0, 'https://www.google-analytics.com'].filter(Boolean)
      })
    }
  };
  var helmetMiddleware = external_helmet_default()(typeof opts === 'function' ? opts(defaultOpts) : opts || defaultOpts);
  return function (req, res, next) {
    if (!res.locals.cspNonce) {
      res.locals.cspNonce = external_crypto_default().randomBytes(16).toString('hex');
    }

    return helmetMiddleware(req, res, next);
  };
}
;// CONCATENATED MODULE: external "compression"
const external_compression_namespaceObject = require("compression");
var external_compression_default = /*#__PURE__*/__webpack_require__.n(external_compression_namespaceObject);
;// CONCATENATED MODULE: ./server/entry.js




function entry_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function entry_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { entry_ownKeys(Object(source), true).forEach(function (key) { defineProperty_default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { entry_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }







var server = external_express_default()();
var staticOpts = {
  maxAge: 604800000
};
if (true) server.use(external_compression_default()()); // Enable gzip in production

server.use(getHelmetMiddleware(function (opts) {
  return entry_objectSpread(entry_objectSpread({}, opts), {}, {
    contentSecurityPolicy: false
  });
}));
server.get('/api/hello', function (req, res) {
  res.send('API Hello world');
});
server.use('/client', external_express_default().static('build/client', staticOpts)); // Serve build assets

server.use('/', external_express_default().static('public', staticOpts)); // Serve files from public directory

server.get(/\.(\w+)$/, function (req, res) {
  return res.status(404).send('Not found');
}); // Don't pass file requests to React

server.use('/', /*#__PURE__*/function () {
  var _ref = asyncToGenerator_default()( /*#__PURE__*/regenerator_default().mark(function _callee(req, res) {
    var _yield$render, content, context;

    return regenerator_default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return renderOnServer(App, req.originalUrl, {
              config: config_default()()
            }, res.locals.cspNonce);

          case 3:
            _yield$render = _context.sent;
            content = _yield$render.content;
            context = _yield$render.context;

            if (!context.url) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.redirect(context.status || 302, context.url));

          case 8:
            return _context.abrupt("return", res.status(context.status || 200).send(content));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            console.error('Error while rendering React, skipping SSR:', _context.t0); // If SSR failed, send an empty page so client can try to render

            _context.t1 = res.status(500);
            _context.next = 17;
            return renderOnServer(null, req.originalUrl, {
              config: config_default()()
            });

          case 17:
            _context.t2 = _context.sent.content;
            return _context.abrupt("return", _context.t1.send.call(_context.t1, _context.t2));

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/* harmony default export */ const server_entry = (server);
})();

module.exports.OCF = __webpack_exports__;
/******/ })()
;