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
