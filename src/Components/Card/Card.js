import './style.scss';

const template = document.createElement('template');
template.innerHTML = `
  <a class="card__link">
    <div class="card__image"></div>
    <div class="card__content"></div>
  </a>`;

class Card extends HTMLElement {
  constructor(){
    super();

    this._clonedNode = template.content.cloneNode(true);

    this._imageDiv = this._clonedNode.querySelector('.card__image');
    this._link = this._clonedNode.querySelector('.card__link');
    this._contentDiv = this._clonedNode.querySelector('.card__content');
  }

  static get observedAttributes() {
    return ['href'];
  }
  
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = newValue;
    }
  }

  get href(){
		return this.getAttribute('href');
	}

	set href(val){
    this.setAttribute('href', val);
    this._link.href = val;
  }

  connectedCallback() {
    // at this point we can examine the child elements for any image tags. we use spread because
    // nodelist is not a true array
    let childNodes = [...this.childNodes];

    childNodes.forEach((item, index) => {
      if(item instanceof HTMLImageElement){
        this._imageDiv.appendChild(item);
      }
      else if(item.name != '#text'){
        this._contentDiv.appendChild(item);
      }
    });

    this.appendChild(this._clonedNode);
  }
}

customElements.define('custom-card', Card);

export default Card;