var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var matriz = new Array(8);
const ESPX = 8;
const ESPY = 9;
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
var mensajesJ = { //Mensajes del juego
    terminado: 'El juego ha terminado, ya no hay más jugadas posibles.',
    blancas: '¡Las blancas ganan!',
    negras: '¡Las negras ganan!',
    empate: '¡Es un empate!'
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
    if (tablero.cargaOk) {
        lapiz.drawImage(tablero.imagen, 0, 0);
    }
};

function generarMatriz(matrizRecibida) {
    for (let row = 0; row < matrizRecibida.length; row++) {
        matrizRecibida[row] = new Array(8);
        for (let col = 0; col < matrizRecibida.length; col++) {
            matrizRecibida[row][col] = 'x';
        }
    }
};

function generarFichas() {
    matriz[180 / DIMENSION][180 / DIMENSION] = 'FN';
    matriz[240 / DIMENSION][240 / DIMENSION] = 'FN';
    matriz[180 / DIMENSION][240 / DIMENSION] = 'FB';
    matriz[240 / DIMENSION][180 / DIMENSION] = 'FB';
};

function dibujarMatriz() {
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'FN') {
                lapiz.drawImage(FichaNegra.imagen, (DIMENSION * col) + ESPX, (DIMENSION * row) + ESPY);
            }
            if (matriz[row][col] == 'FB')
                lapiz.drawImage(FichaBlanca.imagen, (DIMENSION * col) + ESPX, (DIMENSION * row) + ESPY);
        }
    }
};

function nuevoJuego() { //Funcion del boton nuevo juego
    document.addEventListener("keydown", movimiento);
    turno = true; //true para turno negro
    generarMatriz(matriz); //genera la matriz con todo vacio
    generarFichas(); //Genera las fichas del centro
    dibujar(); //Dibuja el tablero
    dibujarMatriz(); //Dibuja la matriz
    turnos(); //Hace que empiece el juego con la ficha del turno correspondiente
};

function movimiento(evento) {
    switch (evento.keyCode) {
        case tecla.LEFT:
            if (x > ESPX) //Verifica que no se pase del margen
                x -= DIMENSION;
            dibujar(); //Dibuja el tablero
            dibujarMatriz(); //Dibuja la matriz
            turnos(); //Hace que empiece el juego con la ficha del turno correspondiente
            break;
        case tecla.UP:
            if (y > ESPY)
                y -= DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.RIGHT:
            if (x < 360 + ESPX)
                x += DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.DOWN:
            if (y < 360 + ESPY)
                y += DIMENSION;
            dibujar();
            dibujarMatriz();
            turnos();
            break;
        case tecla.ENTER:
            colocarFicha();
            dibujar();
            dibujarMatriz();
            turnos();
            console.log(matriz);
            break;
    }
};

function turnos() { //Es llamado al presionar enter
    if (turno) {
        lapiz.drawImage(FichaNegra.imagen, x + ESPX, y + ESPY);
    } else {
        lapiz.drawImage(FichaBlanca.imagen, x + ESPX, y + ESPY);
    }

};

function colocarFicha() { //Verifica que se pueda colocar la ficha en la posición indicada
    if (turno) { //turno de fichas negras
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') { //Verifica que esté vacía la celda
            matriz[y / DIMENSION][x / DIMENSION] = 'FN'; //Cambia el valor al de la ficha
            movimientoValido();
            turno = false; //Cambia el turno
            x = 0; //Genera la imagen desde 0
            y = 0; //Genera la imagen desde 0
            dibujar(); //Dibuja el tablero
            dibujarMatriz(); //Dibuja la matriz según los calores
            jugadaPosible();
        } else {
            alert("movimiento invalido");
        }
    } else { //turno de fichas blancas
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') {
            matriz[y / DIMENSION][x / DIMENSION] = 'FB';
            turno = true;
            x = 0;
            y = 0;
            dibujar();
            dibujarMatriz();
            jugadaPosible();
        } else {
            alert("movimiento invalido");
        }
    }
};

function jugadaPosible() {
    let posibleJugada = 0;
    let fichasBlancas = 0;
    let fichasNegras = 0;
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'x') {
                posibleJugada++;
            } else {
                matriz[col][col] == 'FN' ? fichasNegras++ : fichasBlancas++;
            }
        }
    }
    if (posibleJugada == 0) {
        alert(mensajesJ.terminado);
        if (fichasBlancas != fichasNegras) {
            alert((fichasBlancas < fichasNegras ? mensajesJ.negras : mensajesJ.blancas));
        } else {
            alert(mensajesJ.empate);
        }
        location.reload();
    }
};

function movimientoValido() {
    let col = x / DIMENSION;
    let row = y / DIMENSION;
    let fb = 0;
    let fn = 0;
    let posiciones = new Array(8);
    generarMatriz(posiciones)
    if (turno) {
        if (row == 0) {
            for (let rows = 1; rows < matriz.length; rows++) {
                if (rows == 1 && (matriz[rows][col] == 'FN' || matriz[rows][col] == 'x')) {
                    break;
                } else {
                    if (matriz[rows][col] == 'FB') {
                        if (rows != 7) {
                            posiciones[rows][col] = 'FN';
                        } else {
                            generarMatriz(posiciones);
                        }
                    } else if (matriz[rows][col] == 'FN') {
                        for (let fila = 0; fila < posiciones.length; fila++) {
                            for (let columna = 0; columna < posiciones.length; columna++) {
                                if (posiciones[fila][columna] == 'FN') {
                                    matriz[fila][columna] = 'FN';
                                }
                            }
                        }
                        break;
                    } else {
                        for (let fila = 0; fila < posiciones.length; fila++) {
                            for (let columna = 0; columna < posiciones.length; columna++) {
                                if (posiciones[fila][columna] == 'FB') {
                                    matriz[fila][columna] = 'x';
                                }
                            }
                        }
                        break;
                    }
                }


            }
        } else if (row == 7) {

        } else {

        }
    } else {

    }
}

// function mensajeGanador(){
//     if(){
//     alert('Gana ficha Blanca');
//     }else if(){
//     alert('Gana ficha Negra');
//     }

    
// }
// function mensajeEmpate(){
//     if(){
//         alert('Empates!!!');
//     }
// }