// citas.js

function iniciarCita() {
    console.log(`Iniciando cita con ${oponenteActual}`);

    mostrarPantalla('cita');

    const personajeElem = document.getElementById('citaPersonaje');
    const mensajeElem = document.getElementById('citaMensaje');
    const respuestasElem = document.getElementById('citaRespuestas');

    personajeElem.innerHTML = `<img src="${IMG_PATH}OPONENTE_${oponenteActual.toUpperCase()}_CITA.png" alt="${oponenteActual}">`;

    const preguntaData = CITA_PREGUNTAS[oponenteActual][0];
    mensajeElem.textContent = preguntaData.pregunta;
    respuestasElem.innerHTML = '';

    preguntaData.respuestas.forEach((r) => {
        const btn = document.createElement('button');
        btn.textContent = r.texto;
        btn.addEventListener('click', () => responderPreguntaCita(r.correcta));
        respuestasElem.appendChild(btn);
    });
}

function responderPreguntaCita(esCorrecta) {
    const mensajeElem = document.getElementById('citaMensaje');
    const respuestasElem = document.getElementById('citaRespuestas');

    respuestasElem.innerHTML = '';

    if (esCorrecta) {
        progresoCita[oponenteActual] = 'exito';
        guardarEstado();

        mensajeElem.textContent = '¡Respuesta correcta! ❤️';
        setTimeout(() => iniciarSecuenciaEncuentro(oponenteActual), 1500);
    } else {
        progresoCita[oponenteActual] = 'fallo';
        guardarEstado();

        mensajeElem.textContent = 'Mmm... no creo que eso sea lo que quería oír.';
        setTimeout(volverMenu, 2000);
    }
}

function iniciarSecuenciaEncuentro(oponente) {
    console.log(`Iniciando secuencia de encuentro con ${oponente}`);

    mostrarPantalla('juego'); // reaprovechamos pantalla modal
    const premio = CITA_TROFEOS_SECRETOS[oponente];
    if (!premio) return;

    mostrarModal(premio, oponente, true, false);
}