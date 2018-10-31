var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var matriz = new Array(8);
const ESPX = 8;
const ESPY = 9;
const DIMENSION = 60;
var turno = false;
var x, y;

var tablero = {
    url: './imagenes/tablero.png',
    imagen: Image,
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
    dibujar();
});

dibujar();

function dibujar() {
    lapiz.drawImage(tablero.imagen, 0, 0);
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
            if (matriz[row][col] == 'FN')
                lapiz.drawImage(FichaNegra.imagen, (DIMENSION * col) + ESPX, (DIMENSION * row) + ESPY);
            if (matriz[row][col] == 'FB')
                lapiz.drawImage(FichaBlanca.imagen, (DIMENSION * col) + ESPX, (DIMENSION * row) + ESPY);
        }
    }
};

function nuevoJuego() { //Función del botón nuevo juego
    document.addEventListener("keydown", movimiento);
    x = 0;
    y = 0;
    turno = true; //True para turno negro
    generarMatriz(matriz); //Genera la matriz con todo vacío
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
    }
};

function turnos() { //Es llamado al presionar enter
    if (turno)
        lapiz.drawImage(FichaNegra.imagen, x + ESPX, y + ESPY);
    else
        lapiz.drawImage(FichaBlanca.imagen, x + ESPX, y + ESPY);
};

function colocarFicha() { //Verifica que se pueda colocar la ficha en la posición indicada
    if (turno) { //turno de fichas negras
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') { //Verifica que esté vacía la celda
            if (movimientoValido('FN', 'FB')) {
                matriz[y / DIMENSION][x / DIMENSION] = 'FN'; //Cambia el valor al de la ficha
                turno = false; //Cambia el turno
                x = 0; //Genera la imagen desde 0
                y = 0; //Genera la imagen desde 0
                dibujar(); //Dibuja el tablero
                dibujarMatriz(); //Dibuja la matriz según los calores
                jugadaPosible();
            } else {
                movIncorrecto();
            }
        } else {
            movIncorrecto();
        }
    } else { //turno de fichas blancas
        if (matriz[y / DIMENSION][x / DIMENSION] == 'x') {
            if (movimientoValido('FB', 'FN')) {
                matriz[y / DIMENSION][x / DIMENSION] = 'FB';
                turno = true;
                x = 0;
                y = 0;
                dibujar();
                dibujarMatriz();
                jugadaPosible();
            } else {
                movIncorrecto();
            }
        } else {
            movIncorrecto();
        }
    }
};

function jugadaPosible() {
    let posibleJugada = 0;
    let fichasBlancas = 0;
    let fichasNegras = 0;
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'x')
                posibleJugada++;
            else
                matriz[row][col] == 'FN' ? fichasNegras++ : fichasBlancas++;
        }
    }
    if (posibleJugada == 0) {
        alert(mensajesJ.terminado);
        if (fichasBlancas != fichasNegras)
            alert((fichasBlancas < fichasNegras ? mensajesJ.negras : mensajesJ.blancas));
        else
            alert(mensajesJ.empate);
        location.reload();
    } else {
        if (fichasBlancas == 0) {
            alert(mensajesJ.negras);
        } else if (fichasNegras == 0) {
            alert(mensajesJ.blancas);
        }
    }
};

