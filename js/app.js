document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var matriz = new Array(8);
const ESPACIOX = 8;
const ESPACIOY = 9;
const DIMENSION = 60;
var turno = false;
var x = 0;
var y = 0;

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
dibujar();

function dibujar() {
    if (tablero.cargaOk)
        lapiz.drawImage(tablero.imagen, 0, 0);
    dibujarMatriz();
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
    matriz[180 / DIMENSION][180 / DIMENSION] = 'FN';
    matriz[240 / DIMENSION][240 / DIMENSION] = 'FN';
};

function generarFichasBlancas() {
    matriz[180 / DIMENSION][240 / DIMENSION] = 'FB';
    matriz[240 / DIMENSION][180 / DIMENSION] = 'FB';
};

function dibujarMatriz() {
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'FN')
                lapiz.drawImage(FichaNegra.imagen, (DIMENSION * col) + ESPACIOX, (DIMENSION * row) + ESPACIOY);
            if (matriz[row][col] == 'FB')
                lapiz.drawImage(FichaBlanca.imagen, (DIMENSION * col) + ESPACIOX, (DIMENSION * row) + ESPACIOY);
        }
    }
};

function nuevoJuego() {
    turno = true;
    generarFichasNegras();
    generarFichasBlancas();
    dibujar();
    dibujarMatriz();
    turnos();
};

function movimiento(evento) {
    switch (evento.keyCode) {
        case tecla.LEFT:
            if (x > ESPACIOX)
                x -= DIMENSION;
            mover();
            break;
        case tecla.UP:
            if (y > ESPACIOY)
                y -= DIMENSION;
            mover();
            break;
        case tecla.RIGHT:
            if (x < 360 + ESPACIOX)
                x += DIMENSION;
            mover();
            break;
        case tecla.DOWN:
            if (y < 360 + ESPACIOY)
                y += DIMENSION;
            mover();
            break;
        case tecla.ENTER:
            iniciarFichaNegra();
            console.log(matriz);
            break;
    }
};

function turnos() {
    if (turno)
        turnoNegro();
    else
        turnoBlanco();
};


function turnoNegro() {
    lapiz.drawImage(FichaNegra.imagen, x + ESPACIOX, y + ESPACIOY);

};

function turnoBlanco() {
    lapiz.drawImage(FichaBlanca.imagen, x + ESPACIOX, y + ESPACIOY);
};

function iniciarFichaNegra() {
    var row = 0;
    var col = 0;
    if (matriz[row][col] == 'x')
        matriz[row][col] = 'FN';
}