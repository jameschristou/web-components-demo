import styleText from './Card.scss';

const componentSheet = new CSSStyleSheet();
componentSheet.replaceSync(styleText);

class Card extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [componentSheet];
    this.shadowRoot.innerHTML = `
      <div class="gallery">
        <slot name="gallery"></slot>
      </div>
      <a id='content-link'>
        <div class="content">
          <slot name="title"></slot>
          <slot name="content"></slot>
        </div>
      </a>
    `;
  }

  static get observedAttributes(){
		return ['href'];
  }
  
  get href(){
		return this.getAttribute('href');
	}

	set href(val){
    this.setAttribute('href', val);
  }
  
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = newValue;
    }
  }
}

customElements.define('shadow-card', Card);

export default Card;