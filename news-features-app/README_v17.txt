NB: angular cli generate now (by default) "standalone (simpler) module"
------------------
ng new simpleApp
ng new --no-standalone appWithModules
-----------
NB: in standalone mode , components directly imports what they need .

Standalone components (independent of module) since angular 14
Standalone project since angular 16 and default since angular 17 .

=============

NB1: @Component({
  standalone: true, ... }) export class MyAngularStandaloneComponent {}

===============
NB2:
Standalone component can be imported (like others modules) in some angular module
@NgModule({
  declarations: [AlbumComponent],
  exports: [AlbumComponent], 
  imports: [PhotoGalleryComponent],
})
export class AlbumModule {}

============
NB3: bootstrapApplication(PhotoAppComponent); if @angular/core
     for bootstrapping angular app with a standalone component (without module)


================
NB: possible since angular 16+ 

RouterModule.forRoot([], {
     bindToComponentInputs: true 
   })

Queryparams at end of angular route url , retreived as @Input :

http://localhost:4200/articles?articleId=001

and 
@Input() articleId?: string;
in ArticleComponent .


