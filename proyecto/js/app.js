/**
 * app.js
 * Lógica general del aplicativo "INFORME — Plataforma Web de Noticias".
 * Contiene: utilidades, renderizado dinámico de tarjetas desde NOTICIAS,
 * gestión de favoritos con localStorage, filtros del listado,
 * renderizado de la vista de detalle y validación del formulario de contacto.
 */

/* ---------- Utilidades ---------- */

// Devuelve la URL de una imagen de ejemplo a partir de una semilla,
// para no depender de archivos de imagen propios en el prototipo.
function urlImagen(semilla, ancho = 600, alto = 400) {
  return `https://picsum.photos/seed/${semilla}/${ancho}/${alto}`;
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO + "T00:00:00");
  return fecha.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function obtenerNoticiaPorId(id) {
  return NOTICIAS.find((n) => n.id === Number(id));
}

/* ---------- Favoritos (localStorage) ---------- */

const CLAVE_FAVORITOS = "informe_favoritos";

function obtenerFavoritos() {
  const datos = localStorage.getItem(CLAVE_FAVORITOS);
  return datos ? JSON.parse(datos) : [];
}

function esFavorito(id) {
  return obtenerFavoritos().includes(Number(id));
}

function alternarFavorito(id) {
  id = Number(id);
  let favoritos = obtenerFavoritos();
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter((f) => f !== id);
  } else {
    favoritos.push(id);
  }
  localStorage.setItem(CLAVE_FAVORITOS, JSON.stringify(favoritos));
  return favoritos;
}

/* ---------- Construcción de tarjetas ---------- */

function crearTarjetaHTML(noticia) {
  return `
    <article class="tarjeta">
      <img src="${urlImagen(noticia.imagen)}" alt="${noticia.titulo}" loading="lazy" />
      <div class="tarjeta-cuerpo">
        <span class="etiqueta">${noticia.categoria.toUpperCase()}</span>
        <h3>${noticia.titulo}</h3>
        <p>${noticia.resumen}</p>
        <div class="tarjeta-meta">
          <span>${noticia.autor} · ${formatearFecha(noticia.fecha)}</span>
          <a href="detalle.html?id=${noticia.id}">Ver más →</a>
        </div>
      </div>
    </article>
  `;
}

function renderizarTarjetas(contenedorId, listaNoticias) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  if (listaNoticias.length === 0) {
    contenedor.innerHTML = `<div class="estado-vacio">No se encontraron noticias con los filtros seleccionados.</div>`;
    return;
  }

  contenedor.innerHTML = listaNoticias.map(crearTarjetaHTML).join("");
}

/* ---------- Home: últimas noticias (sidebar) ---------- */

function renderizarUltimasNoticias(contenedorId, cantidad = 3) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const ultimas = [...NOTICIAS]
    .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
    .slice(0, cantidad);

  contenedor.innerHTML = ultimas
    .map(
      (n) => `
      <div class="item-lateral">
        <img src="${urlImagen(n.imagen, 100, 100)}" alt="${n.titulo}" loading="lazy" />
        <div>
          <span class="etiqueta">${n.categoria.toUpperCase()}</span>
          <h4><a href="detalle.html?id=${n.id}">${n.titulo}</a></h4>
          <time>${formatearFecha(n.fecha)}</time>
        </div>
      </div>
    `
    )
    .join("");
}

/* ---------- Home: héroe con la noticia más reciente ---------- */

function renderizarHero(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const destacada = [...NOTICIAS].sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];

  contenedor.style.backgroundImage = `url('${urlImagen(destacada.imagen, 900, 500)}')`;
  contenedor.innerHTML = `
    <div class="hero-texto">
      <span class="etiqueta">${destacada.categoria.toUpperCase()}</span>
      <h1>${destacada.titulo}</h1>
      <p>${destacada.resumen}</p>
      <div class="hero-meta">
        <span>${destacada.autor} · ${formatearFecha(destacada.fecha)}</span>
        <a class="boton boton-primario" href="detalle.html?id=${destacada.id}">Ver más →</a>
      </div>
    </div>
  `;
}

