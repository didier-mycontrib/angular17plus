
window.onload=()=>{

    document.getElementById("btnExLetAndConst").addEventListener("click",()=>{
		displayFunctionCode(test_let_and_const);
		dualDisplayMessage("let_and_const results:\n");
		test_let_and_const();
	});

	document.getElementById("btnExArrowFunctions").addEventListener("click",()=>{
		displayFunctionCode(test_arrow_functions);
		dualDisplayMessage("arrow_functions results:\n");
		test_arrow_functions();
	});

	document.getElementById("btnExParcoursCollections").addEventListener("click",()=>{
		displayFunctionCode(test_parcours_tableau);
		dualDisplayMessage("parcours_tableau results:\n");
		test_parcours_tableau();
	});

	document.getElementById("btnExTemplateString").addEventListener("click",()=>{
		displayFunctionCode(test_template_string);
		dualDisplayMessage("template_string results:\n");
		test_template_string();
	});

}


function test_let_and_const(){
	const PISur2 = Math.PI / 2;
	//PISur2 = 2; // Error, can't assign to a `const`
	dualAppendMessage("PISur2 = " + PISur2);

	var tableau  = new Array();
	tableau[0] = "abc";  
	tableau[1] = "def";

	var i  = 5;  
	var j  = 5;

	//for(let i in tableau) {
	for(let i=0; i<tableau.length; i++) {
		dualAppendMessage("*** at index " + i + " value = " + tableau[i] ) ;
	}

	//for(j=0; j<tableau.length; j++) {
	for(var j=0; j<tableau.length; j++) {
		dualAppendMessage("### at index " + j + " value = " + tableau[j] ) ;
	}

	dualAppendMessage("i=" + i); //affiche i=5
	dualAppendMessage("j=" + j); //affiche j=2
}


function test_arrow_functions(){
	myFct = tab => tab.length;
	let numRes = myFct([12,58,69]);
	dualAppendMessage("numRes=" + numRes); //affiche 3

	let array1 = [ 1 , 2 , 3 , 4 , 5 , 6 ];
	let eltPairs = [];
	array1.forEach( (e) => { if( (e % 2) === 0 ) 
								 eltPairs.push(e); 
						   } 
				  );
	dualAppendMessage(eltPairs);  // affiche [2,4,6]
	
	let eltImpairs =  eltPairs.map( v => v-1 );
	console.log(eltImpairs);  // affiche [1,3,5]
	
	let toto = {
	  _name: "toto",
	  _friends: [ 'titi' , 'tata'],
	  printFriends() {
		this._friends.forEach(f =>
			dualAppendMessage(this._name + " est ami avec " + f));
	  }
    };
	toto.printFriends();
}

function test_parcours_tableau(){
	let tableau = new Array();

	//tableau.push("abc");
	//tableau.push("def");

	tableau[0] = "abc";
	tableau[1] = "def";
	
	let n  = tableau.length;
	for(let i = 0; i<n; i++) {
		dualAppendMessage(">> at index " + i  + " value = " + tableau[i] );
	}

	for(let i in tableau) { 
		dualAppendMessage("** at index " + i  + " value = " + tableau[i] );
	}

	for( let s  of tableau){
		dualAppendMessage("## val = " + s);
	}


}

function test_template_string(){
	let name = "toto";
	let year=2015;
	
	// ES5
	//var message = "Hello " + name + " , happy " + year; // Hello toto , happy 2015

	// ES6
	const message = `Hello ${name} , happy ${year}`; // Hello toto , happy 2015
    
	dualAppendMessage(message);
	
	let x=5 , y=6;
	let carre = (x) => x*x ;
	dualAppendMessage(`pour x=${x} et y=${y} , x*y=${x*y} et x*x=${carre(x)}`);
	//affiche pour x=5 et y=6 , x*y=30 et x*x=25
	
	/*
	//ES5
	var htmlPart=
	"<select>  \
	   <option>1</option> \
	   <option>2</option> \
	 </select>";
	 */
	 
	//template multi-lignes ES2015:
	let htmlPart=
	`<select>
	   <option>1</option> 
	   <option>2</option> 
	 </select>`; 
	 dualAppendMessage(htmlPart);
}


function test_dynamic_get(){
	var obj = {
	  get dernier() {
		if (this.arrayXy.length > 0) {
		  return this.arrayXy[this.arrayXy.length - 1];
		}
		else {
		  return null;
		}
	  },
	  arrayXy: ["un","deux","trois"]
	}
	
console.log("dernier="+obj.dernier); // "trois"
}

