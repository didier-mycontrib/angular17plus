import { Component, computed, effect, input, InputSignal, model, ModelSignal, output } from '@angular/core';
import { MyTogglePanelComponent } from '../../generic/my-toggle-panel/my-toggle-panel.component';
import { ObjectHelper } from '../../../helper/object-helper';
import { MyMessageComponent } from "../../generic/my-message/my-message.component";
import { FormsModule } from '@angular/forms';

/*
Sous composant servant à :
  - afficher une liste d'objets (avec colonnes selon essentialKeysArrayRef )
  - effectuer une sélection simple
  + effectuer d'éventuelles sélections multiples (future version)
*/


@Component({
  selector: 'gen-crud-table',
  imports: [MyTogglePanelComponent, MyMessageComponent,FormsModule],
  templateUrl: './gen-crud-table.component.html',
  styleUrl: './gen-crud-table.component.scss'
})
export class GenCrudTableComponent {

  title="";
  titleWithSize="";
  
  objectHelperRef :InputSignal<ObjectHelper<any,any> | null> = input(null,{transform: (objectHelper)=> <any> objectHelper });

  public messageRef :ModelSignal<string> = model("");

  //liste des objets à afficher
  tabObjectsRef  :InputSignal<object[] | null> 
    = input(null,{transform: (tabObjects)=> <any> tabObjects });

  //objet sélectionné (null au début):
  public selectedObjectRef :ModelSignal<any> = model(null);

  //liste des parties de l'objet à afficher (dans colonnes):
  essentialKeysArrayRef
   :InputSignal<string[] | null>  
      =input(null,{transform: (tabKey)=> <any> tabKey});

  tablePanelOpenState=true;

  ngOnChanges(){
    let s = this.tabObjectsRef()?.length;
    this.titleWithSize=`${this.title} (size=${s})`;
    //console.log("titleWithSize="+this.titleWithSize);
  }
  

  private resetMessageEffect = effect(()=>{
    if(this.selectedObjectRef() == null)
      this.messageRef.set("");
  });

  ngOnInit(){
    this.title = "list of " + this.objectHelperRef()?.getEntityTypeName();
  }

  objectEssentialValuesArray(obj:object):any[]{
    let arrayOfPropKeys = this.essentialKeysArrayRef()??[];
    let valuesArray = [];
    for(let key of arrayOfPropKeys){
     valuesArray.push(Reflect.get(obj,key));
    }
    return valuesArray;
   }

   public onSelectObject(obj:any){
    console.log("select object:" + obj);
    this.selectedObjectRef.set(obj);
    let id = this.objectHelperRef()?.getId(obj);
    this.messageRef.set(id+ " selected");
   }

}
