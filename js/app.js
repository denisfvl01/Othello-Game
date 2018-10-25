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
var col;
var row;

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

dibujar();

function dibujar() {
    if (tablero.cargaOk)
        lapiz.drawImage(tablero.imagen, 0, 0);
};

function generarMatriz() {
    for (row = 0; row < matriz.length; row++) {
        matriz[row] = new Array(8);
        for (col = 0; col < matriz.length; col++) {
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
    for (row = 0; row < matriz.length; row++) {
        for (col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'FN') {
                lapiz.drawImage(FichaNegra.imagen, (DIMENSION * col) + ESPACIOX, (DIMENSION * row) + ESPACIOY);
            }
            if (matriz[row][col] == 'FB') {
                lapiz.drawImage(FichaBlanca.imagen, (DIMENSION * col) + ESPACIOX, (DIMENSION * row) + ESPACIOY);
            }
        }
    }
};

function nuevoJuego() {
    turno = true;
    generarMatriz();
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
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.UP:
            if (y > ESPACIOY)
                y -= DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.RIGHT:
            if (x < 360 + ESPACIOX)
                x += DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.DOWN:
            if (y < 360 + ESPACIOY)
                y += DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.ENTER:
            iniciarFicha();
            dibujar();
            dibujarMatriz();
            turnos();
            console.log(matriz);
            break;
    }
};

function turnos() {
    if (turno)
        lapiz.drawImage(FichaNegra.imagen, x + ESPACIOX, y + ESPACIOY);
    else
        lapiz.drawImage(FichaBlanca.imagen, x + ESPACIOX, y + ESPACIOY);

};

function iniciarFicha() {
    if (turno) {
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') {
            matriz[y / DIMENSION][x / DIMENSION] = 'FN';
            turno = false;
            x = 0;
            y = 0;
            dibujar();
            dibujarMatriz();
        } else
            alert("movimiento invalido");
    } else {
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') {
            matriz[y / DIMENSION][x / DIMENSION] = 'FB';
            turno = true;
            x = 0;
            y = 0;
            dibujar();
            dibujarMatriz();
        } else
            alert("movimiento invalido");
    }
}