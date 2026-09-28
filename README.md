# INFORME — Plataforma Web de Noticias

Prototipo funcional desarrollado para la Entrega 2 (Prototipo funcional) del módulo
teórico-práctico de Desarrollo de Front-end — Institución Universitaria Politécnico
Grancolombiano.

## Descripción

Aplicación web tipo periódico donde los usuarios pueden explorar noticias educativas,
tecnológicas, turísticas y comerciales, ver su información detallada, guardarlas en
favoritos y ponerse en contacto con la redacción.

## Estructura del proyecto

```
proyecto/
├── index.html        Página de inicio (Home)
├── noticias.html      Listado de noticias con filtros por categoría y buscador
├── detalle.html        Vista de detalle de una noticia (?id=)
├── favoritos.html      Noticias guardadas por el usuario (localStorage)
├── contacto.html        Formulario de contacto con validaciones
├── css/
│   └── styles.css       Hoja de estilos general del sitio
├── js/
│   ├── data.js           Datos locales de noticias (simula un JSON)
│   └── app.js            Renderizado dinámico, favoritos, filtros y validaciones
└── README.md
```

## Funcionalidades implementadas

- Renderizado dinámico de tarjetas de noticias a partir de un arreglo de datos local (`data.js`).
- Vista de detalle que carga la noticia según el parámetro `id` en la URL.
- Gestión de favoritos usando `localStorage` (agregar, listar y quitar).
- Listado con filtro por categoría y buscador por texto.
- Formulario de contacto con validaciones básicas (campos obligatorios y formato de correo) y mensaje de confirmación.
- Diseño responsive (escritorio, tablet y móvil).

## Tecnologías utilizadas

- HTML5
- CSS3 (sin frameworks, estilos propios)
- JavaScript (ES6, vanilla)
- localStorage para persistencia de favoritos en el navegador

## Cómo ejecutar el proyecto

No requiere instalación. Basta con abrir `index.html` en cualquier navegador web moderno,
o servir la carpeta con un servidor estático (por ejemplo, la extensión Live Server de VS Code).

## Despliegue

Este proyecto puede desplegarse gratuitamente en GitHub Pages, Netlify o Vercel apuntando
a la raíz del repositorio.

## Autor

Santiago — Ingeniería de Sistemas, Politécnico Grancolombiano.
