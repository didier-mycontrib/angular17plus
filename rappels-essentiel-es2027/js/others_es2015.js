
window.onload=()=>{

    document.getElementById("btnExDestructurationObjet").addEventListener("click",()=>{
		displayFunctionCode(test_destructuration_objet);
		dualDisplayMessage("test_destructuration_objet results:\n");
		test_destructuration_objet();
	});

	document.getElementById("btnExDestructurationTableau").addEventListener("click",()=>{
		displayFunctionCode(test_destructuration_tableau);
		dualDisplayMessage("test_destructuration_tableau results:\n");
		test_destructuration_tableau();
	});

	document.getElementById("btnExIterateurs").addEventListener("click",()=>{
		displayFunctionCode(test_iterateurs);
		dualDisplayMessage("test_iterateurs results:\n");
		test_iterateurs();
	});

	document.getElementById("btnExSpreadOperator").addEventListener("click",()=>{
		displayFunctionCode(test_spread_operator);
		dualDisplayMessage("test_spread_operator results:\n");
		test_spread_operator();
	});

}

function test_iterateurs(){
	var strAbc = "abc";
	dualAppendMessage(typeof strAbc[Symbol.iterator]); // "function"

	let itStrAbc = strAbc[Symbol.iterator]();          
	dualAppendMessage(JSON.stringify(itStrAbc.next()));  // { value: "a", done: false }
	dualAppendMessage(JSON.stringify(itStrAbc.next()));  // { value: "b", done: false }
	dualAppendMessage(JSON.stringify(itStrAbc.next()));  // { value: "c", done: false }
	dualAppendMessage(JSON.stringify(itStrAbc.next()));  // { value: undefined, done: true }

	let itAbc = strAbc[Symbol.iterator](); 
	var tabAbc = [ 'a', 'b' , 'c' ];
	//let itAbc = tabAbc[Symbol.iterator]() ;
	/*
	let loopItem = null;
	while((loopItem=itAbc.next()) && !loopItem.done) {
		dualAppendMessage(loopItem.value);
	}*/
	for(let eltOfAbc of itAbc){
		dualAppendMessage(">"+eltOfAbc);
	}


	var monIterable = {};
	monIterable[Symbol.iterator] = function* () {
		yield 'e1';
		yield 'e2'; //yield signifie "rendre , produire , donner , générer , ..."
		yield 'e3';
	};
	//NB: String, Array, TypedArray, Map et Set sont des itérables natifs 
	//car les prototypes de chacun ont tous une méthode Symbol.iterator.

	for(let elt of monIterable){
		dualAppendMessage(">>"+elt);
	}//>>e1  >>e2  >>e3

	var myArray1 = [ 'e0' , ...monIterable , 'e4' ,'e5' ];
	var myArray2 = [  ...monIterable  ];
	dualAppendMessage(myArray1); //[ 'e0', 'e1', 'e2', 'e3', 'e4', 'e5' ]
	dualAppendMessage(myArray2); //[ 'e1', 'e2', 'e3' ]

}

function test_spread_operator(){
	var myArray0 = [ 'e1', 'e2', 'e3' ];
	var monIterable = myArray0;
	var myArray2 = [  ...monIterable  ];
	var myArray1 = [ 'e0' , ...monIterable , 'e4' ,'e5' ];
	var myArray2 = [  ...monIterable  ];
	dualAppendMessage(myArray1); //[ 'e0', 'e1', 'e2', 'e3', 'e4', 'e5' ]
	dualAppendMessage(myArray2); //[ 'e1', 'e2', 'e3' ]
}

function test_destructuration_objet(){
	class Pays {
		constructor(nom="?",capitale="?",population=0,superficie=0){
			this.nom=nom; 
			this.capitale=capitale;
			this.propulation=population;
			this.superficie=superficie;
		}
	}
	const p1 = new Pays('France' , 'Paris' , 67000000 , 643801);
	
	const p2 = { nom : 'Allemagne' , capitale : 'Berlin' , population : 83000000, superficie : 357386};
	const p = p2;  //ou bien =p1
	//p=p1; interdit car "const p"
	p.population=83000001 //autorisé
	dualAppendMessage(JSON.stringify(p));
	
	const { nom , capitale } = p;
	dualAppendMessage("nom="+nom+" capitale="+capitale);
	//nom="?"; interdit car nom et capitale sont considérées comme des variables "const"
	
	//NB: les noms "population" et "superficie" doivent correspondre à des propriétés de l'objet 
	//dont il faut (partiellement) extraire certaines valeurs (sinon "undefined")
	//l'ordre n'est pas important
	const { superficie , population } = p;
	dualAppendMessage("population="+population+" superficie="+superficie);
}

function test_destructuration_tableau(){
	const [ id , label ] = [ 123 , "abc" ];
	dualAppendMessage("id="+id+" label="+label);
	
	//const array1Iterable = [ 123 , "abc" ];
	//var iterable1 = array1Iterable; 
	const string1Iterable = "XYZ";
	var iterable1 = string1Iterable; 
	const [ partie1 , partie2 ] = iterable1;
	dualAppendMessage("partie1="+partie1+" partie2="+partie2);
	
	//const [ v1 , v2, v3 ] = { p1 : "val1" , p2 : "val2" , p3 : "val3" }; not working (no iterable)
	//const { pv1 , pv2 , pv3 } = ["val1" ,  "val2" ,  "val3" ];//not working (property name not match)
	
	function fxabc_with_named_param( { paramX=0 , a=0 , b=0 , c=0 } = { } ){
		//return ax^2+bx+c
		return a * Math.pow(paramX,2) + b * paramX + c;
	}
	
	let troisFois4 = fxabc_with_named_param( { paramX :4 , b : 3 } );
	dualAppendMessage("troisFois4="+troisFois4 );//12
	let deuxFois4AuCarreplus6 = fxabc_with_named_param( { paramX :4 , a : 2 , c :6} );
	dualAppendMessage("deuxFois4AuCarreplus6="+deuxFois4AuCarreplus6 );//38
	
	const dayArray = ['lundi', 'mardi' , 'mercredi'];
	for (const entry of dayArray.entries()) {
		dualAppendMessage(entry);
	}
	//[ 0, 'lundi' ]
	//[ 1, 'mardi' ]
	//[ 2, 'mercredi' ]
	
	for (const [index, element] of dayArray.entries()) {
		dualAppendMessage(`${index}. ${element}`);
	}
	// 0. lundi
	// 1. mardi
	// 2. mardi
	
	const mapBoolNoYes = new Map([
		[false, 'no'],
		[true, 'yes'],
	]);
	for (const [key, value] of mapBoolNoYes) {
		dualAppendMessage(`${key} => ${value}`);
	}
	// false => no
	// true => yes
}

