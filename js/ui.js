// ui.js

// Cambia pantalla visible
function mostrarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));

    const pantallaActiva = document.getElementById(idPantalla);
    if (pantallaActiva) {
        pantallaActiva.classList.add('activa');
        console.log(`Mostrando pantalla: ${idPantalla}`);
    } else {
        console.error(`Error: Pantalla con ID "${idPantalla}" no encontrada.`);
    }

    window.scrollTo(0, 0);
}

// Dado sesgado (esto es lógica pura, pero lo dejamos acá porque UI también lo usa directamente)
function lanzarDado() {
    if (mejorasPermanentes.dadosPrecision) {
        const rand = Math.random();
        if (rand < 0.50) return Math.floor(Math.random() * 3) + 1; // 1-3
        if (rand < 0.833) return Math.floor(Math.random() * 2) + 4; // 4-5
        return 6;
    } else {
        return Math.floor(Math.random() * 6) + 1;
    }
}

// Refresca todo lo que es fijo en HUD/menu
function actualizarUIGlobal() {
    console.log("Actualizando UI Global...");

    const fichasElem = document.getElementById('fichasJugadorGlobal');
    if (fichasElem) fichasElem.textContent = fichasJugador;

    // Costos dinámicos en botones
    const segundoIntentoCostoElems = document.querySelectorAll('.segundo-intento-costo');
    segundoIntentoCostoElems.forEach(el => el.textContent = JUEGO_CONFIG.costoSegundoIntento);

    const provocarCostoElems = document.querySelectorAll('.provocar-costo');
    provocarCostoElems.forEach(el => el.textContent = JUEGO_CONFIG.costoProvocar);

    const susurrarCostoElems = document.querySelectorAll('.susurrar-costo');
    susurrarCostoElems.forEach(el => el.textContent = JUEGO_CONFIG.costoSusurrar);

    actualizarBotonGaleria();
    actualizarBotonesHabilidad();
    actualizarApuestasMenu();

    console.log("UI Global actualizada.");
}

// Habilitar / deshabilitar botones de habilidades según estado actual
function actualizarBotonesHabilidad() {
    // Solo actualizar si la pantalla de juego está activa
    const juegoScreen = document.getElementById('juego');
    if (!juegoScreen || !juegoScreen.classList.contains('activa')) {
        return;
    }

    // Dado Cargado
    const cantidadDados = inventarioJugador['dadoCargado'] || 0;
    const btnDadoCargado = document.getElementById('usarDadoCargadoBtn');
    const spanDadosCargados = document.getElementById('cantidadDadosCargados');
    if (btnDadoCargado) {
        btnDadoCargado.style.display = cantidadDados > 0 ? 'inline-block' : 'none';
        if (cantidadDados > 0 && spanDadosCargados) spanDadosCargados.textContent = `(${cantidadDados})`;
        btnDadoCargado.disabled = false;
    }

    // Amuleto
    const cantidadAmuletos = inventarioJugador['amuletoFortuna'] || 0;
    const btnAmuleto = document.getElementById('usarAmuletoBtn');
    const spanAmuletos = document.getElementById('cantidadAmuletos');
    if (btnAmuleto) {
        btnAmuleto.style.display = (cantidadAmuletos > 0 && puntuacionMaquina > 0) ? 'inline-block' : 'none';
        if (cantidadAmuletos > 0 && spanAmuletos) spanAmuletos.textContent = `(${cantidadAmuletos})`;
        btnAmuleto.disabled = !(cantidadAmuletos > 0 && puntuacionMaquina > 0);
    }

    // Tiro Seguro
    const cantidadTirosSeguros = inventarioJugador['tiroSeguro'] || 0;
    const btnTiroSeguro = document.getElementById('usarTiroSeguroBtn');
    const spanTirosSeguros = document.getElementById('cantidadTirosSeguros');
    if (btnTiroSeguro) {
        btnTiroSeguro.style.display = cantidadTirosSeguros > 0 ? 'inline-block' : 'none';
        if (cantidadTirosSeguros > 0 && spanTirosSeguros) spanTirosSeguros.textContent = `(${cantidadTirosSeguros})`;
        btnTiroSeguro.disabled = false;
    }

    // Segundo Intento
    const btnSegundoIntento = document.getElementById('segundoIntentoBtn');
    if (btnSegundoIntento) {
        btnSegundoIntento.disabled = !puedeUsarSegundoIntento || fichasJugador < JUEGO_CONFIG.costoSegundoIntento;
    }

    // Provocar
    const btnProvocar = document.getElementById('provocarBtn');
    if (btnProvocar) {
        btnProvocar.disabled = provocadoEsteTurno || fichasJugador < JUEGO_CONFIG.costoProvocar;
    }

    // Susurrar
    const btnSusurrar = document.getElementById('susurrarBtn');
    if (btnSusurrar) {
        btnSusurrar.disabled = susurradoEsteTurno || fichasJugador < JUEGO_CONFIG.costoSusurrar;
    }
}

