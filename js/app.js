document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var matriz = new Array(8);
const ESPACIOX = 8;
const ESPACIOY = 9;
var turnoNegro = false;

var tablero = {
    url: './imagenes/tablero.png',
    imagen: Image,
    cargaOk: false
};
var FichaBlanca = {
    url: './imagenes/FichaBlanca.png',
    imagen: Image
};
var FichaNegra = {
    url: './imagenes/FichaNegra.png',
    imagen: Image
}
var tecla = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    ENTER: 13
}

tablero.imagen = new Image();
tablero.imagen.src = tablero.url;
FichaBlanca.imagen = new Image();
FichaBlanca.imagen.src = FichaBlanca.url;
FichaNegra.imagen = new Image();
FichaNegra.imagen.src = FichaNegra.url;



tablero.imagen.addEventListener("load", function() {
    tablero.cargaOk = true;
    dibujar();
});

generarMatriz();
generarFichasNegras();
generarFichasBlancas();
dibujar();

function dibujar() {
    if (tablero.cargaOk) {
        lapiz.drawImage(tablero.imagen, 0, 0);
    }
};

function generarMatriz() {
    for (let row = 0; row < matriz.length; row++) {
        matriz[row] = new Array(8);
        for (let col = 0; col < matriz[row].length; col++) {
            matriz[row][col] = 'x';
        }
    }
};

function generarFichasNegras() {
    matriz[180 / 60][180 / 60] = 'ficha-negra';
    matriz[240 / 60][240 / 60] = 'ficha-negra';
};

function generarFichasBlancas() {
    matriz[180 / 60][240 / 60] = 'ficha-blanca';
    matriz[240 / 60][180 / 60] = 'ficha-blanca';
};

function dibujarMatriz() {
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'ficha-negra') {
                lapiz.drawImage(FichaNegra.imagen, (60 * col) + ESPACIOX, (60 * row) + ESPACIOY);
            }
            if (matriz[row][col] == 'ficha-blanca') {
                lapiz.drawImage(FichaBlanca.imagen, (60 * col) + ESPACIOX, (60 * row) + ESPACIOY);
            }
        }
    }
}

function nuevoJuego() {

    turnoNegro = true;

    generarMatriz();
    generarFichasNegras();
    generarFichasBlancas();
    dibujarMatriz();

    turnos();
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

function turnos() {
    if (turnoNegro) {
        alert('Mueve ficha negra');
        //turnoNegro();
    } else {
        alert('Mueve ficha blanca');
        //turnoBlanco();
    }
}