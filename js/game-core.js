// game-core.js

// ----------------- LÓGICA DE APUESTAS -----------------
function obtenerApuestaActual(oponente) {
    let apuestaBase = JUEGO_CONFIG.apuestasBase[oponente] || 50;
    if (mejorasPermanentes.licenciaApostador) {
        apuestaBase += JUEGO_CONFIG.aumentoApuesta;
    }
    return apuestaBase;
}

// ----------------- INICIAR RONDA -----------------
function iniciarRonda(oponente) {
    console.log(`Iniciando ronda contra: ${oponente}`);

    const apuestaActual = obtenerApuestaActual(oponente);

    // Validación de fichas
    if (fichasJugador < apuestaActual) {
        alert("No tienes suficientes fichas para enfrentar a este oponente.");
        volverMenu();
        return;
    }

    // Set estado inicial ronda
    oponenteActual = oponente;
    puntuacionJugador = 0;
    puntuacionMaquina = 0;
    ultimoTiroJugador = 0;
    ultimoTiroMaquina = 0;
    provocadoEsteTurno = false;
    susurradoEsteTurno = false;
    puedeUsarSegundoIntento = false;

    victoriasJugador = trofeosDesbloqueados[oponenteActual] || 0;

    actualizarBarraProgreso();
    actualizarFondoJuego();

    // Mostrar avatar
    const avatarImg = document.getElementById('avatarOponenteJuego');
    const oponenteImgKeyMap = {
        maria: 'MARIA',
        jessica: 'JESSICA',
        chel: 'CHEL',
        mei: 'MEI',
        marge: 'MARGE',
        miranda: 'MIRANDA',
        nagatoro: 'NAGATORO'
    };
    const oponenteImgKey = oponenteImgKeyMap[oponente] || 'DEFAULT';

    if (avatarImg) {
        avatarImg.src = `${IMG_PATH}OPONENTE_${oponenteImgKey}.png`;
        avatarImg.style.opacity = '1';
        avatarImg.style.display = 'block'; // por si estaba oculto
    }

    // Mensaje inicial
    const mensajeGeneral = document.getElementById('mensajeGeneral');
    if (mensajeGeneral) {
        mensajeGeneral.textContent = `Apuesta en la mesa: ${apuestaActual} fichas. ¡Tu turno!`;
        const comentarioSpan = mensajeGeneral.querySelector('.comentario-oponente');
        if (comentarioSpan) comentarioSpan.remove();
    }

    // Reset Marcadores
    animarPuntuacion('resultadoJugador', 0);
    animarPuntuacion('resultadoMaquina', 0);

    // Mostrar / ocultar botones
    const actionButtons = document.getElementById('actionButtons');
    const finalButtons = document.getElementById('finalButtons');
    const lanzarBtn = document.getElementById('lanzarJugador');
    const pararBtn = document.getElementById('pararJugador');

    if (actionButtons) actionButtons.style.display = 'flex';
    if (finalButtons) finalButtons.style.display = 'none';

    // Clonar listeners para limpiar handlers viejos
    if (lanzarBtn) {
        lanzarBtn.style.display = 'inline-block';
        lanzarBtn.disabled = false;

        const newLanzarBtn = lanzarBtn.cloneNode(true);
        lanzarBtn.parentNode.replaceChild(newLanzarBtn, lanzarBtn);

        newLanzarBtn.addEventListener('click', () => manejarTiroJugador(false, false, false));
    }

    if (pararBtn) {
        pararBtn.style.display = 'none';
        pararBtn.disabled = false;

        const newPararBtn = pararBtn.cloneNode(true);
        pararBtn.parentNode.replaceChild(newPararBtn, pararBtn);

        newPararBtn.addEventListener('click', () => {
            mostrarComentarioEnJuego('plantarse');
            turnoMaquina();
        });
    }

    // Segundo intento bloqueado al inicio
    const btnSegundoIntento = document.getElementById('segundoIntentoBtn');
    if (btnSegundoIntento) btnSegundoIntento.disabled = true;

    // Importante: asegurar que HUD está visible (esto tapa el bug de HUD apareciendo en menú)
    const hudTop = document.querySelector('.marcador-principal-container');
    const hudBottom = document.querySelector('.controles-inferiores');
    if (hudTop) hudTop.style.display = 'block';
    if (hudBottom) hudBottom.style.display = 'flex';

    actualizarBotonesHabilidad();
}