// Corazones de progreso (racha)
function actualizarBarraProgreso() {
    const iconos = document.querySelectorAll('#progresoVictorias i');
    iconos.forEach((icono, index) => {
        icono.className = index < victoriasJugador ? 'fa-solid fa-heart filled' : 'fa-regular fa-heart';
    });
}

// Botón Galería en el menú: activo o bloqueado
function actualizarBotonGaleria() {
    const totalPremios = Object.values(trofeosDesbloqueados)
        .reduce((sum, val) => sum + (Number(val) || 0), 0);

    const totalCitas = Object.values(progresoCita)
        .filter(s => s === 'exito').length;

    const btn = document.getElementById('abrirGaleriaBtn');
    if (!btn) return;

    if (
        totalPremios > 0 ||
        totalCitas > 0 ||
        Object.keys(regalosComprados).length > 0
    ) {
        btn.innerHTML = `Galería`;
        btn.disabled = false;
    } else {
        btn.innerHTML = 'Galería Bloqueada';
        btn.disabled = true;
    }
}

// Cambia el fondo global según progreso con el oponente actual
function actualizarFondoJuego() {
    let premioIndex = -1;

    if (!oponenteActual || !TROFEOS[oponenteActual]) {
        document.body.style.backgroundImage = "none";
        return;
    }

    // lógica de qué trofeo usar para el fondo
    if (victoriasJugador === 3 && progresoCita[oponenteActual] !== 'exito') {
        premioIndex = 2;
    } else if (victoriasJugador === 2) {
        premioIndex = 1;
    } else if (victoriasJugador === 1) {
        premioIndex = 0;
    }

    const premio = (premioIndex !== -1)
        ? TROFEOS[oponenteActual][premioIndex]
        : null;

    document.body.style.backgroundImage = premio
        ? `url(${premio.fuente})`
        : "none";
}

// UI numeritos jugador / máquina
function animarPuntuacion(elementoId, valor) {
    const elemento = document.getElementById(elementoId);
    if (!elemento) return;

    elemento.textContent = valor;
    elemento.classList.toggle('busted', valor > 21);
}

// Mensajes tipo "¡Buen tiro!" con voz del personaje
function mostrarComentarioEnJuego(situacion, textoAdicional = "") {
    if (!oponenteActual) return;

    let comentarios = [];

    if (situacion === 'provocar_respuesta' && INTERACCIONES_JUGADOR['provocar']) {
        comentarios = INTERACCIONES_JUGADOR['provocar'][oponenteActual];
    } else if (situacion === 'susurrar_respuesta' && INTERACCIONES_JUGADOR['susurrar']) {
        comentarios = INTERACCIONES_JUGADOR['susurrar'][oponenteActual];
    } else {
        comentarios = COMENTARIOS_EN_JUEGO[oponenteActual]?.[situacion];
    }

    if (!comentarios || comentarios.length === 0) return;

    const comentario = comentarios[Math.floor(Math.random() * comentarios.length)];

    const mensajeGeneral = document.getElementById('mensajeGeneral');
    if (!mensajeGeneral) return;

    const comentarioSpan = mensajeGeneral.querySelector('.comentario-oponente');
    if (comentarioSpan) comentarioSpan.remove();

    const spanElement = document.createElement('span');
    spanElement.className = 'comentario-oponente';
    spanElement.innerHTML = `<em>"${comentario}"</em> ${textoAdicional}`;

    // si ya hay texto base tipo "¿Tirar o Plantarse?" agregamos salto
    if (
        mensajeGeneral.textContent.includes('¿Tirar o Plantarse?') ||
        mensajeGeneral.textContent.includes('Apuesta en la mesa:') ||
        mensajeGeneral.textContent.includes('¡Tu turno!')
    ) {
        if (!mensajeGeneral.querySelector('br')) {
            mensajeGeneral.appendChild(document.createElement('br'));
        }
    } else {
        mensajeGeneral.innerHTML = mensajeGeneral.innerHTML.split('<br>')[0];
        mensajeGeneral.appendChild(document.createElement('br'));
    }

    mensajeGeneral.appendChild(spanElement);
}

