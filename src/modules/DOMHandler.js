export default class DOMHandler {
  static createNode(element) {
    return document.createElement(element)
  }

  static append(parent, el) {
    parent.appendChild(el)
  }

  // Append all element to the parent
  static appendAll(parent, elements) {
    elements.forEach(el => parent.appendChild(el))
  }

  /*
    Clone an element (original) , and append the children (element) in it
    add all classes to the clone
  */
  static cloneToEncapsulate(original, element, cloneStyle = []) {
    const clone = original.cloneNode()
    clone.classList.add(...cloneStyle)
    DOMHandler.append(clone, element)
    return clone
  }

  /* Append all elemts to the same container that has been cloned */
  static cloneAndEncapsulateAll(container, elements = [], styles = []) {
    return elements.map((element, index) => DOMHandler.cloneToEncapsulate(container, element, styles[index]))
  }
}
