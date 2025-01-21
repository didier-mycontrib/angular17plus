import { Component, OnInit } from '@angular/core';
import { Product } from '../common/data/product';
import { ProductHelper } from '../common/helper/product-helper';
import { ProductMemService } from '../common/service/product-mem.service';
import { GenericCrudAbstractContextHelper } from '../shared/component/crud/abstract/GenericCrudAbstractContextHelper';
import { GenericCrudHelper } from '../shared/component/crud/abstract/GenericCrudHelper';
import { GenericCrudContext } from '../shared/component/crud/GenericCrudContext';
import { ObjectHelper } from '../shared/helper/object-helper';
import { GenericCrudComponent } from '../shared/component/crud/generic-crud/generic-crud.component';

@Component({
  selector: 'app-product',
  imports: [GenericCrudComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit ,  GenericCrudAbstractContextHelper<Product,String|null>{

  genericCrudContext : GenericCrudContext<Product,String|null> ;
  //specific subpart for Devise or Contect or other Entity
  //this specific subpart is based on sub-sub-part "GenericContexHelper" implements by this class .

  constructor(public productService : ProductMemService) {
    this.genericCrudContext = new GenericCrudContext<Product,String|null>(this);
   }

  objectHelper(): ObjectHelper<Product, String|null> {
      return new ProductHelper();
  }

  crudHelper(): GenericCrudHelper<Product, String> | null {
    return null;
}
  
  ngOnInit(): void {
  }

}
