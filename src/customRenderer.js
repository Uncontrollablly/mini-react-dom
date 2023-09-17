import ReactReconciler from "react-reconciler";

const hostConfig = {
  supportsMutation: true,
  getRootHostContext() {
    return {};
  },
  getChildHostContext() {
    return {};
  },
  shouldSetTextContent(type, props) {
    return (
      typeof props.children === "string" || typeof props.children === "number"
    );
  },
  prepareForCommit() {
    return true;
  },
  resetAfterCommit() {},
  createInstance(
    type,
    newProps,
    rootContainerInstance,
    currentHostContext,
    workInProgress
  ) {
    const domElement = document.createElement(type);

    Object.keys(newProps).forEach((propName) => {
      const propValue = newProps[propName];
      if (propName === "children") {
        if (typeof propValue === "string" || typeof propValue === "number") {
          domElement.textContent = propValue;
        }
      } else if (propName === "onClick") {
        domElement.addEventListener("click", propValue);
      } else if (propName === "className") {
        domElement.setAttribute("class", propValue);
      } else {
        const propValue = newProps[propName];
        domElement.setAttribute(propName, propValue);
      }
    });

    return domElement;
  },
  createTextInstance(text) {
    return document.createTextNode(text);
  },
  appendInitialChild(parent, child) {
    parent.appendChild(child);
  },
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  finalizeInitialChildren() {},
  clearContainer() {},
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

const CustomRenderer = {
  render: (reactElement, domElement, callback) => {
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
    }
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  },
};

export default CustomRenderer;
