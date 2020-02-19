const template = document.createElement('template');
template.innerHTML = `<div class="hello">Hello World</div>`;

class HelloWorld extends HTMLElement {
  /*
  This lifecycle callback is fired when the element is added to the DOM. You defer the work of rendering the component
  until this point.
  */
  connectedCallback(){
    let clonedNode = template.content.cloneNode(true);

    if(this.name){
      clonedNode.firstChild.innerHTML = `Hello ${this.name}`;
    }

    this.appendChild(clonedNode)
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

  /*
  This lifecycle callback is fired when the element is removed from the DOM
  */
  disconnectedCallback() {
    // put clean up logic here
  }

  /*
  This lifecycle callback is firec when the element is adopted into another document i.e. document.adoptNode(element)
  */
  adoptedCallback() {

  }

  // attribute property reflection
  get name() {
    return this.getAttribute('name');
  }
  
  set name(val) {
    if(val) {
      this.setAttribute('name', val);
      // update component content as name changes!
      //this.firstChild.innerHTML = `Hello ${this.name}`;
    }
    else {
      this.removeAttribute('name');
      // update component content as name changes!
      //this.firstChild.innerHTML = "Hello World";
    }
  }
}

// this registers the custom element with the browser
customElements.define('hello-world', HelloWorld);

export default HelloWorld;