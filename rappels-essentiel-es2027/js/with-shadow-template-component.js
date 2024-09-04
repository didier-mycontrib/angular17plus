class WithShadowTemplateComponent extends HTMLElement {

  
  constructor() {
    super();
    this.defaultInnerHtmlTemplateAdd=`
        <slot name="title">PlaceHolder for Addition Default Title without h3</slot>
        <label>a:</label><input name="a" /> <br/>
        <label>b:</label><input name="b" /> <br/>
        <button id="btnAdd">add</button> <br/>
        <label>res:</label><span id="spanRes"></span>
        <hr/>
        <slot><!-- defaultInnerHtmlTemplateAdd_unamed_default_slot --></slot>
        <hr/>
    `
  }


  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'closed' });//only accessible by web component
    //const shadow = this.attachShadow({ mode: 'open' });//acessible outside with Element.shadowRoot
    const templateAddOuter = document.getElementById('templateAdd');
    let templateAdd = null;
    if(templateAddOuter){
      templateAdd = templateAddOuter.content.cloneNode(true);
    }else{
      const template = document.createElement('template');
      template.innerHTML=this.defaultInnerHtmlTemplateAdd;
      templateAdd = template.content.cloneNode(true);
    }

    shadow.append(templateAdd);
  
    shadow.getElementById("btnAdd").addEventListener("click", function(evt){
      let a = Number(shadow.querySelector("input[name='a']").value);
      let b = Number(shadow.querySelector("input[name='b']").value);
      let res=a+b;
      shadow.getElementById("spanRes").innerHTML=res;
    });

    
  }

}

customElements.define("with-shadow-template-component", WithShadowTemplateComponent)
