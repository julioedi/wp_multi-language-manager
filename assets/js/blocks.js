/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/api-fetch/build-module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middlewares_nonce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares/nonce */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js\");\n/* harmony import */ var _middlewares_root_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./middlewares/root-url */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js\");\n/* harmony import */ var _middlewares_preloading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./middlewares/preloading */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js\");\n/* harmony import */ var _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./middlewares/fetch-all-middleware */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js\");\n/* harmony import */ var _middlewares_namespace_endpoint__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./middlewares/namespace-endpoint */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js\");\n/* harmony import */ var _middlewares_http_v1__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./middlewares/http-v1 */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js\");\n/* harmony import */ var _middlewares_user_locale__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./middlewares/user-locale */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js\");\n/* harmony import */ var _middlewares_media_upload__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./middlewares/media-upload */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js\");\n/* harmony import */ var _middlewares_theme_preview__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./middlewares/theme-preview */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js\");\n/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/response */ \"./node_modules/@wordpress/api-fetch/build-module/utils/response.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Internal dependencies\n */\n\n\n\n\n\n\n\n\n\n\n\n/**\n * Default set of header values which should be sent with every request unless\n * explicitly provided through apiFetch options.\n *\n * @type {Record<string, string>}\n */\nconst DEFAULT_HEADERS = {\n  // The backend uses the Accept header as a condition for considering an\n  // incoming request as a REST request.\n  //\n  // See: https://core.trac.wordpress.org/ticket/44534\n  Accept: 'application/json, */*;q=0.1'\n};\n\n/**\n * Default set of fetch option values which should be sent with every request\n * unless explicitly provided through apiFetch options.\n *\n * @type {Object}\n */\nconst DEFAULT_OPTIONS = {\n  credentials: 'include'\n};\n\n/** @typedef {import('./types').APIFetchMiddleware} APIFetchMiddleware */\n/** @typedef {import('./types').APIFetchOptions} APIFetchOptions */\n\n/**\n * @type {import('./types').APIFetchMiddleware[]}\n */\nconst middlewares = [_middlewares_user_locale__WEBPACK_IMPORTED_MODULE_7__[\"default\"], _middlewares_namespace_endpoint__WEBPACK_IMPORTED_MODULE_5__[\"default\"], _middlewares_http_v1__WEBPACK_IMPORTED_MODULE_6__[\"default\"], _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__[\"default\"]];\n\n/**\n * Register a middleware\n *\n * @param {import('./types').APIFetchMiddleware} middleware\n */\nfunction registerMiddleware(middleware) {\n  middlewares.unshift(middleware);\n}\n\n/**\n * Checks the status of a response, throwing the Response as an error if\n * it is outside the 200 range.\n *\n * @param {Response} response\n * @return {Response} The response if the status is in the 200 range.\n */\nconst checkStatus = response => {\n  if (response.status >= 200 && response.status < 300) {\n    return response;\n  }\n  throw response;\n};\n\n/** @typedef {(options: import('./types').APIFetchOptions) => Promise<any>} FetchHandler*/\n\n/**\n * @type {FetchHandler}\n */\nconst defaultFetchHandler = nextOptions => {\n  const {\n    url,\n    path,\n    data,\n    parse = true,\n    ...remainingOptions\n  } = nextOptions;\n  let {\n    body,\n    headers\n  } = nextOptions;\n\n  // Merge explicitly-provided headers with default values.\n  headers = {\n    ...DEFAULT_HEADERS,\n    ...headers\n  };\n\n  // The `data` property is a shorthand for sending a JSON body.\n  if (data) {\n    body = JSON.stringify(data);\n    headers['Content-Type'] = 'application/json';\n  }\n  const responsePromise = window.fetch(\n  // Fall back to explicitly passing `window.location` which is the behavior if `undefined` is passed.\n  url || path || window.location.href, {\n    ...DEFAULT_OPTIONS,\n    ...remainingOptions,\n    body,\n    headers\n  });\n  return responsePromise.then(value => Promise.resolve(value).then(checkStatus).catch(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_10__.parseAndThrowError)(response, parse)).then(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_10__.parseResponseAndNormalizeError)(response, parse)), err => {\n    // Re-throw AbortError for the users to handle it themselves.\n    if (err && err.name === 'AbortError') {\n      throw err;\n    }\n\n    // Otherwise, there is most likely no network connection.\n    // Unfortunately the message might depend on the browser.\n    throw {\n      code: 'fetch_error',\n      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('You are probably offline.')\n    };\n  });\n};\n\n/** @type {FetchHandler} */\nlet fetchHandler = defaultFetchHandler;\n\n/**\n * Defines a custom fetch handler for making the requests that will override\n * the default one using window.fetch\n *\n * @param {FetchHandler} newFetchHandler The new fetch handler\n */\nfunction setFetchHandler(newFetchHandler) {\n  fetchHandler = newFetchHandler;\n}\n\n/**\n * @template T\n * @param {import('./types').APIFetchOptions} options\n * @return {Promise<T>} A promise representing the request processed via the registered middlewares.\n */\nfunction apiFetch(options) {\n  // creates a nested function chain that calls all middlewares and finally the `fetchHandler`,\n  // converting `middlewares = [ m1, m2, m3 ]` into:\n  // ```\n  // opts1 => m1( opts1, opts2 => m2( opts2, opts3 => m3( opts3, fetchHandler ) ) );\n  // ```\n  const enhancedHandler = middlewares.reduceRight((/** @type {FetchHandler} */next, middleware) => {\n    return workingOptions => middleware(workingOptions, next);\n  }, fetchHandler);\n  return enhancedHandler(options).catch(error => {\n    if (error.code !== 'rest_cookie_invalid_nonce') {\n      return Promise.reject(error);\n    }\n\n    // If the nonce is invalid, refresh it and try again.\n    return window\n    // @ts-ignore\n    .fetch(apiFetch.nonceEndpoint).then(checkStatus).then(data => data.text()).then(text => {\n      // @ts-ignore\n      apiFetch.nonceMiddleware.nonce = text;\n      return apiFetch(options);\n    });\n  });\n}\napiFetch.use = registerMiddleware;\napiFetch.setFetchHandler = setFetchHandler;\napiFetch.createNonceMiddleware = _middlewares_nonce__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\napiFetch.createPreloadingMiddleware = _middlewares_preloading__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\napiFetch.createRootURLMiddleware = _middlewares_root_url__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\napiFetch.fetchAllMiddleware = _middlewares_fetch_all_middleware__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\napiFetch.mediaUploadMiddleware = _middlewares_media_upload__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\napiFetch.createThemePreviewMiddleware = _middlewares_theme_preview__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiFetch);\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/index.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/add-query-args.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ \"./node_modules/@wordpress/api-fetch/build-module/index.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Internal dependencies\n */\n\n\n/**\n * Apply query arguments to both URL and Path, whichever is present.\n *\n * @param {import('../types').APIFetchOptions} props\n * @param {Record<string, string | number>}    queryArgs\n * @return {import('../types').APIFetchOptions} The request with the modified query args\n */\nconst modifyQuery = ({\n  path,\n  url,\n  ...options\n}, queryArgs) => ({\n  ...options,\n  url: url && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(url, queryArgs),\n  path: path && (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(path, queryArgs)\n});\n\n/**\n * Duplicates parsing functionality from apiFetch.\n *\n * @param {Response} response\n * @return {Promise<any>} Parsed response json.\n */\nconst parseResponse = response => response.json ? response.json() : Promise.reject(response);\n\n/**\n * @param {string | null} linkHeader\n * @return {{ next?: string }} The parsed link header.\n */\nconst parseLinkHeader = linkHeader => {\n  if (!linkHeader) {\n    return {};\n  }\n  const match = linkHeader.match(/<([^>]+)>; rel=\"next\"/);\n  return match ? {\n    next: match[1]\n  } : {};\n};\n\n/**\n * @param {Response} response\n * @return {string | undefined} The next page URL.\n */\nconst getNextPageUrl = response => {\n  const {\n    next\n  } = parseLinkHeader(response.headers.get('link'));\n  return next;\n};\n\n/**\n * @param {import('../types').APIFetchOptions} options\n * @return {boolean} True if the request contains an unbounded query.\n */\nconst requestContainsUnboundedQuery = options => {\n  const pathIsUnbounded = !!options.path && options.path.indexOf('per_page=-1') !== -1;\n  const urlIsUnbounded = !!options.url && options.url.indexOf('per_page=-1') !== -1;\n  return pathIsUnbounded || urlIsUnbounded;\n};\n\n/**\n * The REST API enforces an upper limit on the per_page option. To handle large\n * collections, apiFetch consumers can pass `per_page=-1`; this middleware will\n * then recursively assemble a full response array from all available pages.\n *\n * @type {import('../types').APIFetchMiddleware}\n */\nconst fetchAllMiddleware = async (options, next) => {\n  if (options.parse === false) {\n    // If a consumer has opted out of parsing, do not apply middleware.\n    return next(options);\n  }\n  if (!requestContainsUnboundedQuery(options)) {\n    // If neither url nor path is requesting all items, do not apply middleware.\n    return next(options);\n  }\n\n  // Retrieve requested page of results.\n  const response = await (0,___WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n    ...modifyQuery(options, {\n      per_page: 100\n    }),\n    // Ensure headers are returned for page 1.\n    parse: false\n  });\n  const results = await parseResponse(response);\n  if (!Array.isArray(results)) {\n    // We have no reliable way of merging non-array results.\n    return results;\n  }\n  let nextPage = getNextPageUrl(response);\n  if (!nextPage) {\n    // There are no further pages to request.\n    return results;\n  }\n\n  // Iteratively fetch all remaining pages until no \"next\" header is found.\n  let mergedResults = /** @type {any[]} */[].concat(results);\n  while (nextPage) {\n    const nextResponse = await (0,___WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n      ...options,\n      // Ensure the URL for the next page is used instead of any provided path.\n      path: undefined,\n      url: nextPage,\n      // Ensure we still get headers so we can identify the next page.\n      parse: false\n    });\n    const nextResults = await parseResponse(nextResponse);\n    mergedResults = mergedResults.concat(nextResults);\n    nextPage = getNextPageUrl(nextResponse);\n  }\n  return mergedResults;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetchAllMiddleware);\n//# sourceMappingURL=fetch-all-middleware.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/fetch-all-middleware.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * Set of HTTP methods which are eligible to be overridden.\n *\n * @type {Set<string>}\n */\nconst OVERRIDE_METHODS = new Set(['PATCH', 'PUT', 'DELETE']);\n\n/**\n * Default request method.\n *\n * \"A request has an associated method (a method). Unless stated otherwise it\n * is `GET`.\"\n *\n * @see  https://fetch.spec.whatwg.org/#requests\n *\n * @type {string}\n */\nconst DEFAULT_METHOD = 'GET';\n\n/**\n * API Fetch middleware which overrides the request method for HTTP v1\n * compatibility leveraging the REST API X-HTTP-Method-Override header.\n *\n * @type {import('../types').APIFetchMiddleware}\n */\nconst httpV1Middleware = (options, next) => {\n  const {\n    method = DEFAULT_METHOD\n  } = options;\n  if (OVERRIDE_METHODS.has(method.toUpperCase())) {\n    options = {\n      ...options,\n      headers: {\n        ...options.headers,\n        'X-HTTP-Method-Override': method,\n        'Content-Type': 'application/json'\n      },\n      method: 'POST'\n    };\n  }\n  return next(options);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (httpV1Middleware);\n//# sourceMappingURL=http-v1.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/http-v1.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_response__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/response */ \"./node_modules/@wordpress/api-fetch/build-module/utils/response.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Internal dependencies\n */\n\n\n/**\n * @param {import('../types').APIFetchOptions} options\n * @return {boolean} True if the request is for media upload.\n */\nfunction isMediaUploadRequest(options) {\n  const isCreateMethod = !!options.method && options.method === 'POST';\n  const isMediaEndpoint = !!options.path && options.path.indexOf('/wp/v2/media') !== -1 || !!options.url && options.url.indexOf('/wp/v2/media') !== -1;\n  return isMediaEndpoint && isCreateMethod;\n}\n\n/**\n * Middleware handling media upload failures and retries.\n *\n * @type {import('../types').APIFetchMiddleware}\n */\nconst mediaUploadMiddleware = (options, next) => {\n  if (!isMediaUploadRequest(options)) {\n    return next(options);\n  }\n  let retries = 0;\n  const maxRetries = 5;\n\n  /**\n   * @param {string} attachmentId\n   * @return {Promise<any>} Processed post response.\n   */\n  const postProcess = attachmentId => {\n    retries++;\n    return next({\n      path: `/wp/v2/media/${attachmentId}/post-process`,\n      method: 'POST',\n      data: {\n        action: 'create-image-subsizes'\n      },\n      parse: false\n    }).catch(() => {\n      if (retries < maxRetries) {\n        return postProcess(attachmentId);\n      }\n      next({\n        path: `/wp/v2/media/${attachmentId}?force=true`,\n        method: 'DELETE'\n      });\n      return Promise.reject();\n    });\n  };\n  return next({\n    ...options,\n    parse: false\n  }).catch(response => {\n    // `response` could actually be an error thrown by `defaultFetchHandler`.\n    if (!response.headers) {\n      return Promise.reject(response);\n    }\n    const attachmentId = response.headers.get('x-wp-upload-attachment-id');\n    if (response.status >= 500 && response.status < 600 && attachmentId) {\n      return postProcess(attachmentId).catch(() => {\n        if (options.parse !== false) {\n          return Promise.reject({\n            code: 'post_process',\n            message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Media upload failed. If this is a photo or a large image, please scale it down and try again.')\n          });\n        }\n        return Promise.reject(response);\n      });\n    }\n    return (0,_utils_response__WEBPACK_IMPORTED_MODULE_1__.parseAndThrowError)(response, options.parse);\n  }).then(response => (0,_utils_response__WEBPACK_IMPORTED_MODULE_1__.parseResponseAndNormalizeError)(response, options.parse));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mediaUploadMiddleware);\n//# sourceMappingURL=media-upload.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/media-upload.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * @type {import('../types').APIFetchMiddleware}\n */\nconst namespaceAndEndpointMiddleware = (options, next) => {\n  let path = options.path;\n  let namespaceTrimmed, endpointTrimmed;\n  if (typeof options.namespace === 'string' && typeof options.endpoint === 'string') {\n    namespaceTrimmed = options.namespace.replace(/^\\/|\\/$/g, '');\n    endpointTrimmed = options.endpoint.replace(/^\\//, '');\n    if (endpointTrimmed) {\n      path = namespaceTrimmed + '/' + endpointTrimmed;\n    } else {\n      path = namespaceTrimmed;\n    }\n  }\n  delete options.namespace;\n  delete options.endpoint;\n  return next({\n    ...options,\n    path\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (namespaceAndEndpointMiddleware);\n//# sourceMappingURL=namespace-endpoint.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/**\n * @param {string} nonce\n * @return {import('../types').APIFetchMiddleware & { nonce: string }} A middleware to enhance a request with a nonce.\n */\nfunction createNonceMiddleware(nonce) {\n  /**\n   * @type {import('../types').APIFetchMiddleware & { nonce: string }}\n   */\n  const middleware = (options, next) => {\n    const {\n      headers = {}\n    } = options;\n\n    // If an 'X-WP-Nonce' header (or any case-insensitive variation\n    // thereof) was specified, no need to add a nonce header.\n    for (const headerName in headers) {\n      if (headerName.toLowerCase() === 'x-wp-nonce' && headers[headerName] === middleware.nonce) {\n        return next(options);\n      }\n    }\n    return next({\n      ...options,\n      headers: {\n        ...headers,\n        'X-WP-Nonce': middleware.nonce\n      }\n    });\n  };\n  middleware.nonce = nonce;\n  return middleware;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createNonceMiddleware);\n//# sourceMappingURL=nonce.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/nonce.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/normalize-path.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/get-query-args.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/add-query-args.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * @param {Record<string, any>} preloadedData\n * @return {import('../types').APIFetchMiddleware} Preloading middleware.\n */\nfunction createPreloadingMiddleware(preloadedData) {\n  const cache = Object.fromEntries(Object.entries(preloadedData).map(([path, data]) => [(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(path), data]));\n  return (options, next) => {\n    const {\n      parse = true\n    } = options;\n    /** @type {string | void} */\n    let rawPath = options.path;\n    if (!rawPath && options.url) {\n      const {\n        rest_route: pathFromQuery,\n        ...queryArgs\n      } = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.getQueryArgs)(options.url);\n      if (typeof pathFromQuery === 'string') {\n        rawPath = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)(pathFromQuery, queryArgs);\n      }\n    }\n    if (typeof rawPath !== 'string') {\n      return next(options);\n    }\n    const method = options.method || 'GET';\n    const path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.normalizePath)(rawPath);\n    if ('GET' === method && cache[path]) {\n      const cacheData = cache[path];\n\n      // Unsetting the cache key ensures that the data is only used a single time.\n      delete cache[path];\n      return prepareResponse(cacheData, !!parse);\n    } else if ('OPTIONS' === method && cache[method] && cache[method][path]) {\n      const cacheData = cache[method][path];\n\n      // Unsetting the cache key ensures that the data is only used a single time.\n      delete cache[method][path];\n      return prepareResponse(cacheData, !!parse);\n    }\n    return next(options);\n  };\n}\n\n/**\n * This is a helper function that sends a success response.\n *\n * @param {Record<string, any>} responseData\n * @param {boolean}             parse\n * @return {Promise<any>} Promise with the response.\n */\nfunction prepareResponse(responseData, parse) {\n  if (parse) {\n    return Promise.resolve(responseData.body);\n  }\n  try {\n    return Promise.resolve(new window.Response(JSON.stringify(responseData.body), {\n      status: 200,\n      statusText: 'OK',\n      headers: responseData.headers\n    }));\n  } catch {\n    // See: https://github.com/WordPress/gutenberg/issues/67358#issuecomment-2621163926.\n    Object.entries(responseData.headers).forEach(([key, value]) => {\n      if (key.toLowerCase() === 'link') {\n        responseData.headers[key] = value.replace(/<([^>]+)>/, (/** @type {any} */_, /** @type {string} */url) => `<${encodeURI(url)}>`);\n      }\n    });\n    return Promise.resolve(parse ? responseData.body : new window.Response(JSON.stringify(responseData.body), {\n      status: 200,\n      statusText: 'OK',\n      headers: responseData.headers\n    }));\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createPreloadingMiddleware);\n//# sourceMappingURL=preloading.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/preloading.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _namespace_endpoint__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespace-endpoint */ \"./node_modules/@wordpress/api-fetch/build-module/middlewares/namespace-endpoint.js\");\n/**\n * Internal dependencies\n */\n\n\n/**\n * @param {string} rootURL\n * @return {import('../types').APIFetchMiddleware} Root URL middleware.\n */\nconst createRootURLMiddleware = rootURL => (options, next) => {\n  return (0,_namespace_endpoint__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(options, optionsWithPath => {\n    let url = optionsWithPath.url;\n    let path = optionsWithPath.path;\n    let apiRoot;\n    if (typeof path === 'string') {\n      apiRoot = rootURL;\n      if (-1 !== rootURL.indexOf('?')) {\n        path = path.replace('?', '&');\n      }\n      path = path.replace(/^\\//, '');\n\n      // API root may already include query parameter prefix if site is\n      // configured to use plain permalinks.\n      if ('string' === typeof apiRoot && -1 !== apiRoot.indexOf('?')) {\n        path = path.replace('?', '&');\n      }\n      url = apiRoot + path;\n    }\n    return next({\n      ...optionsWithPath,\n      url\n    });\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRootURLMiddleware);\n//# sourceMappingURL=root-url.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/root-url.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/get-query-arg.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/add-query-args.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/remove-query-args.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * This appends a `wp_theme_preview` parameter to the REST API request URL if\n * the admin URL contains a `theme` GET parameter.\n *\n * If the REST API request URL has contained the `wp_theme_preview` parameter as `''`,\n * then bypass this middleware.\n *\n * @param {Record<string, any>} themePath\n * @return {import('../types').APIFetchMiddleware} Preloading middleware.\n */\nconst createThemePreviewMiddleware = themePath => (options, next) => {\n  if (typeof options.url === 'string') {\n    const wpThemePreview = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArg)(options.url, 'wp_theme_preview');\n    if (wpThemePreview === undefined) {\n      options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(options.url, {\n        wp_theme_preview: themePath\n      });\n    } else if (wpThemePreview === '') {\n      options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.removeQueryArgs)(options.url, 'wp_theme_preview');\n    }\n  }\n  if (typeof options.path === 'string') {\n    const wpThemePreview = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.getQueryArg)(options.path, 'wp_theme_preview');\n    if (wpThemePreview === undefined) {\n      options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(options.path, {\n        wp_theme_preview: themePath\n      });\n    } else if (wpThemePreview === '') {\n      options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.removeQueryArgs)(options.path, 'wp_theme_preview');\n    }\n  }\n  return next(options);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createThemePreviewMiddleware);\n//# sourceMappingURL=theme-preview.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/theme-preview.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/has-query-arg.js\");\n/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ \"./node_modules/@wordpress/url/build-module/add-query-args.js\");\n/**\n * WordPress dependencies\n */\n\n\n/**\n * @type {import('../types').APIFetchMiddleware}\n */\nconst userLocaleMiddleware = (options, next) => {\n  if (typeof options.url === 'string' && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(options.url, '_locale')) {\n    options.url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(options.url, {\n      _locale: 'user'\n    });\n  }\n  if (typeof options.path === 'string' && !(0,_wordpress_url__WEBPACK_IMPORTED_MODULE_0__.hasQueryArg)(options.path, '_locale')) {\n    options.path = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(options.path, {\n      _locale: 'user'\n    });\n  }\n  return next(options);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userLocaleMiddleware);\n//# sourceMappingURL=user-locale.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/middlewares/user-locale.js?");

