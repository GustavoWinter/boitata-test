class DOMHandler {
  static createNode(element) {
    return document.createElement(element)
  }

  static append(parent, el) {
    parent.appendChild(el)
  }

  static appendAll(parent, elements) {
    elements.forEach(el => parent.appendChild(el))
  }
}
