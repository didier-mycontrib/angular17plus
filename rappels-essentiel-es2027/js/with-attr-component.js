class WithAttrComponent extends HTMLElement {
  
  constructor() {
    super();
    this.name="?";//default value
    this.color="red";//default value
  }

  //static get observedAttributes() to define list of observedAttributes
  static get observedAttributes() {
    return ['name' , 'color'];
  }

  //attributeChangedCallback(property, oldValue, newValue) callback
  // to update new changed attibute/property value
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[ property ] = newValue;
  }
  
  connectedCallback() {
    this.innerHTML = `<div style="color:${this.color};font-size:24pt">Hello ${this.name}!</div>`
  }

}

customElements.define("with-attr-component", WithAttrComponent)