/* ---------- Listado con filtros por categoría y buscador ---------- */

function inicializarListado() {
  const contenedorChips = document.getElementById("filtros-categorias");
  const buscador = document.getElementById("buscador");
  if (!contenedorChips) return;

  const categorias = ["Todos", ...new Set(NOTICIAS.map((n) => n.categoria))];

  contenedorChips.innerHTML = categorias
    .map(
      (cat, i) =>
        `<button class="chip ${i === 0 ? "activo" : ""}" data-categoria="${cat}">${cat}</button>`
    )
    .join("");

  let categoriaActiva = "Todos";

  function aplicarFiltros() {
    const texto = buscador.value.trim().toLowerCase();
    const resultado = NOTICIAS.filter((n) => {
      const coincideCategoria = categoriaActiva === "Todos" || n.categoria === categoriaActiva;
      const coincideTexto =
        texto === "" ||
        n.titulo.toLowerCase().includes(texto) ||
        n.resumen.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
    renderizarTarjetas("grid-noticias", resultado);
  }

  contenedorChips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      contenedorChips.querySelectorAll(".chip").forEach((c) => c.classList.remove("activo"));
      chip.classList.add("activo");
      categoriaActiva = chip.dataset.categoria;
      aplicarFiltros();
    });
  });

  buscador.addEventListener("input", aplicarFiltros);

  aplicarFiltros();
}

/* ---------- Vista de detalle ---------- */

function inicializarDetalle() {
  const parametros = new URLSearchParams(window.location.search);
  const id = parametros.get("id");
  const noticia = obtenerNoticiaPorId(id);
  const contenedor = document.getElementById("detalle-articulo");

  if (!noticia || !contenedor) {
    if (contenedor) {
      contenedor.innerHTML = `<div class="estado-vacio">No se encontró la noticia solicitada. <a href="noticias.html">Volver al listado</a>.</div>`;
    }
    return;
  }

  document.title = `${noticia.titulo} — INFORME`;

  contenedor.innerHTML = `
    <span class="etiqueta">${noticia.categoria.toUpperCase()}</span>
    <h1>${noticia.titulo}</h1>
    <div class="detalle-meta">
      <div class="avatar">${noticia.autor.charAt(0)}</div>
      <div>
        <strong>${noticia.autor}</strong><br />
        Redacción INFORME
      </div>
      <span>${formatearFecha(noticia.fecha)} · Lectura: ${noticia.tiempoLectura} min</span>
      <div class="detalle-acciones">
        <button id="btn-favorito" class="boton boton-borde">☆ Guardar</button>
        <button class="boton boton-borde" onclick="window.location.href='contacto.html'">✉ Compartir</button>
      </div>
    </div>
    <img class="detalle-imagen" src="${urlImagen(noticia.imagen, 900, 450)}" alt="${noticia.titulo}" />
    ${noticia.cuerpo.map((parrafo) => `<p>${parrafo}</p>`).join("")}
  `;

  // Botón de favoritos
  const botonFav = document.getElementById("btn-favorito");
  function actualizarBotonFavorito() {
    const activo = esFavorito(noticia.id);
    botonFav.textContent = activo ? "★ Guardado en favoritos" : "☆ Guardar";
    botonFav.classList.toggle("boton-primario", activo);
    botonFav.classList.toggle("boton-borde", !activo);
  }
  actualizarBotonFavorito();
  botonFav.addEventListener("click", () => {
    alternarFavorito(noticia.id);
    actualizarBotonFavorito();
  });

  // Noticias recomendadas: otras de la misma categoría
  const relacionadas = NOTICIAS.filter(
    (n) => n.categoria === noticia.categoria && n.id !== noticia.id
  ).slice(0, 3);

  const contenedorRelacionadas = document.getElementById("relacionadas");
  if (contenedorRelacionadas) {
    contenedorRelacionadas.innerHTML = relacionadas
      .map(
        (n) => `
        <a class="recomendada" href="detalle.html?id=${n.id}">
          <img src="${urlImagen(n.imagen, 100, 100)}" alt="${n.titulo}" />
          <h5>${n.titulo}</h5>
        </a>
      `
      )
      .join("");
  }
}