// ----------------- JUGADOR TIRA DADO -----------------
function manejarTiroJugador(esSegundoIntento, esDadoCargado, esTiroSeguro) {
    const lanzarBtn = document.getElementById('lanzarJugador');
    const pararBtn = document.getElementById('pararJugador');

    if (lanzarBtn) lanzarBtn.disabled = true;
    if (pararBtn) pararBtn.disabled = true;
    document.querySelectorAll('.habilidad-btn').forEach(btn => btn.disabled = true);

    let resultado = lanzarDado();
    const mensajeGeneral = document.getElementById('mensajeGeneral');
    let itemUsadoMsg = "";

    // Tiro Seguro
    if (esTiroSeguro) {
        if ((inventarioJugador['tiroSeguro'] || 0) > 0) {
            inventarioJugador['tiroSeguro']--;

            // Ajusta tiro si rompe el 21
            if (puntuacionJugador + resultado > 21) {
                resultado = Math.max(1, 21 - puntuacionJugador);
            }

            itemUsadoMsg = "🛡️ ¡Usaste Tiro Seguro!";
            guardarEstado();
            actualizarUIGlobal();
        } else {
            esTiroSeguro = false;
            console.warn("Intento de usar Tiro Seguro sin tenerlo.");
        }
    }

    // Dado Cargado
    else if (esDadoCargado) {
        if ((inventarioJugador['dadoCargado'] || 0) > 0) {
            inventarioJugador['dadoCargado']--;
            resultado = Math.floor(Math.random() * 3) + 4; // 4-6
            itemUsadoMsg = "🎲 ¡Usaste Dado Cargado!";
            guardarEstado();
            actualizarUIGlobal();
        } else {
            esDadoCargado = false;
            console.warn("Intento de usar Dado Cargado sin tenerlo.");
        }
    }

    // Mostrar mensajito de item si aplica
    if (itemUsadoMsg && mensajeGeneral) {
        mensajeGeneral.textContent = itemUsadoMsg;
    }

    // Animación dado -> aplicar resultado
    animarDado(resultado, () => {
        if (esSegundoIntento) {
            puntuacionJugador -= ultimoTiroJugador;
        }

        ultimoTiroJugador = resultado;
        puntuacionJugador += resultado;
        animarPuntuacion('resultadoJugador', puntuacionJugador);

        const comentarioSpan = mensajeGeneral ? mensajeGeneral.querySelector('.comentario-oponente') : null;
        let textoBase = `Tú: ${puntuacionJugador}. ¿Tirar o Plantarse?`;

        // Caso: bust
        if (puntuacionJugador > 21) {
            // Corazón Valiente te salva
            if ((inventarioJugador['corazonValiente'] || 0) > 0) {
                inventarioJugador['corazonValiente']--;
                guardarEstado();
                actualizarUIGlobal();

                puntuacionJugador = 0;
                animarPuntuacion('resultadoJugador', puntuacionJugador);

                textoBase = `💔 ¡Corazón Valiente te salvó! Puntuación reiniciada. ¡Tu turno!`;
                if (mensajeGeneral) mensajeGeneral.textContent = textoBase;

                if (lanzarBtn) lanzarBtn.disabled = false;
                if (pararBtn) {
                    pararBtn.style.display = 'inline-block';
                    pararBtn.disabled = false;
                }

                actualizarBotonesHabilidad();
                puedeUsarSegundoIntento = false;
                const btnSegundoIntento = document.getElementById('segundoIntentoBtn');
                if (btnSegundoIntento) btnSegundoIntento.disabled = true;
                return;
            } else {
                // bust definitivo
                textoBase = `❌ ¡Te pasaste! Total: ${puntuacionJugador}.`;
                if (mensajeGeneral) mensajeGeneral.textContent = textoBase;
                mostrarComentarioEnJuego('jugador_bust');
                setTimeout(turnoMaquina, 1500);
            }
        }

        // Caso: 21 exacto -> planta auto
        else if (puntuacionJugador === 21) {
            textoBase = `✅ ¡21! Te plantas automáticamente.`;
            if (mensajeGeneral) mensajeGeneral.textContent = textoBase;
            mostrarComentarioEnJuego('puntuacion_cercana');
            setTimeout(turnoMaquina, 1500);
        }

        // Caso normal
        else {
            if (mensajeGeneral) mensajeGeneral.textContent = textoBase;

            if (comentarioSpan && mensajeGeneral) {
                mensajeGeneral.appendChild(comentarioSpan);
            }

            if (lanzarBtn) lanzarBtn.disabled = false;
            if (pararBtn) {
                pararBtn.style.display = 'inline-block';
                pararBtn.disabled = false;
            }

            // segundo intento disponible si ya tiraste al menos una vez
            if (puntuacionJugador > 0 &&
                !puedeUsarSegundoIntento &&
                fichasJugador >= JUEGO_CONFIG.costoSegundoIntento) {
                puedeUsarSegundoIntento = true;
            } else if (esSegundoIntento) {
                puedeUsarSegundoIntento = false;
            }

            actualizarBotonesHabilidad();

            if (puntuacionJugador >= 18) {
                mostrarComentarioEnJuego('puntuacion_alta');
            }
        }
    });
}

