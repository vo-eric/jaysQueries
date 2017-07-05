/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const documentReadyFunctions = [];
let documentReady = false;

window.$l = (arg) => {
  switch(typeof(arg)) {
    case 'string':
      let elementList = document.querySelectorAll(arg);
      let elementArray = Array.from(elementList);
      return new DOMNodeCollection(elementArray);
    case 'object':
      if (arg instanceof HTMLElement) {
        return new DOMNodeCollection([arg]);
      }
    case 'function':
      return documentReadyCallbacks(arg);
  }
};

$l.extend = (base, ...objs) => {
  objs.forEach((obj) => {
    for (let key in obj) {
      base[key] = obj[key];
    }
  });
  return base;
};

$l.ajax = function(options) {
  const request = new XMLHttpRequest();
  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    type: 'GET',
    success: () => {},
    error: () => {},
    url: window.location.href,
    data: {}
  };

  options = $l.extend(defaults, options);
  request.open(options.type, options.url);
  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      options.success(JSON.parse(request.response));
    } else {
      options.error(JSON.parse(request.response));
    }
  };
  request.send(options.data);
};

documentReadyCallbacks = func => {
  if (!documentReady) {
    documentReadyFunctions.push(func);
  } else {
    func();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  documentReady = true;
  documentReadyFunctions.forEach((func) => func());
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html (arg) {
    if (typeof arg === 'string') {
      this.nodes.map((node) => node.innerHTML = arg);
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (arg instanceof HTMLElement) {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML += arg.outerHTML;
      }
    } else if (typeof arg === 'string') {
      for (let j = 0; j < this.nodes.length; j++) {
        this.nodes[j].innerHTML += arg;
      }
    } else if (typeof arg === 'object') {
      for (let k = 0; k < this.nodes.length; k++) {
        for (var l = 0; l < arg.nodes.length; l++) {
          this.nodes[k].innerHTML += arg.nodes[l].outerHTML;
        }
      }
    }
  }

  attr(name, value) {
    this.nodes.forEach((node) => {
      node.setAttribute(name, value);
    });
  }

  addClass(name) {
    this.nodes.forEach((node) => {
      node.classList.add(name)
    });
  }

  removeClass(name) {
    this.nodes.forEach((node) => {
      node.classList.remove(name)
    });
  }

  children() {
    let childNodes = [];
    this.nodes.forEach((node) => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DOMNodeCollection(childNodes);
  }

  parents() {
    const parentNodes = [];
    this.nodes.forEach((node) => {
      if (!parentNodes.includes(node.parentNode)) {
        parentNodes.push(node.parentNode);
      }
    });
    return new DOMNodeCollection(parentNodes);
  }

  find(arg) {
    let result = [];
    this.nodes.forEach((node) => {
      let nodeList = node.querySelectorAll(arg);
      result = result.concat(Array.from(nodeList));
    });
    return new DOMNodeCollection(result);
  }

  remove () {
    this.nodes.forEach((node) => node.remove());
  }

  on (event, cb) {
    this.nodes.forEach((node) => {
      node.cb = cb;
      node.addEventListener(event, cb);
    });
  }

  off(event) {
    this.nodes.forEach((node) => {
      node.removeEventListener(event, node.cb);
    });
  }

}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);