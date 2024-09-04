class TogglePanelComponent extends HTMLElement {
  
  constructor() {
    super()
    this.label="TogglePanelComponent"; //default value 
    this.toggleP = false;
  }

  initComponentInnerHtml(){
    this.componentCssTemplateString = `
      .my-card { margin-top: 0.1em; margin-bottom: 0.1em; }
      .my-card-header { border-top-left-radius: 0.3em; border-top-right-radius: 0.3em;
      padding: 0.1em; margin-bottom: 0px;}
      a { text-decoration: none;}
      .my-card-body {border: 0.1em solid blue; border-bottom-left-radius: 0.3em;
      border-bottom-right-radius: 0.3em; padding: 0.2em;}
      .my-bg-primary { background-color: blue;}
      .my-text-light { color : white;}
      .my-icon { color : blue; background-color: white; margin: 0.2em;
      padding-left: 0.2em; padding-right : 0.2em;
      min-width: 1em; font-weight: bold;}
      .my-collapse { display : none;}
      .my-show { display : block ;}
    `

    this.componentHtmlTemplateString = `
    <div class="my-card">
      <h4 class="my-card-header my-bg-primary" id="myCardHeader">
      <a class="my-text-light"  >
      <span class="my-icon" id="myIconShow">+</span>
      <span class="my-icon" id="myIconCollapse" style="display:none">-</span>${this.label}
      </a>
      </h4>
      <div  id="myCardBody" class="my-card-body my-collapse">
      <slot></slot>
      </div>
    </div>
    `

    this.componentInnerHtml = `
    <style>
    ${this.componentCssTemplateString}
    </style>

    ${this.componentHtmlTemplateString}
    `
  }

  // component attributes
  static get observedAttributes() {
    return ['label'];
  }

// attribute change
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[ property ] = newValue;
  }




  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });//only accessible by web component
    //const shadow = this.attachShadow({ mode: 'open' });//acessible outside with Element.shadowRoot
    this.initComponentInnerHtml();
    shadow.innerHTML = this.componentInnerHtml;
    shadow.getElementById("myCardHeader").addEventListener("click", function(evt){
     this.toggleP = ! this.toggleP;
     //console.log("toggleP="+this.toggleP);
     const  myCardBody = shadow.getElementById("myCardBody");
     myCardBody.setAttribute("class" , "my-card-body my-collapse" + (this.toggleP?"my-show":""))
     const  myIconShow = shadow.getElementById("myIconShow");
     const  myIconCollapse = shadow.getElementById("myIconCollapse");
     myIconShow.style.display=this.toggleP?'none':'inline-block';
     myIconCollapse.style.display=this.toggleP?'inline-block':'none';
    });
  }

}

customElements.define("toggle-panel-component", TogglePanelComponent)