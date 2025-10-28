// tienda.js (versión robusta y en línea con el HTML que me compartiste)

function abrirTienda() {
    console.log("[TIENDA] abrirTienda() llamado");

    const modal = document.getElementById('tiendaModal');
    const itemsContainer = document.getElementById('tiendaItemsContainer');
    const regalosContainer = document.getElementById('tiendaRegalosContainer');

    if (!modal || !itemsContainer || !regalosContainer) {
        console.error("[TIENDA] Elementos del modal de tienda no encontrados.");
        return;
    }

    // Limpiar
    itemsContainer.innerHTML = '';
    regalosContainer.innerHTML = '';

    // ----- ITEMS NORMALES / PERMANENTES -----
    Object.keys(TIENDA_ITEMS).forEach(itemId => {
        const item = TIENDA_ITEMS[itemId];

        const cantidadActual = item.permanente
            ? (mejorasPermanentes[itemId] ? 1 : 0)
            : (inventarioJugador[itemId] || 0);

        const yaCompradoPermanente = item.permanente && cantidadActual > 0;
        const puedeComprar = fichasJugador >= item.costo && !yaCompradoPermanente;

        const div = document.createElement('div');
        div.className = 'tienda-item';

        div.innerHTML = `
            <div class="tienda-item-icono">
                <i class="fa-solid ${item.icono}"></i>
            </div>
            <div class="tienda-item-info">
                <h4>
                    ${item.nombre}
                    ${item.permanente ? '(Permanente)' : `(Tienes: ${cantidadActual})`}
                </h4>
                <p>${item.descripcion}</p>
            </div>
            <div class="tienda-item-comprar">
                ${
                    yaCompradoPermanente
                        ? `<span class="comprado-check"><i class="fa-solid fa-check-circle"></i></span>`
                        : `
                            <button class="comprar-item-btn"
                                data-itemid="${itemId}"
                                ${!puedeComprar ? 'disabled' : ''}>
                                Comprar
                            </button>
                            <span class="item-costo">
                                ${item.costo} <i class="fa-solid fa-coins"></i>
                            </span>
                        `
                }
            </div>
        `;

        itemsContainer.appendChild(div);
    });

    // ----- REGALOS -----
    Object.keys(INTERACCIONES_REGALO).forEach(regaloId => {
        const regalo = INTERACCIONES_REGALO[regaloId];
        const oponenteId = regaloId.split('_')[0];
        const yaComprado = !!regalosComprados[regaloId];
        const puedeComprar = fichasJugador >= regalo.costo && !yaComprado;

        const div = document.createElement('div');
        div.className = 'tienda-item';

        div.innerHTML = `
            <div class="tienda-item-icono">
                <i class="fa-solid fa-gift"></i>
            </div>
            <div class="tienda-item-info">
                <h4>${regalo.nombre} (Para ${oponenteId.charAt(0).toUpperCase() + oponenteId.slice(1)})</h4>
                <p>Desbloquea una escena especial y una imagen en la galería.</p>
            </div>
            <div class="tienda-item-comprar">
                ${
                    yaComprado
                        ? `<span class="comprado-check"><i class="fa-solid fa-check-circle"></i></span>`
                        : `
                            <button class="comprar-regalo-btn"
                                data-regaloid="${regaloId}"
                                ${!puedeComprar ? 'disabled' : ''}>
                                Comprar
                            </button>
                            <span class="item-costo">
                                ${regalo.costo} <i class="fa-solid fa-coins"></i>
                            </span>
                        `
                }
            </div>
        `;

        regalosContainer.appendChild(div);
    });

    // Reasignar listeners de compra (clonábamos antes, ahora delegamos aquí)
    itemsContainer.querySelectorAll('.comprar-item-btn').forEach(btn => {
        btn.addEventListener('click', () => comprarItem(btn.dataset.itemid));
    });

    regalosContainer.querySelectorAll('.comprar-regalo-btn').forEach(btn => {
        btn.addEventListener('click', () => comprarRegalo(btn.dataset.regaloid));
    });

    // Mostrar modal
    modal.classList.add('abierto');
    console.log("[TIENDA] Modal abierto y contenido generado.");
}

function comprarItem(itemId) {
    const item = TIENDA_ITEMS[itemId];
    if (!item) {
        console.error("[TIENDA] Item no encontrado:", itemId);
        return;
    }

    // Chequear costo
    if (fichasJugador < item.costo) {
        alert("No tienes suficientes fichas.");
        return;
    }

    // Ítems permanentes (mejorasPermanentes)
    if (item.permanente) {
        if (mejorasPermanentes[itemId]) {
            console.log("[TIENDA] Mejora permanente ya comprada:", itemId);
            return;
        }
        fichasJugador -= item.costo;
        mejorasPermanentes[itemId] = true;
    } else {
        // Consumibles
        fichasJugador -= item.costo;
        inventarioJugador[itemId] = (inventarioJugador[itemId] || 0) + 1;
    }

    guardarEstado();
    actualizarUIGlobal();
    abrirTienda(); // refrescar tienda para que se vea comprado
}

function comprarRegalo(regaloId) {
    const regalo = INTERACCIONES_REGALO[regaloId];
    if (!regalo) {
        console.error("[TIENDA] Regalo no encontrado:", regaloId);
        return;
    }

    if (regalosComprados[regaloId]) {
        console.log("[TIENDA] Regalo ya comprado:", regaloId);
        return;
    }

    if (fichasJugador < regalo.costo) {
        alert("No tienes suficientes fichas.");
        return;
    }

    fichasJugador -= regalo.costo;
    regalosComprados[regaloId] = true;

    guardarEstado();
    actualizarUIGlobal();

    // Cerrar tienda
    const tiendaModal = document.getElementById('tiendaModal');
    if (tiendaModal) {
        tiendaModal.classList.remove('abierto');
    }

    // Mostrar modal especial del regalo
    const oponenteId = regaloId.split('_')[0];
    const premioRegalo = {
        tipo: 'img',
        fuente: regalo.imagen,
        descripcion: regalo.dialogo
    };

    mostrarModal(premioRegalo, oponenteId, false, false);
}