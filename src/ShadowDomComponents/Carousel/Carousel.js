import styleText from './style.scss';

// using constructable style sheets...import the compiled sass as a string
// currently only natively supported in Chrome but there are polyfills
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

customElements.define('shadow-carousel', Carousel);

export default Carousel;