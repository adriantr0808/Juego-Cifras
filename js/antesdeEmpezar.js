window.onload = iniciar;
var turno;
function iniciar() {
    document.getElementById("analizar").addEventListener("click", numeroJug, false);

    document.getElementById("intJugador1").innerHTML+="Por favor <span id='nombre1'>" + localStorage.getItem("usuario1") + "</span> introduce tu resultado:";
    document.getElementById("intJugador2").innerHTML+="Por favor <span id='nombre2'>" + localStorage.getItem("usuario2") + "</span> introduce tu resultado:";
    document.getElementById("nombre1").style.color = localStorage.getItem("color1");
    document.getElementById("nombre2").style.color = localStorage.getItem("color2");

}

function numeroAprox() {
    var salida = 0;
    var numero1 = document.getElementById("num1").value;
    var numero2 = document.getElementById("num2").value;
    var nombreUsu1 = localStorage.getItem("usuario1");
    var nombreUsu2 = localStorage.getItem("usuario2");
    localStorage.setItem(nombreUsu1, numero1);
    localStorage.setItem(nombreUsu2, numero2);
    var numeroObj = localStorage.getItem("numeroObj");

    var aprox1 = numeroObj - numero1;
    var aprox2 = numeroObj - numero2;

    if (aprox1 < aprox2) {
        salida = 1;


    } else if (aprox2 < aprox1) {
        salida = 2;

    } 

    return salida;

}

function analizar() {
    var num = numeroAprox();


    if (num != 0) {
        var nombre = localStorage.getItem("usuario" + num);

        localStorage.setItem("turno", nombre);

        document.getElementById("com").innerHTML = "El jugador que comienza es " + nombre+ " por tener el número más cercano";


    } else {
     
        document.getElementById("com").innerHTML = "El jugador que comienza es: " + localStorage.getItem("turno")+" porque tiene el turno";

        
         
         
         
    }

    tiempo();


}

function tiempo() {
    var TiempoRestante = 4;
    var downloadTimer = setInterval(function () {
        TiempoRestante--;
        document.getElementById("tiempoRes").innerHTML = "<p>Cambiando de página en: " + TiempoRestante+"</p>";
        if (TiempoRestante == 0) {
            window.location.href = 'test.html';
        }
        if (TiempoRestante <= 0)
            clearInterval(downloadTimer);


    }, 1000);
}



function numeroJug() {

   var jugador1 = document.getElementById("num1");
   var jugador2=document.getElementById("num2");
  
 

    var er = /^[0-9]{1,3}$/; //Utilizo esta expresion regular para que solo se puedan introducir numeros


    if (jugador1.value == "") { //Si el usuario no introduce nada esta controlado

        jugador1.nextElementSibling.textContent = " Tienes que introducir un numero";
        

    } else if (er.test(jugador1.value) == false) { //Si el usuario no introduce 1 2 o 3 numeros saltara error
        jugador1.nextElementSibling.innerHTML = "<br>Solo se pueden introducir numeros, de 1 a 3 digitos como máximo";
      jugador1.value = "";


    }else if(jugador2.value == ""){
        jugador1.nextElementSibling.textContent = ""; //Limpio el error del primer jugador
        jugador2.nextElementSibling.textContent = " Tienes que introducir un numero";
       
    }else if(er.test(jugador2.value) == false){
        jugador2.nextElementSibling.innerHTML = "<br>Solo se pueden introducir numeros, de 1 a 3 digitos como máximo";
        jugador2.value = "";
  
    }else{
         //Cuando ya esta todo correctamente validado, limpio los posibles errores que puede haber en ambos jugadores
        jugador1.nextElementSibling.textContent="";
        jugador2.nextElementSibling.textContent="";
        analizar();
    }
  

}