// ----------------- TURNO IA -----------------
function turnoMaquina(repetirUltimoTiro = false) {
    document.querySelectorAll('#controlesJuego button').forEach(btn => btn.disabled = true);

    const mensajeGeneral = document.getElementById('mensajeGeneral');

    // Si tú ya estás fuera, IA gana
    if (puntuacionJugador > 21) {
        finalizarRonda(false);
        return;
    }

    // Umbral de riesgo según rival
    let umbralParada = 17;
    if (oponenteActual === 'maria') umbralParada = 16;
    else if (oponenteActual === 'jessica' || oponenteActual === 'mei') umbralParada = 18;
    else if (oponenteActual === 'chel' || oponenteActual === 'marge' || oponenteActual === 'miranda') umbralParada = 19;
    else if (oponenteActual === 'nagatoro') umbralParada = 17;

    let puntuacionPrevia = puntuacionMaquina;

    // Lógica repetición con amuleto
    if (repetirUltimoTiro && ultimoTiroMaquina > 0) {
        puntuacionMaquina = Math.max(0, puntuacionPrevia - ultimoTiroMaquina);
        console.log(`Amuleto: Puntuación IA reseteada a ${puntuacionMaquina} antes de repetir tiro.`);
    } else if (!repetirUltimoTiro) {
        puntuacionMaquina = 0;
        ultimoTiroMaquina = 0;
        console.log("Turno IA: Puntuación reiniciada a 0.");
    } else {
        console.log("Amuleto: No había tiro anterior válido.");
        repetirUltimoTiro = false;
    }

    setTimeout(() => {
        let continuarTirando = true;
        let tirosEnTurno = 0;
        let fueRepeticion = repetirUltimoTiro;

        while (continuarTirando && tirosEnTurno < 10) {
            tirosEnTurno++;

            const tiroActual = lanzarDado();
            console.log(`IA tira: ${tiroActual}`);

            puntuacionMaquina += tiroActual;
            ultimoTiroMaquina = tiroActual;
            console.log(`IA Puntuación: ${puntuacionMaquina}`);

            if (puntuacionMaquina > 21) {
                continuarTirando = false;
            } else if (puntuacionMaquina >= umbralParada) {
                if (puntuacionMaquina >= puntuacionJugador) {
                    continuarTirando = false;
                }
            }

            if (fueRepeticion && tirosEnTurno === 1) {
                fueRepeticion = false;
            }
        }

        animarPuntuacion('resultadoMaquina', puntuacionMaquina);

        if (mensajeGeneral)
            mensajeGeneral.textContent = `El oponente termina con ${puntuacionMaquina}.`;

        if (puntuacionMaquina > 21) mostrarComentarioEnJuego('oponente_bust');
        else if (puntuacionMaquina === 21) mostrarComentarioEnJuego('oponente_21');

        actualizarBotonesHabilidad();

        if (puntuacionJugador === puntuacionMaquina && puntuacionJugador <= 21) {
            setTimeout(iniciarMinijuegoEmpate, 1500);
        } else {
            const jugadorGana =
                (puntuacionMaquina > 21 && puntuacionJugador <= 21) ||
                (puntuacionJugador <= 21 && puntuacionJugador > puntuacionMaquina);

            setTimeout(() => finalizarRonda(jugadorGana), 1500);
        }
    }, 1000);
}

