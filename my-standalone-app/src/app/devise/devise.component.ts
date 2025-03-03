import { Component, OnInit } from '@angular/core';
import { Devise } from '../common/data/devise';
import { DeviseHelper } from '../common/helper/devise-helper';
//import { DeviseMemService } from '../common/service/devise-mem.service';
import { GenericCrudAbstractContextHelper } from '../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudHelper } from '../shared/component/crud/abstract/GenericCrudHelper';
import { GenericCrudContext } from '../shared/component/crud/GenericCrudContext';
import { ObjectHelper } from '../shared/helper/object-helper';
import { GenericCrudComponent } from '../shared/component/crud/generic-crud/generic-crud.component';
import { DeviseService } from '../common/service/devise-rest.service';
import { FilterDef } from '../shared/data/filter-def';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-devise',
  imports: [GenericCrudComponent,JsonPipe,FormsModule],
  templateUrl: './devise.component.html',
  styleUrl: './devise.component.scss'
})
export class DeviseComponent implements OnInit ,  GenericCrudAbstractContextHelper<Devise,String>{

  genericCrudContext : GenericCrudContext<Devise,String> ;
  //specific subpart for Devise or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public deviseService : DeviseService /*: DeviseMemService*/) {
    this.genericCrudContext = new GenericCrudContext<Devise,String>(this);
    this.genericCrudContext.filterDefs=[
      new FilterDef("serverSide" , "changeMini=",1,["0"]),
      new FilterDef("clientSide" , "change>=",1,["0"] , (obj:Devise)=>obj.change > 0),
      new FilterDef("clientSide" , "code.startsWith ",1,["?"] , (obj:Devise)=>obj.code.startsWith('?')),
    ]
   }

  objectHelper(): ObjectHelper<Devise, String> {
      return new DeviseHelper();
  }

  crudHelper(): GenericCrudHelper<Devise, String> | null {
    return null;
}
  
  ngOnInit(): void {
  }
}