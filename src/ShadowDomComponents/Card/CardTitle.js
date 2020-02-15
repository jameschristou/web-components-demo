import styleText from './CardTitle.scss';

const componentSheet = new CSSStyleSheet();
componentSheet.replaceSync(styleText);

class CardTitle extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.adoptedStyleSheets = [componentSheet];
    shadowRoot.innerHTML = `
      <slot></slot>
    `;

    // experiment: try getting child elements defined in the light dom and injecting them where required
    // in the shadow dom
  }

  // properties required
  // imageCount, videoCount, showVideoIcon
}

customElements.define('my-card-title', CardTitle);

export default CardTitle;