// ----------------- FINAL DE RONDA -----------------
function finalizarRonda(jugadorGana) {
    console.log("Finalizando ronda. Jugador gana:", jugadorGana);

    const apuestaActual = obtenerApuestaActual(oponenteActual);
    let bonusRacha = 0;
    let mensajeResultado = '';

    if (jugadorGana) {
        fichasJugador += apuestaActual;

        // ¡CELEBRAR VICTORIA CON EFECTOS!
        if (window.celebrarVictoria && typeof window.celebrarVictoria === 'function') {
            window.celebrarVictoria();
        }

        // aumenta racha
        victoriasJugador = Math.min(victoriasJugador + 1, 3);

        // guarda racha si es mayor
        if (victoriasJugador > (trofeosDesbloqueados[oponenteActual] || 0)) {
            trofeosDesbloqueados[oponenteActual] = victoriasJugador;
        }

        // bonus si llegó a 3
        if (victoriasJugador === 3) {
            const multiplier = JUEGO_CONFIG.bonusRachaMultiplier[oponenteActual] || 5;
            bonusRacha = apuestaActual * multiplier;
            fichasJugador += bonusRacha;
            console.log(`¡Bonus por racha perfecta! +${bonusRacha} fichas.`);
        }

        mensajeResultado = `¡Ganaste ${apuestaActual} fichas!`;

        if (bonusRacha > 0) {
            mensajeResultado += ` ¡Bonus x${
                JUEGO_CONFIG.bonusRachaMultiplier[oponenteActual] || '?'
            }: +${bonusRacha} fichas!`;
        }

    } else {
        fichasJugador -= apuestaActual;
        fichasJugador = Math.max(0, fichasJugador); // no negativo

        mensajeResultado = `Perdiste ${apuestaActual} fichas.`;

        // bajar racha en 1 si pierdes
        victoriasJugador = Math.max(0, victoriasJugador - 1);
        trofeosDesbloqueados[oponenteActual] = victoriasJugador;
    }

    actualizarUIGlobal();
    guardarEstado();
    actualizarFondoJuego();
    actualizarBarraProgreso();

    const dialogoKey = jugadorGana ? Math.min(victoriasJugador, 3) : 1;
    const dialogoTipo = jugadorGana ? 'victoria' : 'derrota';
    const opcionesDialogo = RESPUESTAS_OPONENTES[oponenteActual]?.[dialogoTipo]?.[dialogoKey];

    const mensajeGeneral = document.getElementById('mensajeGeneral');
    if (opcionesDialogo && mensajeGeneral) {
        mensajeGeneral.innerHTML = `${mensajeResultado}<br>${
            opcionesDialogo[Math.floor(Math.random() * opcionesDialogo.length)]
        }`;
    } else if (mensajeGeneral) {
        mensajeGeneral.innerHTML = mensajeResultado;
    }

    // Mostrar botones post-ronda
    const actionButtons = document.getElementById('actionButtons');
    const finalButtons = document.getElementById('finalButtons');
    const jugarOtraVezBtn = document.getElementById('jugarOtraVezBtn');
    const reiniciarBtn = document.getElementById('reiniciar');

    if (actionButtons) actionButtons.style.display = 'none';
    if (finalButtons) finalButtons.style.display = 'flex';

    // Clonar para limpiar listeners duplicados
    const newJugarOtraVezBtn = jugarOtraVezBtn ? jugarOtraVezBtn.cloneNode(true) : null;
    const newReiniciarBtn = reiniciarBtn ? reiniciarBtn.cloneNode(true) : null;

    if (newJugarOtraVezBtn && jugarOtraVezBtn?.parentNode) {
        jugarOtraVezBtn.parentNode.replaceChild(newJugarOtraVezBtn, jugarOtraVezBtn);
        newJugarOtraVezBtn.disabled = false;

        // Si ganaste la 3ra y aún NO tienes la cita ganada => botón se convierte en "Ir a la Cita"
        if (jugadorGana && victoriasJugador === 3 && progresoCita[oponenteActual] !== 'exito') {
            newJugarOtraVezBtn.textContent = 'Ir a la Cita';
            newJugarOtraVezBtn.addEventListener('click', () => {
                console.log(">>> Listener 'Ir a la Cita' EJECUTADO");
                iniciarCita();
            });

            if (newReiniciarBtn) newReiniciarBtn.style.display = 'none';
        } else {
            // Normal: siguiente ronda
            newJugarOtraVezBtn.textContent = 'Siguiente Ronda';
            newJugarOtraVezBtn.addEventListener('click', () => {
                console.log(">>> Listener 'Siguiente Ronda' EJECUTADO");
                if (oponenteActual) {
                    iniciarRonda(oponenteActual);
                } else {
                    console.error("Error: oponenteActual no definido al intentar iniciar siguiente ronda.");
                    volverMenu();
                }
            });

            if (newReiniciarBtn) newReiniciarBtn.style.display = 'inline-block';
        }
    } else {
        console.error("Error: No se pudo reemplazar #jugarOtraVezBtn en finalizarRonda");
        if (finalButtons) finalButtons.style.display = 'none';
    }

    // Botón volver al menú
    if (newReiniciarBtn && reiniciarBtn?.parentNode) {
        reiniciarBtn.parentNode.replaceChild(newReiniciarBtn, reiniciarBtn);
        newReiniciarBtn.disabled = false;

        newReiniciarBtn.addEventListener('click', () => {
            console.log(">>> Listener 'volverMenu' (Reiniciar) EJECUTADO post-ronda");
            volverMenu();
        });

        if (jugadorGana && victoriasJugador === 3 && progresoCita[oponenteActual] !== 'exito') {
            newReiniciarBtn.style.display = 'none';
        } else {
            newReiniciarBtn.style.display = 'inline-block';
        }
    } else {
        console.warn("Advertencia: No se pudo reemplazar #reiniciar en finalizarRonda");
    }
}

