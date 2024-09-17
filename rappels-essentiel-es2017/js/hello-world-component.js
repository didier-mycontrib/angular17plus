class HelloWorldComponent extends HTMLElement {
  
  constructor() {
    super();
  }
  
  connectedCallback() {
    this.innerHTML = `<div style="color:red;font-size:24pt">Hello world!</div>`
  }

}

customElements.define("hello-world-component", HelloWorldComponent)