function test_prog_objet(){
	
	class Compte{
		
		constructor(numero=0,label="?",solde=0.0){
			this.numero = numero;
			this.label=label;
			this.solde=solde;
		}
		
		get decouvertAutorise(){
			return (this._decouvertAutorise!=undefined)?this._decouvertAutorise:0;
		}
		
		set decouvertAutorise(decouvertAutorise){
			this._decouvertAutorise = decouvertAutorise;
		}
		
		asSimpleString() {
			return `${this.numero} ${this.label} ${this.solde}`;//template string es2015
		}
		

		debiter(montant) {
			this.solde -= montant; // this.solde = this.solde - montant;
		}

		crediter(montant){
			this.solde += montant; // this.solde = this.solde + montant;
		}
	}
	
	
	
	class CompteEpargne extends Compte {
		constructor(numero=0,label="?",solde=0.0){
			super(numero,label,solde);
		}
		
		static get tauxInteret(){
			return CompteEpargne.prototype._tauxInteret;
		}
		
		static set tauxInteret(tauxInteret){
			CompteEpargne.prototype._tauxInteret=tauxInteret;
		}
		
		static get plafond(){
			return CompteEpargne.prototype._plafond;
		}
		
		static set plafond(plafond){
			CompteEpargne.prototype._plafond=plafond;
		}
		
		static methodeStatiqueUtilitaire(message){
			console.log(">>>" + message + "<<<");
		}
	}
	CompteEpargne.prototype._tauxInteret = 1.5 ;  //1.5% par defaut
	CompteEpargne.prototype._plafond = 12000; //par defaut
	
	let cEpargne897 = new CompteEpargne(897,"livret A" , 200.0);
	cEpargne897.solde = 250.0;
	console.log("taux interet courant=" + CompteEpargne.tauxInteret);//1.5
	console.log("plafond initial=" + CompteEpargne.plafond);//12000
	CompteEpargne.plafond = 10000; 
	let messagePlafond= "nouveau plafond=" + CompteEpargne.plafond;//10000 
	CompteEpargne.methodeStatiqueUtilitaire(messagePlafond);
	
	
	let c1 = new Compte(); //instance (exemplaire) 1
	console.log("numero et label de c1: " + c1.numero + " " + c1.label);
	console.log("solde de c1: " + c1.solde);
	let c2 = new Compte(); //instance (exemplaire) 2
	c2.solde = 100.0;
	c2.crediter(50.0);
	console.log("solde de c2: " + c2.solde);  //150.0
	let c3 = new Compte(3,"compte3",300); //instance (exemplaire) 3
	console.log("c3: " + JSON.stringify(c3));  //{"numero":3,"label":"compte3","solde":300}
	console.log("c3.decouvertAutorise="+c3.decouvertAutorise);
	let c4 = new Compte(4,"compte4");
	console.log(c4.asSimpleString());
	c4.decouvertAutorise = -300; 
	let decouvertAutorisePourC4 = c4.decouvertAutorise;
	console.log("decouvertAutorisePourC4="+decouvertAutorisePourC4);
	
}

function test_heritage(){

class Animal {
    constructor(name="default animal name") {
		this.name= name;
	}
    move(meters= 0) {
        console.log(this.name + " moved " + meters + "m.");
	}
}

class Snake extends Animal {
    constructor(name) { 
	  super(name);
	}
    move(meters = 5) {
        console.log("Slithering...");
        super.move(meters);
    }
}

class Horse extends Animal {
    constructor(name) { 
	   super(name); 
	}
    move(meters = 45) {
        console.log("Galloping...");
        super.move(meters);
    }
}

var a = new Animal(); //var a = new Animal("animal");

var sam = new Snake("Sammy the Python");  //var sam = new Snake();

var tom = new Horse("Tommy the Palomino");

a.move(); // default animal name moved 0m.
sam.move(); // Slithering… Sammy the Python moved 5m.

tom.move(34); //avec polymorphisme  (for  Horse)
 // Galloping… Tommy the Palomino moved 34m.
}

