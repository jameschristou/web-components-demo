import './style.scss';

const template = document.createElement('template');
template.innerHTML = `
<div class="editableTextfieldContainer">
  <input type="text" class="editableTextfield" />
  <div class="editableTextfieldActionsContainer hidden">
    <div class="editableTextfieldActions">
      <button class="editableTextfieldAction__save" tabindex="0">
        <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
          <path d="M6.735 12.322a1 1 0 0 0-1.47 1.356l3.612 3.919c.537.526 1.337.526 1.834.03l.364-.359a2335.638 2335.638 0 0 0 3.939-3.883l.04-.04a492.598 492.598 0 0 0 3.658-3.643 1 1 0 0 0-1.424-1.404 518.42 518.42 0 0 1-3.64 3.625l-.04.04a2049.114 2049.114 0 0 1-3.775 3.722l-3.098-3.363z"></path>
        </svg>
      </button>
      <button class="editableTextfieldAction__cancel" tabindex="1">
        <svg width="24" height="24" viewBox="1 -2 24 24" focusable="false" role="presentation">
          <path d="M12 10.586L6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 0 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 1 0-1.414-1.414L12 10.586z"></path>
        </svg>
      </button>
    </div>
  </div>
</div>`;

class EditableTextfield extends HTMLElement {
  constructor(){
    super();

    this._savedValue = this.value;
    this._clonedNode = template.content.cloneNode(true);

    this._textinput = this._clonedNode.querySelector('.editableTextfield');
    this._actionsdiv = this._clonedNode.querySelector('.editableTextfieldActionsContainer');

    this._textinput.onclick = e => {
      if(this._actionsdiv.classList.contains("hidden")){
        this._actionsdiv.classList.remove("hidden");
      }
    };

    this._clonedNode.querySelector('.editableTextfieldAction__save').onclick = e => {
      this.saveCurrentEdit();
    };

    this._clonedNode.querySelector('.editableTextfieldAction__cancel').onclick = e => {
      console.log('Cancelled text edit');

      if(!this._actionsdiv.classList.contains("hidden")){
        this._actionsdiv.classList.add("hidden");
      }

      // reset the text value
      this._textinput.value = this._savedValue;
    };
  }

  static get observedAttributes() {
    return ['disabled', 'value'];
  }
  
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this[attrName] = newValue;
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  
  set disabled(isDisabled) {
    if (isDisabled) {
      this.setAttribute('disabled', true);
      this.classList.toggle('disabled', true);
    } else {
      this.removeAttribute('disabled');
      this.classList.toggle('disabled', false);
    }
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(val) {
    if (val) {
      this.setAttribute('value', val);
    } else {
      this.removeAttribute('value');
    }
  }

  textfieldClickHandler(event){
    console.log("click handler fired");
  }

  connectedCallback() {
    this._textinput.value = this.value;
    this._savedValue = this.value;

    this.appendChild(this._clonedNode);
  }

  saveCurrentEdit(){
    console.log('saveCurrentEdit');
    if(!this._actionsdiv.classList.contains("hidden")){
      this._actionsdiv.classList.add("hidden");
    }

    // update the text value
    this._savedValue = this._textinput.value;

    // this event will cross the shadow dom boundary and bubble up to the page
    this._actionsdiv.dispatchEvent(new CustomEvent('MyTextfieldUpdated', {
      bubbles: true,
      composed: true,
      detail: {
        text: this._textinput.value
      }
    }));
  }
}

customElements.define('editable-textfield', EditableTextfield);

export default EditableTextfield;