// ----------------- VOLVER AL MENÚ -----------------
function volverMenu() {
    console.log("Llamada a volverMenu");

    oponenteActual = '';

    document.body.style.backgroundImage = 'none';

    const avatar = document.getElementById('avatarOponenteJuego');
    if (avatar) {
        avatar.style.opacity = '0';
        avatar.style.display = 'none';
    }

    // Ocultamos HUD para que no aparezca encima del menú
    const hudTop = document.querySelector('.marcador-principal-container');
    const hudBottom = document.querySelector('.controles-inferiores');
    if (hudTop) hudTop.style.display = 'none';
    if (hudBottom) hudBottom.style.display = 'none';

    mostrarPantalla('menuInicio');

    // pequeño delay para asegurar DOM actualizado antes de refrescar fichas, etc.
    setTimeout(actualizarUIGlobal, 50);
}

// ----------------- MOSTRAR JUEGO (cambia la pantalla y llama iniciarRonda) -----------------
function mostrarJuego(oponente) {
    console.log(`Llamada a mostrarJuego con: ${oponente}`);

    mostrarPantalla('juego');

    // mostrar HUD porque estamos entrando al juego
    const hudTop = document.querySelector('.marcador-principal-container');
    const hudBottom = document.querySelector('.controles-inferiores');
    if (hudTop) hudTop.style.display = 'block';
    if (hudBottom) hudBottom.style.display = 'flex';
    
    // Asegurar que el panel de habilidades esté colapsado al entrar
    const habilidadesContainer = document.getElementById('habilidadesContainer');
    if (habilidadesContainer) {
        habilidadesContainer.classList.add('collapsed');
    }

    if (typeof iniciarRonda === 'function') {
        iniciarRonda(oponente);
    } else {
        console.error("Error: La función iniciarRonda no está definida al llamar a mostrarJuego.");
    }
}