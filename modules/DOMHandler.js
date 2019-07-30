class DOMHandler {
  static createNode(element) {
    return document.createElement(element)
  }

  static append(parent, el) {
    return parent.appendChild(el)
  }
}
