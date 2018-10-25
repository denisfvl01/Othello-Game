document.addEventListener("keydown", movimiento);
var canvas = document.getElementById('tablero');
var lapiz = canvas.getContext('2d');
var matriz = new Array(8);
const ESPACIOX = 8;
const ESPACIOY = 9;
<<<<<<< HEAD
var turnoNegro = false;
=======
const DIFERENCIA = 60;
var turno = false; 
var x = 0;
var y = 0;
>>>>>>> 862ec0c8cc71817788672fa5dbe0ab57de6b298d

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
// generarFichasNegras();
// generarFichasBlancas();
dibujar();

function dibujar() {
    if (tablero.cargaOk) {
        lapiz.drawImage(tablero.imagen, 0, 0);
    }
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
    matriz[180 / DIFERENCIA][180 / DIFERENCIA] = 'FN';
    matriz[240 / DIFERENCIA][240 / DIFERENCIA] = 'FN';
};

function generarFichasBlancas() {
    matriz[180 / DIFERENCIA][240 / DIFERENCIA] = 'FB';
    matriz[240 / DIFERENCIA][180 / DIFERENCIA] = 'FB';
};

function dibujarMatriz() {
    for (let row = 0; row < matriz.length; row++) {
        for (let col = 0; col < matriz.length; col++) {
            if (matriz[row][col] == 'FN') {
                lapiz.drawImage(FichaNegra.imagen, (DIFERENCIA * col) + ESPACIOX, (DIFERENCIA * row) + ESPACIOY);
            }
            if (matriz[row][col] == 'FB') {
                lapiz.drawImage(FichaBlanca.imagen, (DIFERENCIA * col) + ESPACIOX, (DIFERENCIA * row) + ESPACIOY);
            }
        }
    }
}

function nuevoJuego() {

    turno = true;

    generarMatriz();
    generarFichasNegras();
    generarFichasBlancas();
    dibujar();
    dibujarMatriz();
    turnos();
}

function movimiento(evento) {
    switch (evento.keyCode) {
        case tecla.LEFT:
            alert("Izquierda");

            break;
        case tecla.UP:
            alert('arriba');
            break;
        case tecla.RIGHT:
            alert('derecha');
            break;
        case tecla.DOWN:
            alert('Abajo');
            break;
        case tecla.ENTER:
            iniciarFichaNegra();
            console.log(matriz);
            break;
    }
}

function turnos() {
<<<<<<< HEAD
    if (turnoNegro) {
        alert('Mueve ficha negra');
        //turnoNegro();
    } else {
        alert('Mueve ficha blanca');
        //turnoBlanco();
    }
}
=======
 if (turno){
     turnoNegro();

 }else{
     turnoBlanco();
 }
}
function turnoNegro() {
         alert('Mueve ficha negra');
         lapiz.drawImage(FichaNegra.imagen,0+ESPACIOX,0+ESPACIOY);

}
function turnoBlanco() {
         alert('Mueve ficha blanca');
         lapiz.drawImage(FichaBlanca.imagen,0+ESPACIOX,0+ESPACIOY);
}

function iniciarFichaNegra(){
        var row=0;
        var col=0;
        if(matriz[row][col]=='x'){
            matriz[row][col] = 'FN';
        }
}
>>>>>>> 862ec0c8cc71817788672fa5dbe0ab57de6b298d