/***/ }),

/***/ "./node_modules/@wordpress/api-fetch/build-module/utils/response.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/api-fetch/build-module/utils/response.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parseAndThrowError: () => (/* binding */ parseAndThrowError),\n/* harmony export */   parseResponseAndNormalizeError: () => (/* binding */ parseResponseAndNormalizeError)\n/* harmony export */ });\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n/**\n * WordPress dependencies\n */\n\n\n/**\n * Parses the apiFetch response.\n *\n * @param {Response} response\n * @param {boolean}  shouldParseResponse\n *\n * @return {Promise<any> | null | Response} Parsed response.\n */\nconst parseResponse = (response, shouldParseResponse = true) => {\n  if (shouldParseResponse) {\n    if (response.status === 204) {\n      return null;\n    }\n    return response.json ? response.json() : Promise.reject(response);\n  }\n  return response;\n};\n\n/**\n * Calls the `json` function on the Response, throwing an error if the response\n * doesn't have a json function or if parsing the json itself fails.\n *\n * @param {Response} response\n * @return {Promise<any>} Parsed response.\n */\nconst parseJsonAndNormalizeError = response => {\n  const invalidJsonError = {\n    code: 'invalid_json',\n    message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The response is not a valid JSON response.')\n  };\n  if (!response || !response.json) {\n    throw invalidJsonError;\n  }\n  return response.json().catch(() => {\n    throw invalidJsonError;\n  });\n};\n\n/**\n * Parses the apiFetch response properly and normalize response errors.\n *\n * @param {Response} response\n * @param {boolean}  shouldParseResponse\n *\n * @return {Promise<any>} Parsed response.\n */\nconst parseResponseAndNormalizeError = (response, shouldParseResponse = true) => {\n  return Promise.resolve(parseResponse(response, shouldParseResponse)).catch(res => parseAndThrowError(res, shouldParseResponse));\n};\n\n/**\n * Parses a response, throwing an error if parsing the response fails.\n *\n * @param {Response} response\n * @param {boolean}  shouldParseResponse\n * @return {Promise<any>} Parsed response.\n */\nfunction parseAndThrowError(response, shouldParseResponse = true) {\n  if (!shouldParseResponse) {\n    throw response;\n  }\n  return parseJsonAndNormalizeError(response).then(error => {\n    const unknownError = {\n      code: 'unknown_error',\n      message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('An unknown error occurred.')\n    };\n    throw error || unknownError;\n  });\n}\n//# sourceMappingURL=response.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/api-fetch/build-module/utils/response.js?");

