class WithShadowComponent extends HTMLElement {
  
  constructor() {
    super();
   
  }


  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });//only accessible by web component
    //const shadow = this.attachShadow({ mode: 'open' });//acessible outside with Element.shadowRoot
    shadow.innerHTML = `
      <style>
      div {
        text-align: center;
        font-weight: normal;
        padding: 1em;
        background-color: #eee;
        border: 1px solid blue;
      }

      .c1{ color: green; }

      :host {
        display: block;
        background-color: lightgreen;
        padding : 1em;
      }
      

    </style>
    <div class="c1 c2">With-shadow-DOM <slot name="comment"></slot></div>
    `
  }

}

customElements.define("with-shadow-component", WithShadowComponent)
//NB: le selecteur :host permet de cibler la racine du webComponent
//ici la balise <with-shadow-component></...> contenant elle meme la <div>...</>