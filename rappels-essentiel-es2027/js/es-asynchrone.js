
window.onload=()=>{

    document.getElementById("btnExCallback").addEventListener("click",()=>{
		displayFunctionCode(test_callback_only);
		dualDisplayMessage("test_callback_only results:\n");
		test_callback_only();
	});

	document.getElementById("btnExPromise").addEventListener("click",()=>{
		displayFunctionCode(test_promise);
		dualDisplayMessage("test_promise results:\n");
		test_promise();
	});

	document.getElementById("btnExAsyncAwait").addEventListener("click",()=>{
		displayFunctionCode(test_async_await);
		dualDisplayMessage("test_async_await results:\n");
		test_async_await();
	});

	document.getElementById("btnExFetchApi").addEventListener("click",()=>{
		displayFunctionCode(test_fetch_api);
		dualDisplayMessage("test_fetch_api results:\n");
		test_fetch_api();
	});

}

function test_callback_only(){

	function gpsCoordsFromZip(zipCode){
		switch(zipCode){
			case "76000": return  { lat : 49.433331 , lon: 1.08333 }
			case "33000" : return  { lat : 44.833328 , lon: -0.56667 }
			default : return { lat : 0 , lon: 0 }
		}
	}

	function weatherFromGps(lat,lon){
		let sky=(lon>0)?"clear sky":"cloud";
		let temp=(lat>=45)?15:25;
		return { sky : sky , temp: temp };
	}

    function asyncGpsCoordsFromZip(zipCode,resolveCb){
        setTimeout( ()=> resolveCb(gpsCoordsFromZip(zipCode)) , 800);
	}

    function asyncWeatherFromGps(lat,lon,resolveCb){
        setTimeout( ()=> resolveCb(weatherFromGps(lat,lon)) , 800);
	}

	//first level async call
	asyncGpsCoordsFromZip("76000" , (gpsCoords)=>{
		//first level callback
		dualAppendMessage("For Zip=76000/Rouen , gpsCoords =" + JSON.stringify(gpsCoords));
		//second level (inner) async call
		asyncWeatherFromGps(gpsCoords.lat,gpsCoords.lon,
			//second level callback
			(weather)=>{ dualAppendMessage("For Zip=76000/Rouen , weather =" + JSON.stringify(weather)); }
		);
	});

}

function test_promise(){
	function gpsCoordsFromZip(zipCode){
		switch(zipCode){
			case "76000": return  { lat : 49.433331 , lon: 1.08333 }
			case "33000" : return  { lat : 44.833328 , lon: -0.56667 }
			default : return { lat : 0 , lon: 0 }
		}
	}

	function weatherFromGps(lat,lon){
		let sky=(lon>0)?"clear sky":"cloud";
		let temp=(lat>=45)?15:25;
		return { sky : sky , temp: temp };
	}

    function asyncGpsCoordsFromZip(zipCode){
		return new Promise( (resolve,reject) => {
          setTimeout( ()=> { if(zipCode==null) reject("error_null_zipCode"); 
			               else resolve(gpsCoordsFromZip(zipCode)) }, 800);
		});
	}

    function asyncWeatherFromGps(lat,lon){
		return new Promise( (resolve,reject) => {
             setTimeout( ()=> resolve(weatherFromGps(lat,lon)) , 800);
		});
	}

	//asyncGpsCoordsFromZip(null)//for error and
	asyncGpsCoordsFromZip("76000")//first async call returning immedialtly a Promise
	.then( (gpsCoords)=>{
		dualAppendMessage("For Zip=76000/Rouen , gpsCoords =" + JSON.stringify(gpsCoords));
		//second async call returning Promise , return it for next then()
		return asyncWeatherFromGps(gpsCoords.lat,gpsCoords.lon);
	})
	.then(	(weather)=>{ dualAppendMessage("For Zip=76000/Rouen , weather =" + JSON.stringify(weather)); })
	.catch(ex => dualAppendMessage("For Zip=76000/Rouen ,error  =" + ex));
	
}

function test_async_await(){
	function gpsCoordsFromZip(zipCode){
		switch(zipCode){
			case "76000": return  { lat : 49.433331 , lon: 1.08333 }
			case "33000" : return  { lat : 44.833328 , lon: -0.56667 }
			default : return { lat : 0 , lon: 0 }
		}
	}

	function weatherFromGps(lat,lon){
		let sky=(lon>0)?"clear sky":"cloud";
		let temp=(lat>=45)?15:25;
		return { sky : sky , temp: temp };
	}

    function asyncGpsCoordsFromZip(zipCode){
		return new Promise( (resolve,reject) => {
          setTimeout( ()=> { if(zipCode==null) reject("error_null_zipCode"); 
			               else resolve(gpsCoordsFromZip(zipCode)) }, 800);
		});
	}

    function asyncWeatherFromGps(lat,lon){
		return new Promise( (resolve,reject) => {
             setTimeout( ()=> resolve(weatherFromGps(lat,lon)) , 800);
		});
	}

	async function retreive_weather_76000(){
		try{
			//const gpsCoords = await asyncGpsCoordsFromZip(null)//for error and catch
			const gpsCoords = await asyncGpsCoordsFromZip("76000");
			dualAppendMessage("For Zip=76000/Rouen , gpsCoords =" + JSON.stringify(gpsCoords));
			const weather = await asyncWeatherFromGps(gpsCoords.lat,gpsCoords.lon);
			dualAppendMessage("For Zip=76000/Rouen , weather =" + JSON.stringify(weather));
		}catch(ex){
			dualAppendMessage("For Zip=76000/Rouen ,error  =" + ex);
		}
    }	
	retreive_weather_76000();
	
}

function test_fetch_api(){

	function callNinjaCatFactWithPromise(){
		let wsUrl = "https://catfact.ninja/fact";
		fetch(wsUrl)
		.then( (response)=>{
		  dualAppendMessage("response.status : " + response.status);
		  return response.json();})
		.then( (data)  =>	{ dualAppendMessage("response data : " + JSON.stringify(data)); } )
		.catch((ex)=>{ dualAppendMessage("error response : " + ex);});
	} 

	async function callNinjaCatFact(){
		let wsUrl = "https://catfact.ninja/fact";
		try{
		  const response  = await fetch(wsUrl);
		  dualAppendMessage("response.status : " + response.status);
		  if(response.ok){
			let data  = await response.json();
			dualAppendMessage("response data : " + JSON.stringify(data));
		  }else{
		   let text  = await response.text();
		   dualAppendMessage("error response text : " + text);
		  }
		}catch(ex){
		   dualAppendMessage("ex : " + ex);
		}
	} 
	//callNinjaCatFactWithPromise();
	callNinjaCatFact();//async/await version
}