// Actualiza texto de apuesta visible en las cartas del menú
function actualizarApuestasMenu() {
    document.querySelectorAll('.oponente-btn').forEach(btn => {
        const oponente = btn.dataset.oponente;
        const apuestaActual = obtenerApuestaActual(oponente);
        const spanApuesta = btn.querySelector('.apuesta-valor');
        if (spanApuesta) spanApuesta.textContent = apuestaActual;
    });
}

// Controla la animación 3D del dado (visualmente)
function posicionarDado(resultado) {
    const dado = document.getElementById('dado');
    if (!dado) return;

    const rotaciones = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(-90deg) rotateY(0deg)',
        3: 'rotateX(0deg) rotateY(90deg)',
        4: 'rotateX(0deg) rotateY(-90deg)',
        5: 'rotateX(90deg) rotateY(0deg)',
        6: 'rotateY(180deg) rotateX(0deg)'
    };

    dado.style.transform = rotaciones[resultado];
}

function animarDado(resultado, callback) {
    const container = document.getElementById('diceAnimationContainer');
    const dado = document.getElementById('dado');
    if (!container || !dado) {
        if (callback) callback();
        return;
    }

    container.style.display = 'block';
    dado.classList.add('girando');

    setTimeout(() => {
        dado.classList.remove('girando');
        posicionarDado(resultado);
        setTimeout(() => {
            container.style.display = 'none';
            if (callback) callback();
        }, 800);
    }, 800);
}

// Renderiza el modal de trofeo / video y maneja overlay de diálogo dinámico
function mostrarModal(premio, oponenteKey, esSuperTrofeo = false, esTrofeoFinalRondas = false) {
    const modal = document.getElementById('trofeoModal');
    if (!modal) return;

    const mediaContainer = document.getElementById('modalMediaContainer');
    const caption = document.getElementById('modalCaption');
    if (!mediaContainer || !caption) return;

    mediaContainer.innerHTML = '';
    caption.textContent = premio.descripcion;

    if (premio.tipo === 'img') {
        mediaContainer.innerHTML = `
            <img src="${premio.fuente}" alt="${premio.descripcion}"
            style="max-width: 100%; max-height: 70vh; border-radius: 8px; display: block;">
        `;
    } else if (premio.tipo === 'video') {
        mediaContainer.innerHTML = `
            <video src="${premio.fuente}" autoplay loop controls
            style="max-width: 100%; max-height: 70vh; border-radius: 8px; display: block;"></video>
        `;
    }

    modal.classList.add('abierto');

    clearInterval(videoDialogueInterval);

    const dialogueOverlay = document.getElementById('videoDialogueOverlay');
    let dialogosVideo = null;

    // Escena de cita (super trofeo)
    if (esSuperTrofeo) {
        dialogosVideo = CITA_VIDEO_DIALOGO[oponenteKey];
    }
    // Trofeo final por 3 victorias
    else if (esTrofeoFinalRondas) {
        dialogosVideo = RONDA_FINAL_VIDEO_DIALOGO[oponenteKey];
    }

    if (dialogosVideo && dialogosVideo.length > 0 && dialogueOverlay) {
        let frasesUsadas = [];
        dialogueOverlay.style.opacity = '0';

        videoDialogueInterval = setInterval(() => {
            let opciones = dialogosVideo.filter(d => !frasesUsadas.includes(d));

            if (opciones.length === 0) {
                frasesUsadas = [];
                opciones = dialogosVideo;
            }

            const frase = opciones[Math.floor(Math.random() * opciones.length)];
            frasesUsadas.push(frase);

            dialogueOverlay.textContent = frase;
            dialogueOverlay.style.opacity = '1';

            setTimeout(() => {
                dialogueOverlay.style.opacity = '0';
            }, 3500);

        }, 4500);
    } else if (dialogueOverlay) {
        dialogueOverlay.style.opacity = '0';
    }
}