/***/ }),

/***/ "./node_modules/@wordpress/dom-ready/build-module/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@wordpress/dom-ready/build-module/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ domReady)\n/* harmony export */ });\n/**\n * @typedef {() => void} Callback\n *\n * TODO: Remove this typedef and inline `() => void` type.\n *\n * This typedef is used so that a descriptive type is provided in our\n * automatically generated documentation.\n *\n * An in-line type `() => void` would be preferable, but the generated\n * documentation is `null` in that case.\n *\n * @see https://github.com/WordPress/gutenberg/issues/18045\n */\n\n/**\n * Specify a function to execute when the DOM is fully loaded.\n *\n * @param {Callback} callback A function to execute after the DOM is ready.\n *\n * @example\n * ```js\n * import domReady from '@wordpress/dom-ready';\n *\n * domReady( function() {\n * \t//do something after DOM loads.\n * } );\n * ```\n *\n * @return {void}\n */\nfunction domReady(callback) {\n  if (typeof document === 'undefined') {\n    return;\n  }\n  if (document.readyState === 'complete' ||\n  // DOMContentLoaded + Images/Styles/etc loaded, so we call directly.\n  document.readyState === 'interactive' // DOMContentLoaded fires at this point, so we call directly.\n  ) {\n    return void callback();\n  }\n\n  // DOMContentLoaded has not fired yet, delay callback until then.\n  document.addEventListener('DOMContentLoaded', callback);\n}\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/dom-ready/build-module/index.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/add-query-args.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/add-query-args.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addQueryArgs: () => (/* binding */ addQueryArgs)\n/* harmony export */ });\n/* harmony import */ var _get_query_args__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-query-args */ \"./node_modules/@wordpress/url/build-module/get-query-args.js\");\n/* harmony import */ var _build_query_string__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./build-query-string */ \"./node_modules/@wordpress/url/build-module/build-query-string.js\");\n/* harmony import */ var _get_fragment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-fragment */ \"./node_modules/@wordpress/url/build-module/get-fragment.js\");\n/**\n * Internal dependencies\n */\n\n\n\n\n/**\n * Appends arguments as querystring to the provided URL. If the URL already\n * includes query arguments, the arguments are merged with (and take precedent\n * over) the existing set.\n *\n * @param url  URL to which arguments should be appended. If omitted,\n *             only the resulting querystring is returned.\n * @param args Query arguments to apply to URL.\n *\n * @example\n * ```js\n * const newURL = addQueryArgs( 'https://google.com', { q: 'test' } ); // https://google.com/?q=test\n * ```\n *\n * @return URL with arguments applied.\n */\nfunction addQueryArgs(url = '', args) {\n  // If no arguments are to be appended, return original URL.\n  if (!args || !Object.keys(args).length) {\n    return url;\n  }\n  const fragment = (0,_get_fragment__WEBPACK_IMPORTED_MODULE_0__.getFragment)(url) || '';\n  let baseUrl = url.replace(fragment, '');\n\n  // Determine whether URL already had query arguments.\n  const queryStringIndex = url.indexOf('?');\n  if (queryStringIndex !== -1) {\n    // Merge into existing query arguments.\n    args = Object.assign((0,_get_query_args__WEBPACK_IMPORTED_MODULE_1__.getQueryArgs)(url), args);\n\n    // Change working base URL to omit previous query arguments.\n    baseUrl = baseUrl.substr(0, queryStringIndex);\n  }\n  return baseUrl + '?' + (0,_build_query_string__WEBPACK_IMPORTED_MODULE_2__.buildQueryString)(args) + fragment;\n}\n//# sourceMappingURL=add-query-args.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/add-query-args.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/build-query-string.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/build-query-string.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   buildQueryString: () => (/* binding */ buildQueryString)\n/* harmony export */ });\n/**\n * Generates URL-encoded query string using input query data.\n *\n * It is intended to behave equivalent as PHP's `http_build_query`, configured\n * with encoding type PHP_QUERY_RFC3986 (spaces as `%20`).\n *\n * @example\n * ```js\n * const queryString = buildQueryString( {\n *    simple: 'is ok',\n *    arrays: [ 'are', 'fine', 'too' ],\n *    objects: {\n *       evenNested: {\n *          ok: 'yes',\n *       },\n *    },\n * } );\n * // \"simple=is%20ok&arrays%5B0%5D=are&arrays%5B1%5D=fine&arrays%5B2%5D=too&objects%5BevenNested%5D%5Bok%5D=yes\"\n * ```\n *\n * @param data Data to encode.\n *\n * @return Query string.\n */\nfunction buildQueryString(data) {\n  let string = '';\n  const stack = Object.entries(data);\n  let pair;\n  while (pair = stack.shift()) {\n    let [key, value] = pair;\n\n    // Support building deeply nested data, from array or object values.\n    const hasNestedData = Array.isArray(value) || value && value.constructor === Object;\n    if (hasNestedData) {\n      // Push array or object values onto the stack as composed of their\n      // original key and nested index or key, retaining order by a\n      // combination of Array#reverse and Array#unshift onto the stack.\n      const valuePairs = Object.entries(value).reverse();\n      for (const [member, memberValue] of valuePairs) {\n        stack.unshift([`${key}[${member}]`, memberValue]);\n      }\n    } else if (value !== undefined) {\n      // Null is treated as special case, equivalent to empty string.\n      if (value === null) {\n        value = '';\n      }\n      string += '&' + [key, String(value)].map(encodeURIComponent).join('=');\n    }\n  }\n\n  // Loop will concatenate with leading `&`, but it's only expected for all\n  // but the first query parameter. This strips the leading `&`, while still\n  // accounting for the case that the string may in-fact be empty.\n  return string.substr(1);\n}\n//# sourceMappingURL=build-query-string.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/build-query-string.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/get-fragment.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/get-fragment.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getFragment: () => (/* binding */ getFragment)\n/* harmony export */ });\n/**\n * Returns the fragment part of the URL.\n *\n * @param url The full URL\n *\n * @example\n * ```js\n * const fragment1 = getFragment( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // '#fragment'\n * const fragment2 = getFragment( 'https://wordpress.org#another-fragment?query=true' ); // '#another-fragment'\n * ```\n *\n * @return The fragment part of the URL.\n */\nfunction getFragment(url) {\n  const matches = /^\\S+?(#[^\\s\\?]*)/.exec(url);\n  if (matches) {\n    return matches[1];\n  }\n}\n//# sourceMappingURL=get-fragment.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/get-fragment.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/get-query-arg.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/get-query-arg.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getQueryArg: () => (/* binding */ getQueryArg)\n/* harmony export */ });\n/* harmony import */ var _get_query_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-query-args */ \"./node_modules/@wordpress/url/build-module/get-query-args.js\");\n/**\n * Internal dependencies\n */\n\n/**\n * Returns a single query argument of the url\n *\n * @param url URL.\n * @param arg Query arg name.\n *\n * @example\n * ```js\n * const foo = getQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'foo' ); // bar\n * ```\n *\n * @return Query arg value.\n */\nfunction getQueryArg(url, arg) {\n  return (0,_get_query_args__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(url)[arg];\n}\n//# sourceMappingURL=get-query-arg.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/get-query-arg.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/get-query-args.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/get-query-args.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getQueryArgs: () => (/* binding */ getQueryArgs)\n/* harmony export */ });\n/* harmony import */ var _safe_decode_uri_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./safe-decode-uri-component */ \"./node_modules/@wordpress/url/build-module/safe-decode-uri-component.js\");\n/* harmony import */ var _get_query_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-query-string */ \"./node_modules/@wordpress/url/build-module/get-query-string.js\");\n/**\n * Internal dependencies\n */\n\n\n/**\n * Sets a value in object deeply by a given array of path segments. Mutates the\n * object reference.\n *\n * @param object Object in which to assign.\n * @param path   Path segment at which to set value.\n * @param value  Value to set.\n */\nfunction setPath(object, path, value) {\n  const length = path.length;\n  const lastIndex = length - 1;\n  for (let i = 0; i < length; i++) {\n    let key = path[i];\n    if (!key && Array.isArray(object)) {\n      // If key is empty string and next value is array, derive key from\n      // the current length of the array.\n      key = object.length.toString();\n    }\n    key = ['__proto__', 'constructor', 'prototype'].includes(key) ? key.toUpperCase() : key;\n\n    // If the next key in the path is numeric (or empty string), it will be\n    // created as an array. Otherwise, it will be created as an object.\n    const isNextKeyArrayIndex = !isNaN(Number(path[i + 1]));\n    object[key] = i === lastIndex ?\n    // If at end of path, assign the intended value.\n    value :\n    // Otherwise, advance to the next object in the path, creating\n    // it if it does not yet exist.\n    object[key] || (isNextKeyArrayIndex ? [] : {});\n    if (Array.isArray(object[key]) && !isNextKeyArrayIndex) {\n      // If we current key is non-numeric, but the next value is an\n      // array, coerce the value to an object.\n      object[key] = {\n        ...object[key]\n      };\n    }\n\n    // Update working reference object to the next in the path.\n    object = object[key];\n  }\n}\n\n/**\n * Returns an object of query arguments of the given URL. If the given URL is\n * invalid or has no querystring, an empty object is returned.\n *\n * @param url URL.\n *\n * @example\n * ```js\n * const foo = getQueryArgs( 'https://wordpress.org?foo=bar&bar=baz' );\n * // { \"foo\": \"bar\", \"bar\": \"baz\" }\n * ```\n *\n * @return Query args object.\n */\nfunction getQueryArgs(url) {\n  return ((0,_get_query_string__WEBPACK_IMPORTED_MODULE_0__.getQueryString)(url) || ''\n  // Normalize space encoding, accounting for PHP URL encoding\n  // corresponding to `application/x-www-form-urlencoded`.\n  //\n  // See: https://tools.ietf.org/html/rfc1866#section-8.2.1\n  ).replace(/\\+/g, '%20').split('&').reduce((accumulator, keyValue) => {\n    const [key, value = ''] = keyValue.split('=')\n    // Filtering avoids decoding as `undefined` for value, where\n    // default is restored in destructuring assignment.\n    .filter(Boolean).map(_safe_decode_uri_component__WEBPACK_IMPORTED_MODULE_1__.safeDecodeURIComponent);\n    if (key) {\n      const segments = key.replace(/\\]/g, '').split('[');\n      setPath(accumulator, segments, value);\n    }\n    return accumulator;\n  }, Object.create(null));\n}\n//# sourceMappingURL=get-query-args.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/get-query-args.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/get-query-string.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/get-query-string.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getQueryString: () => (/* binding */ getQueryString)\n/* harmony export */ });\n/* wp:polyfill */\n/**\n * Returns the query string part of the URL.\n *\n * @param url The full URL.\n *\n * @example\n * ```js\n * const queryString = getQueryString( 'http://localhost:8080/this/is/a/test?query=true#fragment' ); // 'query=true'\n * ```\n *\n * @return The query string part of the URL.\n */\nfunction getQueryString(url) {\n  let query;\n  try {\n    query = new URL(url, 'http://example.com').search.substring(1);\n  } catch (error) {}\n  if (query) {\n    return query;\n  }\n}\n//# sourceMappingURL=get-query-string.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/get-query-string.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/has-query-arg.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/has-query-arg.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hasQueryArg: () => (/* binding */ hasQueryArg)\n/* harmony export */ });\n/* harmony import */ var _get_query_arg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-query-arg */ \"./node_modules/@wordpress/url/build-module/get-query-arg.js\");\n/**\n * Internal dependencies\n */\n\n\n/**\n * Determines whether the URL contains a given query arg.\n *\n * @param url URL.\n * @param arg Query arg name.\n *\n * @example\n * ```js\n * const hasBar = hasQueryArg( 'https://wordpress.org?foo=bar&bar=baz', 'bar' ); // true\n * ```\n *\n * @return Whether or not the URL contains the query arg.\n */\nfunction hasQueryArg(url, arg) {\n  return (0,_get_query_arg__WEBPACK_IMPORTED_MODULE_0__.getQueryArg)(url, arg) !== undefined;\n}\n//# sourceMappingURL=has-query-arg.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/has-query-arg.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/normalize-path.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/normalize-path.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   normalizePath: () => (/* binding */ normalizePath)\n/* harmony export */ });\n/**\n * Given a path, returns a normalized path where equal query parameter values\n * will be treated as identical, regardless of order they appear in the original\n * text.\n *\n * @param path Original path.\n *\n * @return Normalized path.\n */\nfunction normalizePath(path) {\n  const split = path.split('?');\n  const query = split[1];\n  const base = split[0];\n  if (!query) {\n    return base;\n  }\n\n  // 'b=1%2C2&c=2&a=5'\n  return base + '?' + query\n  // [ 'b=1%2C2', 'c=2', 'a=5' ]\n  .split('&')\n  // [ [ 'b, '1%2C2' ], [ 'c', '2' ], [ 'a', '5' ] ]\n  .map(entry => entry.split('='))\n  // [ [ 'b', '1,2' ], [ 'c', '2' ], [ 'a', '5' ] ]\n  .map(pair => pair.map(decodeURIComponent))\n  // [ [ 'a', '5' ], [ 'b, '1,2' ], [ 'c', '2' ] ]\n  .sort((a, b) => a[0].localeCompare(b[0]))\n  // [ [ 'a', '5' ], [ 'b, '1%2C2' ], [ 'c', '2' ] ]\n  .map(pair => pair.map(encodeURIComponent))\n  // [ 'a=5', 'b=1%2C2', 'c=2' ]\n  .map(pair => pair.join('='))\n  // 'a=5&b=1%2C2&c=2'\n  .join('&');\n}\n//# sourceMappingURL=normalize-path.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/normalize-path.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/remove-query-args.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/remove-query-args.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   removeQueryArgs: () => (/* binding */ removeQueryArgs)\n/* harmony export */ });\n/* harmony import */ var _get_query_args__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-query-args */ \"./node_modules/@wordpress/url/build-module/get-query-args.js\");\n/* harmony import */ var _build_query_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-query-string */ \"./node_modules/@wordpress/url/build-module/build-query-string.js\");\n/**\n * Internal dependencies\n */\n\n\n\n/**\n * Removes arguments from the query string of the url\n *\n * @param url  URL.\n * @param args Query Args.\n *\n * @example\n * ```js\n * const newUrl = removeQueryArgs( 'https://wordpress.org?foo=bar&bar=baz&baz=foobar', 'foo', 'bar' ); // https://wordpress.org?baz=foobar\n * ```\n *\n * @return Updated URL.\n */\nfunction removeQueryArgs(url, ...args) {\n  const fragment = url.replace(/^[^#]*/, '');\n  url = url.replace(/#.*/, '');\n  const queryStringIndex = url.indexOf('?');\n  if (queryStringIndex === -1) {\n    return url + fragment;\n  }\n  const query = (0,_get_query_args__WEBPACK_IMPORTED_MODULE_0__.getQueryArgs)(url);\n  const baseURL = url.substr(0, queryStringIndex);\n  args.forEach(arg => delete query[arg]);\n  const queryString = (0,_build_query_string__WEBPACK_IMPORTED_MODULE_1__.buildQueryString)(query);\n  const updatedUrl = queryString ? baseURL + '?' + queryString : baseURL;\n  return updatedUrl + fragment;\n}\n//# sourceMappingURL=remove-query-args.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/remove-query-args.js?");

