// state.js
// Estado global + utilidades de guardado/carga

// Config del juego. (ELIMINADO DE AQUÍ. AHORA SE CARGA DESDE config.js)

// Paths de assets
const ASSET_PATH = './assets/';
const IMG_PATH = ASSET_PATH + 'img/';
const VIDEO_PATH = ASSET_PATH + 'video/';

// VARIABLES GLOBALES DEL ESTADO DE JUEGO
let oponenteActual = '';
let puntuacionJugador = 0;
let puntuacionMaquina = 0;
let victoriasJugador = 0;
let ultimoTiroJugador = 0;
let ultimoTiroMaquina = 0;
let fichasJugador = 0;
let trofeosDesbloqueados = {};
let progresoCita = {};
let videoDialogueInterval = null;
let proximaAccion = null;
let puedeUsarSegundoIntento = false;
let inventarioJugador = {};
let regalosComprados = {};
let mejorasPermanentes = {};
let provocadoEsteTurno = false;
let susurradoEsteTurno = false;

// Estas colecciones deben existir en tu proyecto igual que antes.
// TROFEOS, CITA_TROFEOS_SECRETOS, RESPUESTAS_OPONENTES, etc.
// Asumo que sigues usando tu game-data.js (o equivalente). No lo repito aquí
// porque es MUY largo, pero debe cargarse ANTES que el resto de scripts que lo usan.

// --- Reiniciar estado SIEMPRE desde cero ---
function resetEstado() {
    console.log("[STATE] resetEstado() - Reiniciando partida fresca");

    oponenteActual = '';
    puntuacionJugador = 0;
    puntuacionMaquina = 0;
    victoriasJugador = 0;
    ultimoTiroJugador = 0;
    ultimoTiroMaquina = 0;

    fichasJugador = JUEGO_CONFIG.fichasIniciales;

    trofeosDesbloqueados = {
        maria: 0,
        jessica: 0,
        chel: 0,
        mei: 0,
        seraphina: 0,
        miranda: 0,
        nagatoro: 0
    };

    progresoCita = {
        maria: null,
        jessica: null,
        chel: null,
        mei: null,
        seraphina: null,
        miranda: null,
        nagatoro: null
    };

    inventarioJugador = {};       // sin ítems
    regalosComprados = {};        // sin regalos
    mejorasPermanentes = {};      // sin mejoras
    provocadoEsteTurno = false;
    susurradoEsteTurno = false;
    puedeUsarSegundoIntento = false;
    proximaAccion = null;
    videoDialogueInterval = null;
}

// --- Guardar estado en localStorage (opcional si quieres que tienda funcione en la misma sesión) ---
function guardarEstado() {
    // OJO: si quieres partida efímera sin persistencia entre recargas, puedes dejar esta función vacía.
    // Si quieres que *durante* la sesión sí se reflejen compras (para que tienda/turno dependan de eso),
    // igual podemos guardar en memoria localStorage.
    // Como pediste "cada vez que ingrese al juego se reinicie", igual podemos seguir guardando,
    // porque al volver a entrar al index vamos a resetear igual.

    try {
        localStorage.setItem('fichas', fichasJugador);
        localStorage.setItem('trofeos', JSON.stringify(trofeosDesbloqueados));
        localStorage.setItem('progresoCita', JSON.stringify(progresoCita));
        localStorage.setItem('inventario', JSON.stringify(inventarioJugador));
        localStorage.setItem('regalos', JSON.stringify(regalosComprados));
        localStorage.setItem('mejoras', JSON.stringify(mejorasPermanentes));
        console.log("[STATE] Estado guardado.");
    } catch (err) {
        console.warn("[STATE] No se pudo guardar estado:", err);
    }
}

// --- Cargar estado desde localStorage (ya no se usará en init) ---
function cargarEstado() {
    try {
        fichasJugador = parseInt(localStorage.getItem('fichas')) || JUEGO_CONFIG.fichasIniciales;

        const t = localStorage.getItem('trofeos');
        trofeosDesbloqueados = t ? JSON.parse(t) : {
            maria: 0, jessica: 0, chel: 0, mei: 0, seraphina: 0, miranda: 0, nagatoro: 0
        };

        const citasGuardadas = localStorage.getItem('progresoCita');
        progresoCita = citasGuardadas ? JSON.parse(citasGuardadas) : {};

        const inv = localStorage.getItem('inventario');
        inventarioJugador = inv ? JSON.parse(inv) : {};

        const regalos = localStorage.getItem('regalos');
        regalosComprados = regalos ? JSON.parse(regalos) : {};

        const mej = localStorage.getItem('mejoras');
        mejorasPermanentes = mej ? JSON.parse(mej) : {};

        console.log("[STATE] Estado cargado desde storage.");
    } catch (e) {
        console.error("[STATE] Error cargando localStorage, usando reset:", e);
        resetEstado();
    }
}