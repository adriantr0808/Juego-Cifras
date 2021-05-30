window.onload = iniciar;



var numerosArr; //Para guardar el marcador
var turno;
var numeroObt;
var numero_jugador = obtNumeroJugador();

function iniciar() {
    numerosArr_string = localStorage.getItem('numerosArr');
    numerosArr = numerosArr_string.split(',');
    turno = localStorage.getItem('turno');
    if (emptyScore()) {
        document.getElementById("turnoDe").innerHTML = turno;
        document.getElementById('numeroObtenido').textContent = numero_jugador;
        var cajas = document.getElementsByName("obj"); //Cojo todos los números y simbolos
        //A cada y simbolo le doy un evento click
        for (i = 0; i < cajas.length; i++) {
            cajas[i].addEventListener("click", comprobar, false);
        }

        //Cojo los ids de los botones operar limpiar, test y por otro lado
        var botonOperar = document.getElementById("operar");
        var botonReset = document.getElementById("reset");
        var botonTest = document.getElementById("test");
        var botonPorOtroLado = document.getElementById("lado");


        //Les doy a los botones click con sus funciones correspondientes
        botonOperar.addEventListener("click", operar, false);
        botonReset.addEventListener("click", reset, false);
        botonTest.addEventListener("click", test, false);
        botonPorOtroLado.addEventListener("click", porOtroLado, false);

        //Evento de instrucciones

        document.getElementById("guia").addEventListener("click",ins);

    } else {
        ganador();
        calcularTurno();
        window.location.href = 'final.html';
    }
}


function ins(){
    window.open("ins.html", "Instrucciones de como comprobar", "width=600px,height=400px");
}


numerosAleatorios(); //Se generar los mismos numeros aleatorios que en la página principal





//En esta función hago que la caja sobre la que haga click el usuario se mueva a el panel
function comprobar(e) {
    var panel = document.getElementById("panel");
    var caja = e.target; // cojo la caja sobre la que hace click el usuario

    if (caja.className == "numero") { //Si la clase de la caja sobre la que he hecho clic es igual a numero, es decir lo que tiene dentro es un número
        if (caja.style.opacity != 0.4) { //Si la opacidad no es 0.4
            var sim = document.createElement("div"); //Creo un elemento div
            sim.innerHTML = caja.innerHTML; //En la variable sim me guardo el valor que contenga la caja
            panel.appendChild(sim); //A panel de añado el hijo sim
        }
        caja.style.opacity = 0.4; //Despues de haber pasado por el if anterior, a la caja sobre la que hice clic se le cambia la opacidad a 0.4
    } else {
        var sim = document.createElement("div");
        sim.innerHTML = caja.innerHTML;
        panel.appendChild(sim);
    }




}

