/* Function to check acceptance of string. Assumes this matrix format:
	 * Matrix A NxM is the transition matrix, N=states, M=alphabet symbols, q0=first state and F=final states. 
	 * Example N={a,b,c}, M={0,1}, q0=a, F={b,c}. 
		      0  1
		    a[b][b]
		A=  b[c][b] so A={{a,b},{c,b},{a,a}}
		    c[a][a]
		States should be easily handled by using their index on the matrix, in the example a=0, b=1, c=2.
		Symbols could also be handled that way.
	 */

	 //test: ejemplo de entrada de la profe. 
	 /*   0,1
	  *   0-1&0
	  *   1-1&2
	  *   *2-2&2
	  */
	  //global variables
	  var ag; //transition matrix
	  var ng; //states
	  var mg; //alphabet
	  var q0g;//initial state
	  var fg; //final states
	 
 

	 function parse(afd){
		var lines= afd.split('\n');
		ag=[];
		ng=[];
		//symbols asigned from first line
		mg=lines[0].split(',');
		for(var i=0;i<mg.length;i++)
		mg[i]=parseInt(mg[i]);
		//initial state, read from 2nd line
		q0g=lines[1].charAt(0)=='*'? lines[1].charAt(1):lines[1].charAt(0);
		fg=[];
		for(var i=1;i<lines.length;i++){
			//add states, if it has * add it to the final stage array aswell
			if(lines[i].charAt(0)=='*'){
				fg.push(parseInt(lines[i].charAt(1)));
				ng.push(lines[i].charAt(1))
			}
			else{
				ng.push(lines[i].charAt(0));
			}
			//add line to the matrix
			ag[i-1]=lines[i].split('-')[1].split('&');
		}
		//Testing
		console.log("a: "+ag);
		console.log(ag);
		console.log("n: "+ng);
		console.log(ng);
		console.log("m: "+mg);
		console.log(mg);
		console.log("q0: "+q0g);
		console.log(q0g);
		console.log("f: "+fg);
		console.log(fg);
	 }
	 var fileName;
	function readSingleFile(evt) {
	    //Retrieve the first (and only!) File from the FileList object.
	    var fl = evt.target.files[0];

	    if (fl) {
	      var r = new FileReader();
	      r.onload = function(e){ 
	      var contents = e.target.result;
	      console.log("Content:\n"+contents);

	      parse(contents);
	      
	      //fl.type= "Atomata Finito Determinista";
	      	console.log(fl)
	      	

	      	var fileName = fl.name;
	        //alert( "El archivo se cargó de manera correcta \n" 
	        //    	+"Nombre: " + fl.name + "\n"
	        //	  	+"type: " + (fl.type? fl.type : fl.name.split('.')[1]=="afd"? "Automata": "undefined") + "\n"
	        //    	+"size: " + fl.size + " bytes"+"\n"+
	        //    	+ "starts with: " + contents.substr(0, contents.indexOf("\n")))

	        var alfabeto = contents.substr(0, contents.indexOf("\n"));
	        console.log(alfabeto)
	        document.getElementById('alfabeto').innerHTML = "<br><div class='alert alert-info'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button><strong>Alfabeto: </strong>"+alfabeto+"</div>";
	        document.getElementById('whereIsTheFile').value = fileName;
	      }
	      r.readAsText(fl);
	    } 
	    else { 
	      alert("Falló la subida del archivo");
	    }
  	}
	 //Expected input: char[] m, char c where m is symbol array and c is one to evaluate
	 //this function translates symbols from char to int
	 //returns an int indicating index of char, or -1 if invalid char is given
	 function symbol(m, c){
		return m.indexOf(c);
	 }
	 //this function translates states from char to int // may not be necessary depending on the prev handling
	 //returns an int indicating index of state, or -1 if invalid char is given
	 function state(n, q){
		return n.indexOf(q);
	 }
	 //Expected input char[][]a, int q, char c, where q is the current state and c is the input symbol
	 //Returns an int for the new current state;
	 function transition(a,m,n, q, c){
		console.log("trans q: "+q);
		console.log(typeof c);
		console.log(m.indexOf(c));
		
		if(q!=-1 && symbol(m,c)!=-1){
			console.log("TRanstititon");
			return n.indexOf(a[q][symbol(m,c)]);
		}
		return -1;
	 }
	 // Expected Parameters: char[][] a, char[] n, char[] m, char q0, char[] f , string s 
	 //Returns true or false accordingly.
	 function eval(a,n,m,q0,f,s){
		//curState is an int
		var curState=state(n,q0);
		console.log("initial state: "+n[curState]);
		for( i=0; i<s.length; i++){
			console.log("Current state: "+n[curState]);
			console.log("Current symbol: "+s.charAt(i));
			console.log("transition says: "+transition(a,m,n,curState,s.charAt(i)));
			
			curState=transition(a,m,n,curState,s.charAt(i));
		}
		if(f.indexOf(n[curState])!=-1){
			
			var success = "<br><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+s+"</strong> es aceptada</div>";
			document.getElementById("placeAlert").innerHTML = success;
			return true;
		} 
		else{
			var danger = "<br><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+s+"</strong> no es aceptada</div>";
			document.getElementById("placeAlert").innerHTML = danger;
			return false;	
		} 
	 }



	 //Validate browser
	 function validateBrowserForFileUpload(){
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		}
		else {
			alert('The File APIs are not fully supported in this browser.');
		}
	}
	//
	
	var cadena;
	 function makeEvaluation(){
		cadena = document.getElementById('stringEvaluar').value;
		console.log("Evaluating: "+cadena);
		evaluar(cadena.split(""),0,0)
		
		//console.log(eval(ag,ng,mg,q0g,fg,s))
	}
	function evaluar(c,i,e){
		if(c.length==i){
			if(fg.lastIndexOf(parseInt(e))>=0){
				var success = "<br><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+c.join("")+"</strong> es aceptada</div>";
				document.getElementById("placeAlert").innerHTML = success;
			}else{
				var danger = "<br><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+c.join("")+"</strong> no es aceptada</div>";
				document.getElementById("placeAlert").innerHTML = danger;
			}
		}else{
		console.log("ELEMENTO NO.  "+i);
		console.log("cadena: "+c.join(""));
		console.log("elemento:"+c[i])
		console.log("est-actual:"+e);
		console.log("est-siguente:"+ag[parseInt(e)][mg.indexOf(parseInt(c[i]))]);
			evaluar(c,i+1,ag[parseInt(e)][mg.indexOf(parseInt(c[i]))]);
		}
	}
	validateBrowserForFileUpload();

	 
 

  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);


	 //string a evaluar
	 //var s="0000001001";
	 
	 //console.log(eval(a,n,m,q0,f,s));

