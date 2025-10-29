// init.js (versión "partida siempre nueva")

document.addEventListener('DOMContentLoaded', () => {
    console.log("[INIT] DOM listo");

    // 1. Reiniciar estado SIEMPRE que se cargue el juego
    resetEstado();
    console.log("[INIT] Estado reseteado. Fichas iniciales:", fichasJugador);

    // 2. Asegurar que el HUD del juego arranque oculto
    const hudTop = document.querySelector('.marcador-principal-container');
    const hudBottom = document.querySelector('.controles-inferiores');
    if (hudTop) hudTop.style.display = 'none';
    if (hudBottom) hudBottom.style.display = 'none';

    // 3. Refrescar UI global (fichas, apuestas, etc.)
    if (typeof actualizarUIGlobal === 'function') {
        actualizarUIGlobal();
    } else {
        console.error("No se encontró actualizarUIGlobal()");
    }

    // 4. Asignar listeners con protección

    // Botones de oponentes
    document.querySelectorAll('.oponente-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const oponente = btn.dataset.oponente;
            console.log("[INIT] Elegiste oponente:", oponente);
            if (typeof mostrarJuego === 'function') {
                mostrarJuego(oponente);
            } else {
                console.error("mostrarJuego() no está definida");
            }
        });
    });

    // --- Menú principal ---
    const abrirGaleriaBtn = document.getElementById('abrirGaleriaBtn');
    if (abrirGaleriaBtn) {
        abrirGaleriaBtn.addEventListener('click', () => {
            if (!abrirGaleriaBtn.disabled) {
                if (typeof mostrarGaleria === 'function') {
                    mostrarGaleria();
                } else {
                    console.error("mostrarGaleria() no está definida");
                }
            }
        });
    }

    const abrirTiendaBtn = document.getElementById('abrirTiendaBtn');
    if (abrirTiendaBtn) {
        abrirTiendaBtn.addEventListener('click', () => {
            if (typeof abrirTienda === 'function') {
                abrirTienda();
            } else {
                console.error("abrirTienda() no está definida");
            }
        });
    }

    const resetProgressBtn = document.getElementById('resetProgressBtn');
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', () => {
            if (confirm("¿Seguro que quieres borrar todo tu progreso almacenado?")) {
                localStorage.clear();
                // OJO: Como igual reseteamos al cargar, basta refrescar
                location.reload();
            }
        });
    }

    // --- Navegación y cierres ---
    const cerrarGaleriaBtn = document.getElementById('cerrarGaleriaBtn');
    if (cerrarGaleriaBtn) {
        cerrarGaleriaBtn.addEventListener('click', () => {
            if (typeof volverMenu === 'function') volverMenu();
        });
    }

    const cerrarTiendaBtn = document.getElementById('cerrarTiendaBtn');
    if (cerrarTiendaBtn) {
        cerrarTiendaBtn.addEventListener('click', () => {
            const tiendaModal = document.getElementById('tiendaModal');
            if (tiendaModal) tiendaModal.classList.remove('abierto');
        });
    }

    const citaVolverMenuBtn = document.getElementById('citaVolverMenu');
    if (citaVolverMenuBtn) {
        citaVolverMenuBtn.addEventListener('click', () => {
            if (typeof volverMenu === 'function') volverMenu();
        });
    }

    const volverJuegoBtn = document.getElementById('volverJuego');
    if (volverJuegoBtn) {
        volverJuegoBtn.addEventListener('click', () => {
            if (typeof volverMenu === 'function') volverMenu();
        });
    }

    // --- Toggle de habilidades ---
    const toggleHabilidadesBtn = document.getElementById('toggleHabilidadesBtn');
    const habilidadesContainer = document.getElementById('habilidadesContainer');
    if (toggleHabilidadesBtn && habilidadesContainer) {
        toggleHabilidadesBtn.addEventListener('click', () => {
            habilidadesContainer.classList.toggle('collapsed');
        });
    }

    // --- Habilidades en partida (SECCIÓN CORREGIDA) ---
    const segundoIntentoBtn = document.getElementById('segundoIntentoBtn');
    if (segundoIntentoBtn) {
        segundoIntentoBtn.addEventListener('click', () => {
            if (typeof usarSegundoIntento === 'function') usarSegundoIntento();
        });
    }

    const provocarBtn = document.getElementById('provocarBtn');
    if (provocarBtn) {
        provocarBtn.addEventListener('click', () => {
            // CORREGIDO: La función se llama usarProvocar
            if (typeof usarProvocar === 'function') usarProvocar(); 
        });
    }

    const susurrarBtn = document.getElementById('susurrarBtn');
    if (susurrarBtn) {
        susurrarBtn.addEventListener('click', () => {
            // CORREGIDO: La función se llama usarSusurrar
            if (typeof usarSusurrar === 'function') usarSusurrar();
        });
    }

    const usarAmuletoBtn = document.getElementById('usarAmuletoBtn');
    if (usarAmuletoBtn) {
        usarAmuletoBtn.addEventListener('click', () => {
            // CORREGIDO: La función no existía. Creamos la lógica aquí.
            if ((inventarioJugador['amuletoFortuna'] || 0) > 0) {
                inventarioJugador['amuletoFortuna']--;
                guardarEstado();
                actualizarUIGlobal();
                // Llamamos a turnoMaquina con el flag de repetir
                if(typeof turnoMaquina === 'function') turnoMaquina(true);
            }
        });
    }

    // --- AÑADIDOS (Faltaban los listeners para estos botones) ---
    const usarDadoCargadoBtn = document.getElementById('usarDadoCargadoBtn');
    if (usarDadoCargadoBtn) {
        usarDadoCargadoBtn.addEventListener('click', () => {
            // Llama a manejarTiroJugador con el flag de dado cargado
            if(typeof manejarTiroJugador === 'function') manejarTiroJugador(false, true, false);
        });
    }

    const usarTiroSeguroBtn = document.getElementById('usarTiroSeguroBtn');
    if (usarTiroSeguroBtn) {
        usarTiroSeguroBtn.addEventListener('click', () => {
            // Llama a manejarTiroJugador con el flag de tiro seguro
            if(typeof manejarTiroJugador === 'function') manejarTiroJugador(false, false, true);
        });
    }
    // --- FIN DE SECCIÓN CORREGIDA ---


    // --- Minijuego de empate ---
    const apuestaAltaBtn = document.getElementById('apuestaAltaBtn');
    if (apuestaAltaBtn) {
        apuestaAltaBtn.addEventListener('click', () => {
            if (typeof resolverMinijuegoEmpate === 'function') resolverMinijuegoEmpate('alta');
        });
    }

    const apuestaBajaBtn = document.getElementById('apuestaBajaBtn');
    if (apuestaBajaBtn) {
        apuestaBajaBtn.addEventListener('click', () => {
            if (typeof resolverMinijuegoEmpate === 'function') resolverMinijuegoEmpate('baja');
        });
    }

    // --- Cierre modal genérico (trofeos, tienda, etc.) ---
    document.querySelectorAll('.cerrar-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-fondo');
            if (!modal) return;

            if (modal.id === 'trofeoModal') {
                // limpiar overlay
                clearInterval(videoDialogueInterval);
                const overlay = document.getElementById('videoDialogueOverlay');
                if (overlay) overlay.style.opacity = '0';

                // pausar video interno si lo hay
                const v = modal.querySelector('video');
                if (v) v.pause();
            }

            modal.classList.remove('abierto');
        });
    });

    // 5. MOSTRAR PANTALLA INICIAL DEL MENÚ
    if (typeof mostrarPantalla === 'function') {
        mostrarPantalla('menuInicio');
    } else {
        console.error("mostrarPantalla() no está definida");
    }

    console.log("[INIT] Inicialización completa ✅ (estado fresco)");
});