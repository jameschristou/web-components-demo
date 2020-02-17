const template = document.createElement('template');
template.innerHTML = `<div>Hello World</div>`;

class HelloWorldShadow extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root
    const shadowRoot = this.attachShadow({mode: 'open'});

    // create a deep copy of the template content
    let clonedNode = template.content.cloneNode(true);
    shadowRoot.append(clonedNode);

    this._contentNode = this.shadowRoot.firstChild;
  }

  connectedCallback() {
    // its at this point that the attribute becomes available for use
    if(this.name){
      this._contentNode.innerHTML = `Hello ${this.name}`;
    }
  }

  /*
  An array containing the name of all the observable attributes for this custom element
  */
  static get observedAttributes() {
    return ['name'];
  }

  /*
  This callback is fired when one of the attributes in observedAttributes changes value
  */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = newValue;
    }
  }

  // attribute property reflection
  get name() {
    return this.getAttribute('name');
  }

  set name(val) {
    if(val) {
      this.setAttribute('name', val);
      this._contentNode.innerHTML = `Hello ${this.name}`;
    }
    else {
      this.removeAttribute('name');
      this._contentNode.innerHTML = "Hello World";
    }
  }
}

customElements.define('hello-world-shadow', HelloWorldShadow);

export default HelloWorldShadow;