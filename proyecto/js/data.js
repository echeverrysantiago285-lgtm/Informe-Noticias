/**
 * data.js
 * Fuente de datos local del aplicativo (simula un JSON de noticias).
 * Cada noticia tiene: id, categoria, titulo, resumen, cuerpo (array de párrafos),
 * autor, fecha, tiempoLectura e imagen (usada como semilla para picsum.photos).
 */

const NOTICIAS = [
  {
    id: 1,
    categoria: "Tecnología",
    titulo: "Inteligencia Artificial transforma la educación superior en América Latina",
    resumen:
      "Universidades de Colombia, México y Argentina integran herramientas de IA en sus currículos para preparar a estudiantes ante los retos del mercado laboral del siglo XXI.",
    cuerpo: [
      "Un número creciente de universidades latinoamericanas ha comenzado a incorporar asignaturas y laboratorios centrados en inteligencia artificial dentro de sus programas de pregrado, buscando cerrar la brecha entre la formación académica y las demandas del mercado laboral.",
      "Según directivos consultados, la estrategia combina alfabetización en IA para todas las carreras con rutas especializadas en programas de ingeniería y ciencias de la computación.",
      "El reto principal, señalan los expertos, es la actualización constante de los docentes y la disponibilidad de infraestructura tecnológica en instituciones con menores recursos."
    ],
    autor: "María Fernanda Ríos",
    fecha: "2026-09-14",
    tiempoLectura: 5,
    imagen: "ia-educacion"
  },
  {
    id: 2,
    categoria: "Turismo",
    titulo: "Cartagena rompe récord histórico de visitantes internacionales en 2026",
    resumen:
      "La Ciudad Amurallada recibió más de 2.4 millones de turistas extranjeros en los primeros ocho meses del año, impulsada por el turismo cultural y gastronómico.",
    cuerpo: [
      "La Ciudad Amurallada recibió más de 2.4 millones de turistas extranjeros en los primeros ocho meses del año, impulsada por el turismo cultural y gastronómico. Este es un hito significativo que ha captado la atención de expertos, instituciones y ciudadanos de toda la región latinoamericana, quienes ven en este desarrollo una oportunidad para transformar dinámicas establecidas durante décadas.",
      "Según fuentes consultadas por INFORME, los resultados preliminares superan las proyecciones iniciales en un 34%, lo que ha generado un optimismo renovado entre los actores del sector. 'Estamos ante un cambio de paradigma real', señaló uno de los principales responsables del proyecto durante la rueda de prensa realizada el pasado martes en Bogotá.",
      "La implementación se lleva a cabo en fases, con especial énfasis en las poblaciones más vulnerables y los territorios que históricamente han enfrentado mayores barreras de acceso. La primera fase ya cubre el 60% de los municipios objetivo, y se espera completar el 100% antes de finalizar el primer trimestre de 2027.",
      "Los expertos coinciden en que la sostenibilidad del proyecto dependerá de la voluntad política y de la asignación presupuestal en los próximos ejercicios fiscales. Sin embargo, la respuesta ciudadana ha sido abrumadoramente positiva, con índices de aprobación que superan el 78% en las encuestas realizadas por distintos centros de investigación."
    ],
    autor: "Juan Pablo Herrera",
    fecha: "2026-09-13",
    tiempoLectura: 4,
    imagen: "cartagena-turismo"
  },
  {
    id: 3,
    categoria: "Educación",
    titulo: "Politécnico Grancolombiano lanza programa de becas para ingeniería de sistemas",
    resumen:
      "Más de 500 becas disponibles para estudiantes de bajos recursos con alto rendimiento académico, cubriendo el 100% de la matrícula.",
    cuerpo: [
      "La institución anunció la apertura de convocatoria para 500 nuevos cupos becados dirigidos a estudiantes de estratos 1 y 2 con promedio académico sobresaliente.",
      "El programa cubre matrícula completa durante toda la carrera y contempla apoyos adicionales para material de estudio y conectividad.",
      "Las inscripciones estarán abiertas hasta finales de octubre y los resultados se publicarán en noviembre de 2026."
    ],
    autor: "Laura Camila Méndez",
    fecha: "2026-09-12",
    tiempoLectura: 3,
    imagen: "beca-educacion"
  },
  {
    id: 4,
    categoria: "Comercio",
    titulo: "Startups colombianas recaudan $120 millones USD en ronda de inversión regional",
    resumen:
      "El ecosistema emprendedor de Bogotá y Medellín consolida su posición como hub tecnológico latinoamericano, con foco en fintech y logística.",
    cuerpo: [
      "Un grupo de doce startups colombianas cerró una ronda conjunta de inversión liderada por fondos regionales, consolidando el momento favorable del ecosistema emprendedor nacional.",
      "Los sectores con mayor tracción fueron fintech, logística de última milla y soluciones de comercio electrónico para pymes.",
      "Analistas del sector destacan que Colombia se ha convertido en uno de los tres principales receptores de capital de riesgo en la región durante 2026."
    ],
    autor: "Andrés Felipe Torres",
    fecha: "2026-09-11",
    tiempoLectura: 6,
    imagen: "startup-comercio"
  },
  {
    id: 5,
    categoria: "Tecnología",
    titulo: "Colombia avanza hacia la conectividad 5G en 32 municipios rurales",
    resumen:
      "El Ministerio de TIC ejecuta la segunda fase del plan de expansión digital, priorizando comunidades con menor índice de conectividad.",
    cuerpo: [
      "El plan busca reducir la brecha digital en zonas rurales mediante la instalación de nueva infraestructura de telecomunicaciones.",
      "Se espera que la cobertura beneficie a más de 300.000 personas en los próximos 18 meses.",
      "La iniciativa incluye capacitación digital para adultos mayores y pequeños productores agrícolas."
    ],
    autor: "Sofía Ramírez Castro",
    fecha: "2026-09-10",
    tiempoLectura: 5,
    imagen: "5g-tecnologia"
  },
  {
    id: 6,
    categoria: "Educación",
    titulo: "Nuevo modelo de evaluación por competencias llega a colegios públicos",
    resumen:
      "El Ministerio de Educación Nacional pilotea en 200 instituciones un sistema de valoración basado en habilidades prácticas.",
    cuerpo: [
      "El modelo reemplaza gradualmente la evaluación memorística por proyectos y evidencias de desempeño.",
      "Docentes de las instituciones piloto recibirán acompañamiento pedagógico durante todo el proceso de transición.",
      "Los resultados de la primera fase se conocerán a mediados de 2027."
    ],
    autor: "Carlos Andrés Vega",
    fecha: "2026-09-09",
    tiempoLectura: 4,
    imagen: "colegio-educacion"
  }
];
