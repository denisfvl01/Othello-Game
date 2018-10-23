document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var tablero = {
    url: './imagenes/tablero.png',
    imagen: Image,
    cargaOk: false
};
var FichaBlanca = {
    url: './imagenes/FichaBlanca.png',
    imagen: Image,
    cargaOk: false
};

tablero.imagen = new Image();
tablero.imagen.src = tablero.url;
FichaBlanca.imagen = new Image();
FichaBlanca.imagen.src = FichaBlanca.url;



tablero.imagen.addEventListener("load", function() {
    tablero.cargaOk = true;
    dibujar();
});

FichaBlanca.imagen.addEventListener("load", function() {
    FichaBlanca.cargaOk = true;
    dibujar();
});

function dibujar() {
    if (tablero.cargaOk) {
        lapiz.drawImage(tablero.imagen, 0, 0);
    }
    if (FichaBlanca.cargaOk) {
        lapiz.drawImage(FichaBlanca.imagen, 600, 0);
    }

}
var tecla = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
}

function movimiento(evento) {
    // switch (evento.keyCode) {
    //     case tecla.LEFT:
    //         alert("Izquierda");

    //         break;
    //     case tecla.UP:
    //         alert('arriba');
    //         break;
    //     case tecla.RIGHT:
    //         alert('derecha');
    //         break;
    //     case tecla.DOWN:
    //         alert('Abajo');
    //         break;
    //     case tecla.ENTER:
    //         alert('Enter');
    //         break;
    // }
}