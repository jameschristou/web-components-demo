const template = document.createElement('template');
template.innerHTML = `<div>Hello World</div>`;

class HelloWorld extends HTMLElement {
  connectedCallback(){
    this.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['disabled'];
  }
  
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = newValue;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(val) {
    if (val == '') {
      this.setAttribute('disabled', null);
      this.classList.toggle('disabled', true);
    } else {
      this.removeAttribute('disabled');
      this.classList.toggle('disabled', false);
    }
  }
}

customElements.define('hello-world', HelloWorld);

export default HelloWorld;