function movimientoValido(fPrincipal, fSecundaria) { //fPrincipal: Fichas principales (quienes llaman al método)
    let col = x / DIMENSION;
    let row = y / DIMENSION;
    let comidaPosible = false;
    let posiciones = new Array(8);
    generarMatriz(posiciones);
    if (row > 1) {
        for (let num = 1; num < row; num++) { //Realiza la captura hacia arriba
            if (num == 1 && (matriz[row - 1][col] == fPrincipal || matriz[row - 1][col] == 'x')) {
                break;
            } else {
                if (matriz[row - num][col] == fSecundaria) {
                    if (row - num != 0) {
                        posiciones[row - num][col] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row - num][col] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (row < 6) {
        for (let num = 1; num < matriz.length - row; num++) { //Realiza la captura hacia abajo
            if (num == 1 && (matriz[row + 1][col] == fPrincipal || matriz[row + 1][col] == 'x')) {
                break;
            } else {
                if (matriz[row + num][col] == fSecundaria) {
                    if (row + num != 7) {
                        posiciones[row + num][col] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row + num][col] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col > 1) {
        for (let num = 1; num < col; num++) { //Realiza la captura hacia la izquierda
            if (num == 1 && (matriz[row][col - 1] == fPrincipal || matriz[row][col - 1] == 'x')) {
                break;
            } else {
                if (matriz[row][col - num] == fSecundaria) {
                    if (col - num != 0) {
                        posiciones[row][col - num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row][col - num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col < 6) {
        for (let num = 1; num < matriz.length - col; num++) { //Realiza la captura hacia la derecha
            if (num == 1 && (matriz[row][col + 1] == fPrincipal || matriz[row][col + 1] == 'x')) {
                break;
            } else {
                if (matriz[row][col + num] == fSecundaria) {
                    if (col + num != 7) {
                        posiciones[row][col + num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row][col + num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col > 1 && row > 1) {
        for (let num = 1; num < row && num < col; num++) { //Captura hacia arriba/izquierda
            if (num == 1 && (matriz[row - 1][col - 1] == fPrincipal || matriz[row - 1][col - 1] == 'x')) {
                break;
            } else {
                if (matriz[row - num][col - num] == fSecundaria) {
                    if (col - num != 0 || row - num != 0) {
                        posiciones[row - num][col - num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row - num][col - num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col < 6 && row < 6) {
        for (let num = 1; num < matriz.length - row && num < matriz.length - col; num++) { //Captura hacia abajo/derecha
            if (num == 1 && (matriz[row + 1][col + 1] == fPrincipal || matriz[row + 1][col + 1] == 'x')) {
                break;
            } else {
                if (matriz[row + num][col + num] == fSecundaria) {
                    if (col + num != 7 && row + num != 7) {
                        posiciones[row + num][col + num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row + num][col + num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col < 6 && row > 1) {
        for (let num = 1; num < row && num < matriz.length - col; num++) { //Captura hacia arriba/derecha
            if (num == 1 && (matriz[row - 1][col + 1] == fPrincipal || matriz[row - 1][col + 1] == 'x')) {
                break;
            } else {
                if (matriz[row - num][col + num] == fSecundaria) {
                    if (col + num != 7 && row - num != 0) {
                        posiciones[row - num][col + num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row - num][col + num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    generarMatriz(posiciones);
    if (col > 1 && row < 6) {
        for (let num = 1; num < matriz.length - row && num < col; num++) { //Captura hacia abajo/izquierda
            if (num == 1 && (matriz[row + 1][col - 1] == fPrincipal || matriz[row + 1][col - 1] == 'x')) {
                break;
            } else {
                if (matriz[row + num][col - num] == fSecundaria) {
                    if (col - num != 0 && row + num != 7) {
                        posiciones[row + num][col - num] = fPrincipal;
                    } else {
                        break;
                    }
                } else if (matriz[row + num][col - num] == fPrincipal) {
                    for (let fila = 0; fila < matriz.length; fila++) {
                        for (let columna = 0; columna < matriz.length; columna++) {
                            if (posiciones[fila][columna] == fPrincipal) {
                                matriz[fila][columna] = posiciones[fila][columna];
                            }
                        }
                    }
                    comidaPosible = true;
                    break;
                } else {
                    break;
                }
            }
        }
    }
    return comidaPosible;
};

function movIncorrecto() {
    alert("Movimiento inválido\nVuelve a intentarlo!");
};

function pasar() {
    x = 0;
    y = 0;
    turno ? turno = false : turno = true;
    dibujar();
    dibujarMatriz();
    turnos();
}