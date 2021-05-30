window.onload = iniciar;

function iniciar() {
    document.getElementById("comenzar").addEventListener("click", validar, false);
    document.getElementById("reglas").addEventListener("click", reglas, false);


}


function reglas() {
    window.open("reglas.html", "Reglas de juego", "width=600px,height=400px");
}



function validaNombreJug1() {
    var elemento = document.getElementById("nom1");
    if (!elemento.checkValidity()) {
        if (elemento.validity.valueMissing) {
            var mensaje = "Debe introducir un nombre de jugador ";
            error(elemento, mensaje);
        }

        return false;
    }

    if(elemento.value=="usuario1" || elemento.value=="usuario2"){
        var mensaje = "Debe introducir otro nombre de jugador";
        error(elemento,mensaje);

        return false;
    }
    return true;
}

function validaNombreJug2() {
    var elemento = document.getElementById("nom2");
    if (!elemento.checkValidity()) {
        if (elemento.validity.valueMissing) {
            var mensaje = "Debe introducir un nombre de jugador ";
            error2(elemento, mensaje);
        }

        return false;
    }

    if(elemento.value=="usuario1" || elemento.value=="usuario2"){
        var mensaje = "Debe introducir otro nombre de jugador";
        error2(elemento,mensaje);

        return false;
    }


    return true;
}



function error(elemento, mensaje) {
    document.getElementById("mensajeError").innerHTML = mensaje;
    elemento.focus();
}

function error2(elemento, mensaje) {
    document.getElementById("mensajeError2").innerHTML = mensaje;
    elemento.focus();
}




function validar(e) {
    document.getElementById("mensajeError").innerHTML = "";
    document.getElementById("mensajeError2").innerHTML = "";
    e.preventDefault();

    if (validaNombreJug1() && validaNombreJug2()) {

        if (typeof(Storage) !== "undefined") {
            var nombreJug1 = document.getElementById("nom1").value;
            var color1 = document.getElementById("col1").value;
          
            localStorage.setItem("usuario1", nombreJug1);
            localStorage.setItem("color1", color1);
            
            var nombreJug2 = document.getElementById("nom2").value;
            var color2 = document.getElementById("col2").value;
            
            localStorage.setItem("usuario2", nombreJug2);
            localStorage.setItem("color2", color2);

            localStorage.setItem('turno',nombreJug1);
          
            // MARCADOR JUGADORES
            localStorage.setItem('usuario1_marcador', 0);
            localStorage.setItem('usuario2_marcador', 0);


            window.location.href = "principal.html";


        } else {
            alert("El navegador no soporta LocalStorage");
        }

    }
}