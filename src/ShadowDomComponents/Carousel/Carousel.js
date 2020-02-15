import styleText from './style.scss';

const componentSheet = new CSSStyleSheet();
componentSheet.replaceSync(styleText);

class Carousel extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to <fancy-tabs>.
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.adoptedStyleSheets = [componentSheet];
    shadowRoot.innerHTML = `
      <slot></slot>
    `;
  }
}

customElements.define('my-carousel', Carousel);

export default Carousel;