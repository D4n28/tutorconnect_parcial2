/**
 * TutorConnect - Componentes de Navegación y UI Compartida
 * Integrantes: Daniel Barrios, Eduardo Escudero
 */

document.addEventListener("DOMContentLoaded", () => {
  renderizarBarraNavegacion();
  renderizarNavegacionMovil();
  renderizarPiePagina();
});

function renderizarBarraNavegacion() {
  const usuario = BaseDatosTutor.obtenerUsuarioActual();
  const notificaciones = BaseDatosTutor.obtenerNotificaciones();
  const tieneNoLeidas = notificaciones.some(n => !n.leida);
  const rutaActual = window.location.pathname.split("/").pop() || "index.html";

  // Si estamos en la página de login/registro (index.html), no renderizamos el navbar autenticado
  if (rutaActual === "index.html" || rutaActual === "") return;

  const contenedorNav = document.getElementById("navbar-container") || document.getElementById("contenedor-navegacion");
  if (!contenedorNav) return;

  const esTutor = usuario.rol === "tutor";

  contenedorNav.innerHTML = `
    <header class="barra-navegacion">
      <a href="${esTutor ? 'dashboard-tutor.html' : 'dashboard-estudiante.html'}" class="marca-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span>TutorConnect</span>
      </a>

      <div class="buscador-navegacion">
        <svg class="icono-busqueda" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" placeholder="Buscar materias, tutores o temas..." id="buscadorGlobal">
      </div>

      <nav class="acciones-navegacion">
        <div class="enlaces-escritorio" style="display: flex; gap: 0.5rem;">
          ${!esTutor ? `
            <a href="dashboard-estudiante.html" class="enlace-nav ${rutaActual === 'dashboard-estudiante.html' ? 'activo' : ''}">Buscar tutores</a>
            <a href="mis-reservas.html" class="enlace-nav ${rutaActual === 'mis-reservas.html' ? 'activo' : ''}">Mis reservas</a>
          ` : `
            <a href="dashboard-tutor.html" class="enlace-nav ${rutaActual === 'dashboard-tutor.html' ? 'activo' : ''}">Mi Panel</a>
          `}
        </div>

        <a href="notificaciones.html" class="boton-icono-nav" title="Notificaciones">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          ${tieneNoLeidas ? '<span class="punto-alerta"></span>' : ''}
        </a>

        <a href="perfil.html" class="usuario-nav">
          <img src="${usuario.foto}" alt="${usuario.nombre}" class="avatar-usuario">
          <div class="texto-usuario">
            <span class="nombre-usuario">${usuario.nombre}</span>
            <span class="etiqueta-rol">${usuario.rol}</span>
          </div>
        </a>

        <button onclick="cerrarSesion()" class="boton boton-borde boton-sm" title="Cerrar sesión" style="padding: 0.4rem 0.6rem;">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </nav>
    </header>
  `;
}

function renderizarNavegacionMovil() {
  const rutaActual = window.location.pathname.split("/").pop() || "index.html";
  if (rutaActual === "index.html" || rutaActual === "") return;

  const usuario = BaseDatosTutor.obtenerUsuarioActual();
  const esTutor = usuario.rol === "tutor";
  const contenedorMovil = document.getElementById("mobile-bottom-nav") || document.getElementById("navegacion-inferior-movil");
  if (!contenedorMovil) return;

  contenedorMovil.className = "navegacion-inferior-movil";
  
  if (!esTutor) {
    contenedorMovil.innerHTML = `
      <a href="dashboard-estudiante.html" class="item-nav-movil ${rutaActual === 'dashboard-estudiante.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <span>Inicio</span>
      </a>
      <a href="mis-reservas.html" class="item-nav-movil ${rutaActual === 'mis-reservas.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
        <span>Reservas</span>
      </a>
      <a href="notificaciones.html" class="item-nav-movil ${rutaActual === 'notificaciones.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span>Avisos</span>
      </a>
      <a href="perfil.html" class="item-nav-movil ${rutaActual === 'perfil.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Perfil</span>
      </a>
    `;
  } else {
    contenedorMovil.innerHTML = `
      <a href="dashboard-tutor.html" class="item-nav-movil ${rutaActual === 'dashboard-tutor.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Panel</span>
      </a>
      <a href="notificaciones.html" class="item-nav-movil ${rutaActual === 'notificaciones.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span>Avisos</span>
      </a>
      <a href="perfil.html" class="item-nav-movil ${rutaActual === 'perfil.html' ? 'activo' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
        <span>Perfil</span>
      </a>
    `;
  }
}

function renderizarPiePagina() {
  const pie = document.getElementById("app-footer") || document.getElementById("pie-pagina");
  if (!pie) return;
  pie.innerHTML = `
    <footer class="pie-pagina-principal">
      <div style="max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <div>
          <strong>TutorConnect &copy; 2026</strong> - Plataforma de Tutorías Online y Presenciales.
        </div>
        <div>
          Desarrollo Web (Parcial 2) &bull; Integrantes: <strong>Daniel Barrios</strong> & <strong>Eduardo Escudero</strong>
        </div>
      </div>
    </footer>
  `;
}

function cerrarSesion() {
  window.location.href = "index.html";
}

function mostrarMensajeToast(mensaje, duracion = 3000) {
  let contenedor = document.getElementById("contenedor-toast") || document.getElementById("toast-container");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "contenedor-toast";
    contenedor.className = "contenedor-toast";
    document.body.appendChild(contenedor);
  }

  const aviso = document.createElement("div");
  aviso.className = "aviso-toast";
  aviso.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${mensaje}</span>
  `;
  contenedor.appendChild(aviso);

  setTimeout(() => {
    aviso.style.opacity = "0";
    aviso.style.transform = "translateX(100%)";
    aviso.style.transition = "all 0.3s ease";
    setTimeout(() => aviso.remove(), 300);
  }, duracion);
}

// Aliases para compatibilidad
function showToast(m, d) { mostrarMensajeToast(m, d); }
function renderNavbar() { renderizarBarraNavegacion(); }
function renderMobileNav() { renderizarNavegacionMovil(); }
function renderFooter() { renderizarPiePagina(); }