//En esta función se realizan los operaciones
function operar() {

    var resultado = 0;
    var panel = document.getElementById("panel");


    var hijos = panel.children; //Cojo los hijos del panel


    var arrayHijos = []; //Me creo un array donde donde meto los hijos de panel

    for (i = 0; i < hijos.length; i++) { //Recorro los hijos de panel
        arrayHijos.push(hijos[i].innerHTML); //Voy metiendo en el array de hijos cada valor del hijo, con valor me refiero a que hay que poner innerHTML si no cogera HTMLcollection
    }

    if (arrayHijos.length > 3 || arrayHijos.length<3) { // Si hago 75+5+78+4 no esta permitada esa operación
        document.getElementById("mensajeCompr").textContent = "Solo se pueden realizar operaciones que contengan 2 numeros y un operador, de la siguiente forma ej: 34+2";
        reset();
    } else {
        if (arrayHijos[1] == "+") { //Si el segundo hijo que es donde se alberga el simbolo de la operacion que queremos hacer es igual a simbolo especifiaco realizara la operacion en cuestion

            resultado = Number(arrayHijos[0]) + Number(arrayHijos[2]); //Se ejecuta la operacion

        } else if (arrayHijos[1] == "-") {
            resultado = Number(arrayHijos[0]) - Number(arrayHijos[2]);
        } else if (arrayHijos[1] == "*") {
            resultado = Number(arrayHijos[0]) * Number(arrayHijos[2]);
        } else if (arrayHijos[1] == "/") {
            resultado = Number(arrayHijos[0]) / Number(arrayHijos[2]);
        }
    }





    var parrafo = document.createElement("p"); //Creo un elemento parrafo
    if (resultado != 0) { //Si le doy a comprobar y no he introducido ninguna operación me sacararía en el panel un 0, entonces como esa sentencia evito que salga un 0
        //Además englobe desde la linea 11 hasta la 137, para que si tengo un 0 en resultado, quiere decir que el usuairo no ha introducido nada, por tanto no quiero que se ejecute nada
        //De lo contrario, al operar en el array de operaciones, me contaria un " " como primero elemento del array y no me funcionaria la operación, por eso elgoba todo.
        parrafo.innerHTML = resultado; //Al elemento párrafo creado le inserto el resultado



        //Una vez se haga click en el boton operar, se ejecutara la operación que haya introducido el usuario y ADEMÁS SE BORRARAN LOS HIJOS QUE CONTENIAN LOS NUMEROS Y EL SIMBOLO DE OPERACIÓN QUE HABÍA PUESTO EL USUARIO
        //Para borrar los hijos, lo tengo que hacer de la siguiente forma:
        //establezco una variable k, que es el numero de repeticiones,es decir, de veces que quiero que borre el programa. ¿por que 3?, porque mis tres primeros hijos serian en este orden
        // un numero un simbolo de operación y otro numero por ejemplo: 25+1, serian mis tres primeros hijos de panel.
        //¿Y porque no hago removeChild[0],[1] y [2]?. Pues porque me da un error, creo que es porque me coge los espacios, entonces le doy un [0] en el indice, de forma
        //que siemrpe me borra el primero hijo la operacion seria asi: tenemos 25+1, primero se borraría 25, quedaria, +1, ahora se borraría el +, quedaría el 1, y por último se borraría el 1.
        //Siempre se va borrando el primer hijo, lo que pasa que lo hago en un bucle para que sea más rápido y se borre todo del tirón. 
        var k = 0;
        if (hijos.length != 0) { //Control para que si no tengo hijos que no ejecute la operación y que no me salga error en la consola
            do {

                panel.removeChild(hijos[0]);
                k++


            } while (k < 3);
        }


        panel.appendChild(parrafo);
        numeroObt = resultado;
    }



}

function porOtroLado() {
    document.getElementById("comprobacion").textContent="";
    var panel = document.getElementById("panel");


    var hijos = panel.children; //Cojo los hijos del panel

    var numeros = document.getElementsByClassName("numero");
    var numerosPadre = document.getElementById("numeros");

    //Al darle a por otro lado, recorro todos los numeros y si encuentra alguno que ya ha sido formado mediante el boton por otro lado, lo borra y depues se agregaria el nuevo
    for (i = 0; i < numeros.length; i++) { 
        if (numeros[i].id == "numeroEx") { 
            numerosPadre.removeChild(numeros[i]);
        }
    }
   
    if(hijos.length==1){
        var hijoGuardado = hijos[0].innerHTML;

    var numeros = document.getElementById("numeros");

    var caja = document.createElement("div");


    caja.setAttribute("class", "numero");
    caja.setAttribute("id", "numeroEx");

    caja.innerHTML = hijoGuardado;

    numeros.appendChild(caja);

    panel.removeChild(hijos[0]);

    caja.addEventListener("click", comprobar, false);
    }else{
        document.getElementById("comprobacion").textContent="Realiza alguna operación para guardar el resultado";
    }
    
}

//En esta función obtengo los números aleatorios que se generaron anteriormente en principal.html. 
//Lo hago mediante localStorage, en principal.html me guardo los números que salen y ahora los tengo aquí.
function numerosAleatorios() {
    var arrayTest = localStorage.getItem("numerosAleatorios");
    var arraySinComas = arrayTest.split(","); //Lo tengo que separar porque si no me coge todo el array como un string
    var cajas = document.getElementsByClassName("numero");

    //Recorro las cajas y voy insertando en cada una el numero del array correspondiente.
    for (i = 0; i < cajas.length; i++) {
        cajas[i].innerHTML = arraySinComas[i];
    }


}

//Limpio todos los hijos y dejo el panel de operaciones vacío
function reset() {
    var panel = document.getElementById("panel");
    var numeros = document.getElementsByClassName("numero");
    var hijos = panel.children;
    var numerosPadre = document.getElementById("numeros");

    var k;
    do {
        if (hijos.length != 0) {
            k = 0;

            panel.removeChild(hijos[0]); //Borro el primero hijo
            numeroObt = 0;
            k++ //aumento el contador
        }

    } while (k <= hijos.length); // este bucle se repite mientras k sea menor igual a la longitud del array de los hijos

    for (i = 0; i < numeros.length; i++) { //Recorro las cajas que contienen los números

        if (numeros[i].style.opacity != 1) { //Si no tiene opacidad 1
            numeros[i].style.opacity = 1; //Le doy la opacidad 1
        }

        if (numeros[i].id == "numeroEx") {
            numerosPadre.removeChild(numeros[i]);
        }
    }

}



