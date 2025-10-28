// extras.js

// ---------------- MINIJUEGO EMPATE ----------------
function iniciarMinijuegoEmpate() {
    console.log("Iniciando minijuego de empate...");

    const modal = document.getElementById('empateModal');
    const cartaOponenteEl = document.getElementById('cartaOponente');
    const cartaJugadorEl = document.getElementById('cartaJugador');
    const mensajeEl = document.getElementById('mensajeEmpate');
    const controles = document.getElementById('controlesEmpate');

    if (!modal || !cartaOponenteEl || !cartaJugadorEl) return;

    cartaOponenteVal = Math.floor(Math.random() * 13) + 1;
    cartaJugadorVal = 0;

    cartaOponenteEl.textContent = cartaOponenteVal;
    cartaJugadorEl.textContent = '?';
    cartaJugadorEl.classList.add('carta-oculta');
    mensajeEl.textContent = '';
    controles.style.display = 'flex';

    modal.classList.add('abierto');

    const btnAlta = document.getElementById('apuestaAltaBtn');
    const btnBaja = document.getElementById('apuestaBajaBtn');

    btnAlta.onclick = () => resolverMinijuegoEmpate('alta');
    btnBaja.onclick = () => resolverMinijuegoEmpate('baja');
}

function resolverMinijuegoEmpate(eleccion) {
    const cartaJugadorEl = document.getElementById('cartaJugador');
    const mensajeEl = document.getElementById('mensajeEmpate');
    const controles = document.getElementById('controlesEmpate');
    const modal = document.getElementById('empateModal');

    cartaJugadorVal = Math.floor(Math.random() * 13) + 1;
    cartaJugadorEl.textContent = cartaJugadorVal;
    cartaJugadorEl.classList.remove('carta-oculta');
    controles.style.display = 'none';

    let resultado = '';
    let jugadorGana = false;

    if (eleccion === 'alta') {
        jugadorGana = cartaJugadorVal > cartaOponenteVal;
    } else {
        jugadorGana = cartaJugadorVal < cartaOponenteVal;
    }

    resultado = jugadorGana ? '¡Ganaste el desempate!' : 'Perdiste el desempate.';

    mensajeEl.textContent = resultado;

    setTimeout(() => {
        modal.classList.remove('abierto');
        finalizarRonda(jugadorGana);
    }, 1500);
}

// ---------------- HABILIDADES PAGAS ----------------
function usarSegundoIntento() {
    if (!puedeUsarSegundoIntento || fichasJugador < JUEGO_CONFIG.costoSegundoIntento) return;
    fichasJugador -= JUEGO_CONFIG.costoSegundoIntento;
    puedeUsarSegundoIntento = false;

    guardarEstado();
    actualizarUIGlobal();

    manejarTiroJugador(true, false, false);
}

function usarProvocar() {
    if (provocadoEsteTurno || fichasJugador < JUEGO_CONFIG.costoProvocar) return;
    provocadoEsteTurno = true;
    fichasJugador -= JUEGO_CONFIG.costoProvocar;

    guardarEstado();
    actualizarUIGlobal();

    mostrarComentarioEnJuego('provocar_respuesta');
}

function usarSusurrar() {
    if (susurradoEsteTurno || fichasJugador < JUEGO_CONFIG.costoSusurrar) return;
    susurradoEsteTurno = true;
    fichasJugador -= JUEGO_CONFIG.costoSusurrar;

    guardarEstado();
    actualizarUIGlobal();

    mostrarComentarioEnJuego('susurrar_respuesta');
}