class PersonneV1{
    
    numero:number;
    nom : string ;
    private _age : number;
   /*public*/ humeur : string = "bonne humeur";

    constructor(numero:number=0,nom:string="?",age:number=0){
        this.numero=numero;
        this.nom=nom;
        this._age=age;
    }
  

    public afficher():void{
        console.log(`Personne nom=${this.nom} numero=${this.numero} age=${this.age}`);
    }

    public get age(){ 
        return this._age;
    }

    public set age(newAge:number){ 
        if(newAge>=0)
            this._age = newAge;
        else{
            console.log("age inchangé car nouvelle valeur demandée négative invalide");
        }
    }

   

    incrementerAge():void{
        this._age++;
    }
}

function test_PersonneV1 (){
    let p1 = new PersonneV1();
    console.log(`p1=Personne[age=${p1.age},nom=${p1.nom},numero=${p1.numero}]`);
    p1.incrementerAge();
    p1.nom="toto";
    p1.numero=12;
    console.log(`p1=Personne[age=${p1.age},nom=${p1.nom},numero=${p1.numero}]`);
    p1.age=-5; //valeur invalide qui sera ignorée/refusée
    //console.log("p1="+p1);//affiche p1=[object Object]
    console.log("p1="+JSON.stringify(p1));//affiche p1={"numero":12,"nom":"toto","_age":1}
    p1.age = 54;
    console.log("p1="+JSON.stringify(p1));

    const p2=new PersonneV1(2,"titi" , -33);
    console.log("p2="+JSON.stringify(p2));
}

test_PersonneV1();