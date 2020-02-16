const template = document.createElement('template');
template.innerHTML = `<div>Hello World</div>`;

class HelloWorld extends HTMLElement {
  /*
  This callback is fired when the element is added to the DOM. You defer the work of rendering the component
  until this point.
  */
  connectedCallback(){
    let clonedNode = template.content.cloneNode(true);

    if(this.name){
      clonedNode.firstChild.innerHTML = `Hello ${this.name}`;
    }

    this.appendChild(clonedNode);
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
      //this.firstChild.innerHTML = `Hello ${this.name}`;
    }
    else {
      this.removeAttribute('name');
      //this.firstChild.innerHTML = "Hello World";
    }
  }
}

// this registers the custom element with the browser
customElements.define('hello-world', HelloWorld);

export default HelloWorld;