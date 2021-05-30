window.addEventListener('load', load);

function load() {

    puntosMarcador();

    //Eventos de botones nueva ronda y salir

    document.getElementById("nueva").addEventListener("click", nuevaRonda, false);
    document.getElementById("salir").addEventListener("click", salir, false);
}

function puntosMarcador() {

    document.getElementById("marcador").innerHTML = "";
    document.getElementById("marcador").innerHTML += "<p><span id='nombre1'>" + localStorage.getItem('usuario1') + "</span> = " + localStorage.getItem('usuario1_marcador') + " puntos </p>";
    document.getElementById("marcador").innerHTML += "<p><span id='nombre2'>" + localStorage.getItem('usuario2') + "</span>  = " + localStorage.getItem('usuario2_marcador') + " puntos </p>";
    document.getElementById("nombre1").style.color = localStorage.getItem("color1");
    document.getElementById("nombre2").style.color = localStorage.getItem("color2");



}




function nuevaRonda() {
    window.location.href = "principal.html";
}

function salir() {
    window.location.href = "index.html";
}