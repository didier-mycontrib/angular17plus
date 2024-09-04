export class Personne{
    
    /*public*/ humeur : string = "bonne humeur";

    constructor(public numero:number=0,
                public nom:string="?",
                private _age:number=0){
                    if(this._age <0) {
                        this.age=0; //+ ... 
                    }
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