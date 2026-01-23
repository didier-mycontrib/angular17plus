import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { HighlightBackgroundOverDirective } from '../shared/directive/highlight-background-over.directive';
import { HighlightBorderOverDirective } from '../shared/directive/highlight-border-over.directive';
import { InputDialogComponent } from '../shared/component/generic/input-dialog/input-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/component/generic/confirm-dialog/confirm-dialog.component';
import { TemplateDialogComponent } from '../shared/component/generic/template-dialog/template-dialog.component';
import { FormsModule } from '@angular/forms';
import { WithSimplePopupComponent } from './with-simple-popup/with-simple-popup.component';



@Component({
  selector: 'app-home',
  imports: [HighlightBackgroundOverDirective, HighlightBorderOverDirective,FormsModule,
    WithSimplePopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  age=signal(0);
  readonly dialog = inject(MatDialog); 
  ageColor=signal('black');
  divBackgroundColor=signal("lightyellow");
  
  @ViewChild('backColorChoose') //<ng-template #backColorChoose >
  backColorChooseTemplate!: TemplateRef<any>;

  @ViewChild('basicAgeInput') //<ng-template #basicAgeInput >
  basicAgeInputTemplate!: TemplateRef<any>;

  bgColorDialogContext = { bgColor : this.divBackgroundColor()};
  basicAgeDialogContext = { age : this.age()};

  onDialogAge(){
          InputDialogComponent.inputDialog$(this.dialog,"age")
          .subscribe( (result : string ) => {
            if(result!="")
               this.age.set(Number(result));
          });
  }

  onDialogChooseColor(){
    InputDialogComponent.inputChoiceDialog$(this.dialog,"color",["black","red","green","blue","orange"],this.ageColor())
    .subscribe( (result : string ) => {
      console.log("onDialogChooseColor result = "+result)
      this.ageColor.set(result);
    })
  }

  onDialogConfirmReset(){
    ConfirmDialogComponent.confirmDialog$(this.dialog,"reset age to 0 ?")
    .subscribe( (isOk : boolean ) => {
      if(isOk) this.age.set(0);
    });
  }
  

  onDialogChooseBackColor(){
    
    TemplateDialogComponent.templateDialog$(this.dialog, this.backColorChooseTemplate, "background color choice" )
    .subscribe( (isOk : boolean) => {
      if(isOk) 
        this.divBackgroundColor.set(this.bgColorDialogContext.bgColor);
    });
  }

  onBasicTemplateDialogAge(){
    /* NB:
        disableClose : true for modal 
        TemplateDialogComponent of shared/component/generic/template-dialog
        required data with .title of .template as TemplateRef
    */
   /*
    const dialogRef = this.dialog.open(TemplateDialogComponent,
          { disableClose : true ,
            data: { title : "How old are you ?" , template : this.basicAgeInputTemplate}
          });
    
        dialogRef.afterClosed().subscribe(
          (isOk : boolean) => {
              if(isOk) this.age.set(Number(this.basicAgeDialogContext.age));
          }
        );
    */

        TemplateDialogComponent.templateDialog$(this.dialog,this.basicAgeInputTemplate,"How old are you ?")
        .subscribe(
          (isOk : boolean) => {
              if(isOk) this.age.set(Number(this.basicAgeDialogContext.age));
          }
        );


  }

}
