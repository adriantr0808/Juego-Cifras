window.onload = iniciar;

function iniciar() {
    document.getElementById("empezar").addEventListener("click", tiempo);

   
}



function generarNumeroAl() {
    var numeroAl = Math.round(Math.random() * (999 - 101) + 101);
    localStorage.setItem("numeroObj", numeroAl);
    document.getElementById("numeroGen").innerHTML = numeroAl;

}



function tiempo() {
    var reloj = new Audio();
    reloj.src = "audio/reloj.mp3";

    var cancion = new Audio();
    cancion.src="audio/cuentas.mp3";

   
    reloj.play();
    cancion.play();
    var botonEmpezar = document.getElementById("empezar");
    var cajaEmpezar = document.getElementsByClassName("empezar");
    botonEmpezar.removeEventListener("click", tiempo); //Le quito el evento click al boton empezar para no que se le de más de una vez y haya errores
    botonEmpezar.style.opacity = 0.4; //Cambio la opacidad para que el usuario sepa de forma visual que no puede darle mñas veces a empezar
    generarNumeroAl();
    var TiempoRestante = 4; //En esta línea se puede cambiar el tiempo 
    var downloadTimer = setInterval(function() {
        TiempoRestante--;
        document.getElementById("tiempoGen").innerHTML = TiempoRestante;
        

        if (TiempoRestante == 0) {
           reloj.pause();
            cancion.pause();
          
           
            var sonido = new Audio();
            sonido.src="audio/bocina.mp3";
            sonido.play();
            var boton = document.createElement("input");

            boton.setAttribute("type", "button");
            boton.setAttribute("id", "test");
            boton.setAttribute("value", "Comprobar");





            cajaEmpezar[0].appendChild(boton);


            document.getElementById("test").addEventListener("click", comprobar, false);

        }
        if (TiempoRestante <= 0)
            clearInterval(downloadTimer);


    }, 1000);



}

function comprobar() {
    window.location.href = "antesEmpezar.html";
    localStorage.setItem('numerosArr', Array(null, null));
}

function numerosAl() {
    var myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 75, 100];
    var cajas = document.getElementsByClassName("numero");
    
    var arrayTest = [];

    for (i = 0; i < cajas.length; i++) {
        var indice = Math.round(Math.random() * (13 - 0) + 0);
        cajas[i].innerHTML = myArray[indice];

        arrayTest.push(myArray[indice]);

    }

    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("numerosAleatorios", arrayTest);
    } else {
        "El navegador no tiene";
    }
}

numerosAl();