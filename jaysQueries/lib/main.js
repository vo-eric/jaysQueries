const DOMNodeCollection = require('./dom_node_collection.js');

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