function test_object_assign(){
	
	class Pp { 
		constructor(p1=0,p2=0,p3=0){
			this.p1=p1; this.p2=p2; this.p3=p3;
		}
		
		sumOfP1P2P3(){
			return this.p1+this.p2+this.p3; 
		}
	}
	
	
	//data object only without method (ex: result of JSON.parse(--jsonString--))
	const subObj = { pa : "a1" , pb : "b1" };
	const obj1 = { p1: 123 , p2 : 456 , p3 : "abc" , subObj : subObj }; 
	
	var objCloneViaShallowCopy = {}
    Object.assign(objCloneViaShallowCopy,obj1); //copy of property reference
    console.log("clonage via assign / shallowCopy=" + JSON.stringify(objCloneViaShallowCopy));
	objCloneViaShallowCopy.subObj.pa="a2"; //modification à la fois sur objCloneViaShallowCopy.subObj
	                                       //et sur obj1.subObj
    console.log("obj1" + JSON.stringify(obj1));	
	objCloneViaShallowCopy.subObj.pa="a1"; //restituer ancienne valeur 
													 
													 
	var obj = JSON.parse(JSON.stringify(obj1));//clonage en profondeur
	console.log("clonage sans ajout=" + JSON.stringify(obj));
	obj.subObj.pa="a2"; //modification que sur obj.subObj
    console.log("obj1" + JSON.stringify(obj1));//obj1 inchangé
	
	Object.assign(obj, { p4: true , p5: "def" });
	console.log("après assign complement=" + JSON.stringify(obj));

    obj = JSON.parse(JSON.stringify(obj1));//réinitialisation du clone "obj"
	if(!(obj instanceof Pp)) console.log("obj is not an instance of Pp , no sumOfP1P2P3() method");
	//console.log("obj.sumOfP1P2P3()="+obj.sumOfP1P2P3()); not working 
	obj = Object.assign(new Pp(),obj);
	if((obj instanceof Pp)) console.log("obj an instance of Pp , with sumOfP1P2P3() method");
	console.log("obj.sumOfP1P2P3()="+obj.sumOfP1P2P3()); //ok : 579abc
	
	class C1 {
		constructor(id=null,label="?"){
			this.id=id; this.label=label;
		}
		
		displayId(){
			console.log(`id=${this.id}`);
		}
	}
	
	let myMixin = {
		//mixin object = set of additional methods (without real inheritance):
		
		labelToUpperCase(){
			this.label = this.label.toUpperCase();
		} ,
		displayLabel(){
			console.log(`label=${this.label}`);
		}
	}
	
	let objet = new C1(1,"abc");
	//objet.displayLabel();//not a method of C1
	Object.assign(C1.prototype,myMixin); //ajouter méthodes de myMixin  à C1 (au prototype de C1)
	objet.displayId();
	objet.labelToUpperCase();
	objet.displayLabel(); //ABC
	let objetBis = new C1(2,"def");
	objetBis.displayId();
	objetBis.displayLabel();//def
	
}

function test_map_set(){
	
// Sets (ensembles sans doublon)
var s = new Set();
s.add("hello").add("goodbye").add("hello");
if(s.size === 2) console.log("s comporte 2 elements");
if(s.has("hello")) console.log("s comporte hello");

// List ==> Array ordinaire (déjà en es5).

// Maps
var m = new Map();
m.set("hiver", "froid , neige");
m.set("primptemps", "fleur , vert");
m.set("ete", "soleil , plage");
m.set("ete", "chaud , plage"); //la nouvelle valeur remplace l'ancienne .
m.set("automne", "feuilles mortes");
let carateristique_ete = m.get("ete");
console.log("carateristique_ete="+carateristique_ete);
if(m.has("ete"))
	console.log("Map m comporte une valeur associée à ete");
for(saison of m.keys()){
	console.log("saison "+ saison + " - " + m.get(saison));
}
//m.values() permettrait d'effectuer une boucle sur les valeurs (peu importe les clefs)
for([k,v] of m.entries()){
	console.log("saison "+ k + " -- " + v);
}
m.forEach((val,key)=> console.log("saison "+ key + " --- " + val));
m.clear();
if(m.size==0)
	console.log("map m is empty");

//Bien que ce code soit lisible et explicite, un vieil objet javascript en faisait autant :
var objectMap = {
   hiver: "froid , neige",
   printemps: "fleur , vert",
};
objectMap["ete"]="chaud, plage";
console.log("carateristique_hiver="+ objectMap["hiver"]); // froid , neige

}

//test_let_and_const();
//test_parcours_tableau();
//test_arrow_functions();
//test_template_string();
//test_dynamic_get();
//test_prog_objet();
//test_heritage();
//test_map_set();
//test_object_assign();