function test() {
    var numero = null;
    if (document.getElementById('panel').children.length == 1) {
        numero = document.getElementById('panel').children[0].textContent;
    }

    if (numero != null) {
      
        //document.getElementById("comprobaciones").style.display = "none";
        //document.getElementById("mensajeCompr").innerHTML = "El resultado final es:";

        if (numero == numero_jugador) { //Si el numero que ha obtenido el usuario como resultado despues de las comprobaciones es igual al que ha introducido en primer lugar se ejecuta la operación del if
            var ganador = new Audio();
            ganador.src="audio/ganar-tonos.mp3";
            ganador.play();
            document.getElementById("comprobacion").innerHTML = " Has obtenido " + numero + "<br><br>"; // En el localStorage saco el nombre del jugador en cuestión dependiendo de en que botón se haya pulsado
            var usu1 = localStorage.getItem('usuario1');
            var usu2 = localStorage.getItem('usuario2');
            if (turno == usu1) {
                numerosArr[0] = numero;
                numerosArr[1] = 0;
            } else if (turno == usu2) {
                numerosArr[1] = numero;
                numerosArr[0] = 0;
            }
            

        } else {
            document.getElementById("comprobacion").innerHTML = "Has fallado al operar";
            var sonido = new Audio();
            sonido.src="audio/incorrecto.mp3";
            sonido.play();
            var usu1 = localStorage.getItem('usuario1');
            var usu2 = localStorage.getItem('usuario2');
            if (turno == usu1) {
                numerosArr[0] = 0;
            } else if (turno == usu2) {
                numerosArr[1] = 0;
            }
            calcularTurno();

        }
        tiempo('test.html');
        localStorage.setItem('numerosArr', numerosArr);

    } else {
        reset();
        document.getElementById("comprobacion").innerHTML = "Antes de comprobar debes <span style='color:blue';>introducir operaciones</span> y recuerda que <span style='color:blue';>solo puede haber un número al darle al 'test'</span>";
    }



}

function ganador() {

    var numeroObj = Number(localStorage.getItem("numeroObj"));

    for (let index = 0; index < numerosArr.length; index++) {
        numerosArr[index] = Number(numerosArr[index]);
    }


    if (numerosArr[0] == 0 && numerosArr[1] == 0) {
      
    } else if (numerosArr[0] <= numeroObj && numerosArr[1] <= numeroObj) {
        if (numerosArr[0] > numerosArr[1]) {
            sumarMarcador('usuario1');
        } else if (numerosArr[0] < numerosArr[1]) {
            sumarMarcador('usuario2');
        } else if (numerosArr[0] == numerosArr[1]) {
       
            sumarMarcador(turno);
        }
    }

}



function calcularTurno() {

    var usu1 = localStorage.getItem('usuario1');
    var usu2 = localStorage.getItem('usuario2');

    if (turno == usu1) {
        localStorage.setItem('turno', usu2);
    } else if (turno == usu2) {
        localStorage.setItem('turno', usu1);
    } else {
        console.log("Error al calcula el turno");
    }
}





function tiempo(link) {
    var TiempoRestante = 4;
    var downloadTimer = setInterval(function() {
        TiempoRestante--;
        document.getElementById("tiempoRes").innerHTML = "Tiempo restante " + TiempoRestante;
        if (TiempoRestante == 0) {
            window.location.href = link;
        }
        if (TiempoRestante <= 0)
            clearInterval(downloadTimer);


    }, 1000);
}



function emptyScore() {
    salida = false;
    for (let index = 0; index < numerosArr.length && !salida; index++) {
        if (numerosArr[index] == "") {
            salida = true;
        }

    }
    return salida;
}

function sumarMarcador(txt) {
    if (txt != 'usuario1' && txt != 'usuario2') {
        usuario1 = localStorage.getItem('usuario1');
        usuario2 = localStorage.getItem('usuario2');
        if (txt == usuario1) {
            txt = 'usuario1';
        } else if (txt == usuario2) {
            txt = 'usuario2';
        } else {
            console.log('ERROR AL CALCULAR RELACION NOMBRE JUGADOR');
        }
    }
    var marcador = Number(localStorage.getItem(txt + '_marcador'));
    marcador = marcador + 1;
    localStorage.setItem(txt + '_marcador', marcador);
}

function obtNumeroJugador() {
    var turno = localStorage.getItem("turno");
    var numeroObt = localStorage.getItem(turno);
    return numeroObt;
}