/* ---------- Página de favoritos ---------- */

function inicializarFavoritos() {
  const contenedor = document.getElementById("lista-favoritos");
  if (!contenedor) return;

  function render() {
    const ids = obtenerFavoritos();
    const noticiasFavoritas = NOTICIAS.filter((n) => ids.includes(n.id));

    if (noticiasFavoritas.length === 0) {
      contenedor.innerHTML = `
        <div class="estado-vacio">
          Aún no has guardado noticias en favoritos.<br />
          <a class="boton boton-primario" style="margin-top:14px;" href="noticias.html">Explorar noticias</a>
        </div>
      `;
      return;
    }

    contenedor.innerHTML = noticiasFavoritas
      .map(
        (n) => `
        <article class="tarjeta">
          <img src="${urlImagen(n.imagen)}" alt="${n.titulo}" loading="lazy" />
          <div class="tarjeta-cuerpo">
            <span class="etiqueta">${n.categoria.toUpperCase()}</span>
            <h3>${n.titulo}</h3>
            <p>${n.resumen}</p>
            <div class="tarjeta-meta">
              <span>${formatearFecha(n.fecha)}</span>
              <a href="detalle.html?id=${n.id}">Ver más →</a>
            </div>
            <button class="boton-quitar" data-id="${n.id}">Quitar de favoritos</button>
          </div>
        </article>
      `
      )
      .join("");

    contenedor.querySelectorAll(".boton-quitar").forEach((boton) => {
      boton.addEventListener("click", () => {
        alternarFavorito(boton.dataset.id);
        render();
      });
    });
  }

  render();
}

/* ---------- Formulario de contacto ---------- */

function inicializarContacto() {
  const formulario = document.getElementById("form-contacto");
  if (!formulario) return;

  const confirmacion = document.getElementById("confirmacion-envio");

  function validarCampo(campo, condicion, mensajeId) {
    const contenedorCampo = campo.closest(".campo");
    if (!condicion) {
      contenedorCampo.classList.add("invalido");
      return false;
    }
    contenedorCampo.classList.remove("invalido");
    return true;
  }

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.getElementById("campo-nombre");
    const correo = document.getElementById("campo-correo");
    const asunto = document.getElementById("campo-asunto");
    const mensaje = document.getElementById("campo-mensaje");

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nombreValido = validarCampo(nombre, nombre.value.trim().length >= 3);
    const correoValido = validarCampo(correo, regexCorreo.test(correo.value.trim()));
    const asuntoValido = validarCampo(asunto, asunto.value.trim().length >= 3);
    const mensajeValido = validarCampo(mensaje, mensaje.value.trim().length >= 10);

    const formularioValido = nombreValido && correoValido && asuntoValido && mensajeValido;

    if (!formularioValido) {
      confirmacion.classList.remove("visible");
      return;
    }

    // Simulación de envío exitoso (no hay backend real en este prototipo)
    confirmacion.textContent = `¡Gracias, ${nombre.value.trim()}! Tu mensaje fue enviado correctamente. Te responderemos a ${correo.value.trim()} en las próximas 24 horas.`;
    confirmacion.classList.add("visible");
    formulario.reset();
  });
}

/* ---------- Marcar enlace activo del menú ---------- */

function marcarNavActiva() {
  const pagina = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-principal a").forEach((enlace) => {
    if (enlace.getAttribute("href") === pagina) {
      enlace.classList.add("activo");
    }
  });
}

document.addEventListener("DOMContentLoaded", marcarNavActiva);