/***/ }),

/***/ "./node_modules/@wordpress/url/build-module/safe-decode-uri-component.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/url/build-module/safe-decode-uri-component.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   safeDecodeURIComponent: () => (/* binding */ safeDecodeURIComponent)\n/* harmony export */ });\n/**\n * Safely decodes a URI component with `decodeURIComponent`. Returns the URI component unmodified if\n * `decodeURIComponent` throws an error.\n *\n * @param uriComponent URI component to decode.\n *\n * @return Decoded URI component if possible.\n */\nfunction safeDecodeURIComponent(uriComponent) {\n  try {\n    return decodeURIComponent(uriComponent);\n  } catch (uriComponentError) {\n    return uriComponent;\n  }\n}\n//# sourceMappingURL=safe-decode-uri-component.js.map\n\n//# sourceURL=webpack://blocks-dev/./node_modules/@wordpress/url/build-module/safe-decode-uri-component.js?");

/***/ }),

/***/ "./src/__.js":
/*!*******************!*\
  !*** ./src/__.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   __: () => (/* binding */ __)\n/* harmony export */ });\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);\n\nvar __ = function __(str) {\n  return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)(str, 'easycv');\n};\n\n\n//# sourceURL=webpack://blocks-dev/./src/__.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/dom-ready */ \"./node_modules/@wordpress/dom-ready/build-module/index.js\");\n/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ \"@wordpress/plugins\");\n/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/editor */ \"@wordpress/editor\");\n/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ \"@wordpress/element\");\n/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./__ */ \"./src/__.js\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ \"@wordpress/blocks\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ \"./node_modules/@wordpress/api-fetch/build-module/index.js\");\n\n\n\n\n\n\n\n\n_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(function (options, next) {\n  var url = new URL(options.url, window.location.origin);\n  var lang = new URLSearchParams(window.location.search).get('lang');\n  if (lang) {\n    // Añadir lang a la URL si es GET\n    if (options.method === 'GET') {\n      url.searchParams.set('lang', lang);\n      options.url = url.toString();\n    }\n\n    // Añadir lang al body si es POST o PUT (guardar post)\n    if (['POST', 'PUT'].includes(options.method)) {\n      if (!options.data) {\n        options.data = {};\n      }\n      options.data.lang = lang;\n    }\n    console.log('[apiFetch interceptor]', options);\n  }\n  return next(options);\n});\n(0,_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_6__[\"default\"])(function () {});\n\n//# sourceURL=webpack://blocks-dev/./src/index.js?");

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = wp.blocks;

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = wp.editor;

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = wp.element;

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = wp.i18n;

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = wp.plugins;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;