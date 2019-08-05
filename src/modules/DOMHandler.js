export default class DOMHandler {
  static createNode(element) {
    return document.createElement(element)
  }

  static append(parent, el) {
    parent.appendChild(el)
  }

  static appendAll(parent, elements) {
    elements.forEach(el => parent.appendChild(el))
  }

  static cloneToEncapsulate(original, element, cloneStyle = []) {
    const clone = original.cloneNode()
    clone.classList.add(...cloneStyle)
    DOMHandler.append(clone, element)
    return clone
  }

  static cloneAndEncapsulateAll(container, elements = [], styles = []) {
    return elements.map((element, index) => DOMHandler.cloneToEncapsulate(container, element, styles[index]))
  }
}
