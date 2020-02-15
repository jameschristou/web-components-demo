import styleText from './MyTextfield.scss';

// constructable stylesheets
const componentSheet = new CSSStyleSheet();
componentSheet.replaceSync(styleText);

class MyTextfield extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    this.attachShadow({mode: 'open'});
    this.shadowRoot.adoptedStyleSheets = [componentSheet];
    this.shadowRoot.innerHTML = `
    <div class="editableTextfieldContainer">
      <input type="text" id="textinput" class="editableTextfield" value="" />
      <div id="actionsdiv" class="editableTextfieldActionsContainer hidden">
        <div class="editableTextfieldActions">
          <button id="saveBtn" class="editableTextfieldAction" tabindex="0">
            <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
              <path d="M6.735 12.322a1 1 0 0 0-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 0 0 3.939-3.883l.04-.04a492.598 492.598 0 0 0 3.658-3.643 1 1 0 0 0-1.424-1.404 518.42 518.42 0 0 1-3.64 3.625l-.04.04a2049.114 2049.114 0 0 1-3.775 3.722l-3.098-3.363z"></path>
            </svg>
          </button>
          <button id="cancelBtn" class="editableTextfieldAction" tabindex="1">
            <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
              <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z"></path>
            </svg>
          </button>
        </div>
      </div>
      <slot id="textslot" class="hidden"></slot>
    </div>
    `;

    this._textslot = this.shadowRoot.getElementById('textslot');
    this._textinput = this.shadowRoot.getElementById('textinput');
    this._actionsdiv = this.shadowRoot.getElementById('actionsdiv');
    this._saveBtn = this.shadowRoot.getElementById('saveBtn');
    this._cancelBtn = this.shadowRoot.getElementById('cancelBtn');

    this._textinput.onclick = (evnt) => {
        if(this._actionsdiv.classList.contains("hidden")){
          this._actionsdiv.classList.remove("hidden");
        }
      };

    // this._textinput.addEventListener("focusout", (evnt) => {
    //   console.log(evnt);

    //   if(evnt.target == this._saveBtn || evnt.target == this._cancelBtn){
    //     console.log('save event clicked');
    //     return;
    //   }

    //   saveCurrentEdit();
    //   console.log('clicked outside');
    // }, true);

    this._saveBtn.onclick =
      e => {
        saveCurrentEdit();
      };

    this._cancelBtn.onclick =
      e => {
        console.log('Cancelled text edit');

        if(!this._actionsdiv.classList.contains("hidden")){
          this._actionsdiv.classList.add("hidden");
        }

        // reset the text value
        this._textinput.value = this._textslot.assignedNodes()[0].textContent;
      };

    let saveCurrentEdit = () => {
      console.log('saveCurrentEdit');
      if(!this._actionsdiv.classList.contains("hidden")){
        this._actionsdiv.classList.add("hidden");
      }
  
      // update the text value
      this._textslot.assignedNodes()[0].textContent = this._textinput.value;
  
      // this event will cross the shadow dom boundary and bubble up to the page
      this._actionsdiv.dispatchEvent(new CustomEvent('MyTextfieldUpdated', {
        bubbles: true,
        composed: true,
        detail: {
          text: this._textinput.value
        }
      }));
    }

    // let documentClickEventListener = (evnt) => {
    //   console.log("Yes I'm here!");
    //   if(this._actionsdiv == null || this._textinput == null){
    //     console.log("escape its null!");
    //     return;
    //   }
  
    //   if(this._actionsdiv.classList.contains('hidden')) return;
  
    //   // if the user is clicking into the textfield
    //   if(evnt.target == this._textinput){
    //     console.log("escape");
    //     return;
    //   }
  
    //   let targetElement = evnt.target;
  
    //   do {
    //     if (targetElement == this._actionsdiv) {
    //       console.log("escape");
    //       return;
    //     }
    //     // Go up the DOM.
    //     targetElement = targetElement.parentNode;
    //   } while (targetElement);
  
    //   this.saveCurrentEdit();
    // }

    // document.addEventListener("click", this.documentClickEventListener);
  }

  connectedCallback() {
    // we need to do this here because in the constructor the slotted elements have not been assigned yet
    this._textinput.value = this._textslot.assignedNodes()[0].textContent;
  }
}

customElements.define('my-textfield', MyTextfield);

// this will capture the event raised when the text is changed and saved
document.addEventListener('MyTextfieldUpdated', event => console.log(event));

export default MyTextfield;