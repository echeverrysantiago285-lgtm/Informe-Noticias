# INFORME - Plataforma Web de Noticias (Angular)

Entrega final del módulo **Desarrollo de Front-end**. La aplicación implementa una plataforma web de noticias con navegación por rutas, listado dinámico, detalle, favoritos, formulario de contacto y un mini CRUD para crear y eliminar noticias.

## Autor

**Santiago Echeverry**  
Ingeniería de Sistemas - Politécnico Grancolombiano

## Funcionalidades

- Home con noticia principal, últimas noticias, tarjetas y llamados a la acción.
- Listado de noticias con filtro por categoría y búsqueda por texto.
- Vista de detalle mediante parámetro de ruta (`/detalle/:id`).
- Favoritos persistidos con `localStorage`.
- Formulario de contacto con validaciones Template-driven Forms.
- Mini CRUD en `/gestion`:
  - Crear noticias.
  - Eliminar noticias.
  - Persistir cambios en `localStorage`.
  - Restablecer el conjunto inicial de datos.
- Diseño responsive.

## Tecnologías

- Angular 17
- TypeScript
- HTML5
- CSS3
- Angular Router
- FormsModule / NgForm
- RxJS (`BehaviorSubject`)
- `localStorage`

## Ejecución local

Requisitos: Node.js 18 o superior y npm.

```bash
npm install
npm start
```

Abrir `http://localhost:4200`.

## Compilación de producción

```bash
npm run build
```

La salida se genera en:

```text
dist/informe-noticias/browser
```

## Despliegue en Netlify

El proyecto incluye `netlify.toml` con el comando de construcción, directorio de publicación y redirección SPA para Angular.

Opción recomendada:

1. Subir este proyecto al repositorio de GitHub.
2. En Netlify seleccionar **Add new site > Import an existing project**.
3. Conectar GitHub y elegir el repositorio.
4. Netlify debe detectar:
   - Build command: `npm run build`
   - Publish directory: `dist/informe-noticias/browser`
5. Ejecutar el despliegue y copiar la URL pública.

También se puede ejecutar `npm run build` y desplegar manualmente la carpeta `dist/informe-noticias/browser`.

## Enlaces de entrega

- Repositorio GitHub: **PENDIENTE DE PEGAR LA URL DEL REPOSITORIO EXISTENTE**
- Aplicación desplegada: **PENDIENTE DE GENERAR/COPIAR LA URL DE NETLIFY**

## Estructura principal

```text
src/app/
├── components/noticia-card/
├── data/noticias.data.ts
├── models/noticia.model.ts
├── pages/
│   ├── home/
│   ├── noticias/
│   ├── detalle/
│   ├── favoritos/
│   ├── contacto/
│   └── gestion/
├── services/
│   ├── noticias.service.ts
│   └── favoritos.service.ts
├── app.component.ts/html
└── app.routes.ts
```

## Nota académica

Las noticias incluidas en `noticias.data.ts` funcionan como datos locales de demostración del proyecto. No se presentan como una fuente periodística verificada ni como un servicio informativo en producción.
