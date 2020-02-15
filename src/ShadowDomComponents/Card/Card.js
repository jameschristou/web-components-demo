import styleText from './Card.scss';

const componentSheet = new CSSStyleSheet();
componentSheet.replaceSync(styleText);

class Card extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.
    this._href = "";

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
		return this._href;
	}

	set href(val){
		this.setAttribute('href', val);
  }
  
  attributeChangedCallback(name, oldVal, newVal){
    if(name == 'href'){
      this.shadowRoot.getElementById('content-link').href = newVal;
      this._href = newVal;
    }
	}
}

customElements.define('my-card', Card);

export default Card;