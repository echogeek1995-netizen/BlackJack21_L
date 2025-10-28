// galeria.js

function mostrarGaleria() {
    mostrarPantalla('galeria');

    const contenedor = document.getElementById('contenedorTrofeos');
    contenedor.innerHTML = '';

    Object.entries(TROFEOS).forEach(([key, trofeos]) => {
        const progreso = trofeosDesbloqueados[key] || 0;

        const seccion = document.createElement('div');
        seccion.classList.add('galeria-seccion');
        seccion.innerHTML = `<h2>${key.toUpperCase()}</h2>`;

        trofeos.slice(0, progreso).forEach((t, idx) => {
            const thumb = document.createElement('img');
            thumb.src = t.fuente;
            thumb.alt = t.descripcion;
            thumb.className = 'galeria-thumb';
            thumb.addEventListener('click', () => mostrarModal(t, key, false, idx === 3));
            seccion.appendChild(thumb);
        });

        if (progresoCita[key] === 'exito' && CITA_TROFEOS_SECRETOS[key]) {
            const cita = CITA_TROFEOS_SECRETOS[key];
            const thumbCita = document.createElement('img');
            thumbCita.src = cita.fuente.replace('.mp4', '_THUMB.png');
            thumbCita.alt = cita.descripcion;
            thumbCita.className = 'galeria-thumb especial';
            thumbCita.addEventListener('click', () => mostrarModal(cita, key, true, false));
            seccion.appendChild(thumbCita);
        }

        contenedor.appendChild(seccion);
    });
}