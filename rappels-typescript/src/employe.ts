import { Personne } from "./personne";

export class Employe extends Personne {
    constructor(numero:number=0,
        nom:string="?",
        private _salaire:number=2500){
            super(numero,nom);
        }

        public afficher():void{
            super.afficher(); //afficher la partie "Personne d'un employe"
            console.log(`... cette Personne est un employe avec salaire=${this._salaire} `);
        }
}