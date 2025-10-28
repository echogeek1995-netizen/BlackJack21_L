// config.js
// Rutas base de assets
const ASSET_PATH = './assets/';
const IMG_PATH = ASSET_PATH + 'img/';
const VIDEO_PATH = ASSET_PATH + 'video/';

// Configuración base del juego
const JUEGO_CONFIG = {
    fichasIniciales: 1000,
    costoSegundoIntento: 150,
    costoProvocar: 25,
    costoSusurrar: 50,

    apuestasBase: {
        maria: 50,
        jessica: 100,
        mei: 150,
        chel: 200,
        seraphina: 175,
        miranda: 225,
        nagatoro: 125
    },

    aumentoApuesta: 50,

    // Multiplicador de bonus por racha perfecta (3 victorias -> bonus)
    bonusRachaMultiplier: {
        maria: 5,
        jessica: 7,
        mei: 8,
        chel: 10,
        seraphina: 9,
        miranda: 11,
        nagatoro: 6
    }
};