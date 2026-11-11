/**
 * Todo lo que cuenta la web, en espanol e ingles. Sale del CV en PDF (Trabajo/cv) mas las
 * practicas en Alcampo. Quitado a proposito por ser publica: telefono, pueblo exacto,
 * disponibilidad y los planes de Suiza.
 */
import type { T } from "./i18n";

export const LINKS = {
  email: "n.dieste.espana@gmail.com",
  github: "https://github.com/diesteespana",
  linkedin: "https://www.linkedin.com/in/nicol%C3%A1s-dieste-espa%C3%B1a",
};

export const NAV: { id: string; label: T }[] = [
  { id: "inicio", label: { es: "Inicio", en: "Home" } },
  { id: "sobre-mi", label: { es: "Sobre mí", en: "About" } },
  { id: "ahora", label: { es: "Ahora", en: "Now" } },
  { id: "experiencia", label: { es: "Trayectoria", en: "Journey" } },
  { id: "proyectos", label: { es: "Proyectos", en: "Projects" } },
  { id: "contacto", label: { es: "Contacto", en: "Contact" } },
];

export const HERO = {
  hello: { es: "Hola, soy", en: "Hi, I'm" },
  lead: { es: "Ingeniero informático en formación. Construyo con", en: "Computer engineering student. I build with" },
  words: ["datos", "Python", "Java", "BigQuery", "TypeScript"],
  wordsEn: ["data", "Python", "Java", "BigQuery", "TypeScript"],
  now: { es: "Ahora: becario en la Dirección de Data de Alcampo", en: "Now: intern in Alcampo's Data department" },
  sub: {
    es: "Último curso de Ingeniería Informática en la URJC, un año de Erasmus en Alemania y proyectos construidos de principio a fin: arquitectura, API, base de datos, pruebas y despliegue.",
    en: "Final-year Computer Engineering student at URJC, a full Erasmus year in Germany and projects built end to end: architecture, API, database, testing and deployment.",
  },
  ctaPrimary: { es: "Ver mi trayectoria", en: "See my journey" },
  ctaSecondary: { es: "Hablemos", en: "Get in touch" },
};

/** La ficha del inicio: clave y valor, como un archivo de configuracion. */
export const PROFILE: { k: string; v: T }[] = [
  { k: "rol", v: { es: "Becario · Dirección de Data", en: "Intern · Data department" } },
  { k: "empresa", v: { es: "Alcampo", en: "Alcampo" } },
  { k: "estudios", v: { es: "Ing. Informática · URJC", en: "Computer Eng. · URJC" } },
  { k: "erasmus", v: { es: "Oldenburg, Alemania", en: "Oldenburg, Germany" } },
  { k: "stack", v: { es: "Python · Java · SQL · TS", en: "Python · Java · SQL · TS" } },
  { k: "idiomas", v: { es: "Español · Inglés · Aranés", en: "Spanish · English · Aranese" } },
];
export const PROFILE_KEYS_EN: Record<string, string> = {
  rol: "role",
  empresa: "company",
  estudios: "studies",
  erasmus: "erasmus",
  stack: "stack",
  idiomas: "languages",
};

export const STATS: { value: number; suffix: string; label: T }[] = [
  { value: 60000, suffix: "+", label: { es: "líneas de código en proyectos propios", en: "lines of code in personal projects" } },
  { value: 1195, suffix: "+", label: { es: "tests automáticos escritos", en: "automated tests written" } },
  { value: 12, suffix: "", label: { es: "meses estudiando en Alemania, en inglés", en: "months studying in Germany, in English" } },
  { value: 3, suffix: "", label: { es: "idiomas hablados: español, inglés y aranés", en: "spoken languages: Spanish, English and Aranese" } },
];

/**
 * "Sobre mi" como una terminal: cada comando imprime una respuesta. Se pueden pulsar o escribir.
 * Los nombres de comando son los mismos en los dos idiomas; la salida cambia.
 */
export interface Command {
  cmd: string;
  hint: T;
  out: T;
}

export const COMMANDS: Command[] = [
  {
    cmd: "whoami",
    hint: { es: "quién soy", en: "who I am" },
    out: {
      es: "Nicolás Dieste España. Último curso de Ingeniería Informática en la URJC (Madrid). Me gusta construir cosas enteras: de la base de datos a la pantalla.",
      en: "Nicolás Dieste España. Final-year Computer Engineering student at URJC (Madrid). I like building whole things: from the database to the screen.",
    },
  },
  {
    cmd: "now",
    hint: { es: "qué hago ahora", en: "what I do now" },
    out: {
      es: "Becario en la Dirección de Data de Alcampo desde noviembre de 2026: Data Warehouse en Google Cloud con BigQuery y dbt, dashboards en Power BI y gestión de proyectos.",
      en: "Intern in Alcampo's Data department since November 2026: data warehouse on Google Cloud with BigQuery and dbt, Power BI dashboards and project management.",
    },
  },
  {
    cmd: "erasmus",
    hint: { es: "mi año fuera", en: "my year abroad" },
    out: {
      es: "Curso 2025-26 en la Universität Oldenburg (Alemania), todo en inglés: Generative AI y Embedded Systems II, en equipos internacionales.",
      en: "2025-26 at Universität Oldenburg, Germany, all in English: Generative AI and Embedded Systems II, in international teams.",
    },
  },
  {
    cmd: "tests",
    hint: { es: "cómo trabajo", en: "how I work" },
    out: {
      es: "Más de 1.195 tests automáticos entre mis proyectos (pytest, Vitest, Playwright). Prefiero saber que algo funciona a creerlo.",
      en: "Over 1,195 automated tests across my projects (pytest, Vitest, Playwright). I'd rather know something works than believe it does.",
    },
  },
  {
    cmd: "languages",
    hint: { es: "idiomas", en: "languages" },
    out: {
      es: "Hablo español, inglés y aranés. Además entiendo \"catalán\" y estoy aprendiendo \"alemán\".",
      en: "I speak Spanish, English and Aranese. I also understand \"Catalan\" and I'm learning \"German\".",
    },
  },
  {
    cmd: "learning",
    hint: { es: "qué aprendo", en: "what I'm learning" },
    out: {
      es: "En Alcampo: dbt, BigQuery, Power BI y metodologías Agile y Waterfall. Por mi cuenta: alemán.",
      en: "At Alcampo: dbt, BigQuery, Power BI, and Agile and Waterfall methods. On my own: German.",
    },
  },
  {
    cmd: "teaching",
    hint: { es: "he dado clase", en: "I've taught" },
    out: {
      es: "Dos cursos como profesor particular de Primaria y Bachillerato: explicar claro y adaptar el ritmo a cada alumno.",
      en: "Two school years as a private tutor for primary and secondary students: explaining clearly and adapting the pace to each student.",
    },
  },
  {
    cmd: "hobbies",
    hint: { es: "fuera del código", en: "away from code" },
    out: {
      es: "Lectura, fútbol y ajedrez.",
      en: "Reading, football and chess.",
    },
  },
];

/** El pipeline de Alcampo, de la fuente al dashboard. */
export const PIPELINE: { id: string; name: string; caption: T; detail: T }[] = [
  {
    id: "src",
    name: "Fuentes",
    caption: { es: "Datos de origen", en: "Source data" },
    detail: {
      es: "Los datos llegan de los sistemas de la empresa. Primero hay que entender una arquitectura de referencia para Data: qué capa hace qué.",
      en: "Data arrives from the company's systems. The first step is understanding a reference architecture for data: which layer does what.",
    },
  },
  {
    id: "dbt",
    name: "dbt Cloud",
    caption: { es: "Transformación", en: "Transformation" },
    detail: {
      es: "Procesos de transformación en dbt Cloud: SQL versionado, probado y documentado, que convierte datos en bruto en datos fiables.",
      en: "Transformation pipelines in dbt Cloud: versioned, tested, documented SQL that turns raw data into reliable data.",
    },
  },
  {
    id: "bq",
    name: "BigQuery",
    caption: { es: "Modelos (EDMs)", en: "Models (EDMs)" },
    detail: {
      es: "Modelos de datos empresariales (EDMs) en BigQuery, con niveles de pruebas funcionales y técnicas para asegurar la calidad.",
      en: "Enterprise data models (EDMs) in BigQuery, with functional and technical test levels to ensure quality.",
    },
  },
  {
    id: "pbi",
    name: "Power BI",
    caption: { es: "Explotación", en: "Reporting" },
    detail: {
      es: "La capa de explotación del dato: dashboards en Power BI para que negocio pueda decidir con los números delante.",
      en: "The reporting layer: Power BI dashboards so the business can make decisions with the numbers in front of them.",
    },
  },
];

export const PM_STEPS: T[] = [
  { es: "Priorizar proyectos por necesidad e impacto, a partir del business case", en: "Prioritise projects by need and impact, from the business case" },
  { es: "Fundamentos de Waterfall y Agile, y cuándo aplicar cada uno", en: "Waterfall and Agile fundamentals, and when to use each" },
  { es: "Definir objetivos, fases, plan y entregables", en: "Define goals, phases, plan and deliverables" },
  { es: "Seguir proyectos reales en shadowing", en: "Follow real projects through shadowing" },
  { es: "Clasificar riesgos e incidencias y planes de mitigación", en: "Classify risks and issues, and plan mitigations" },
];

export type Kind = "work" | "study" | "project";

export interface Entry {
  id: string;
  kind: Kind;
  when: T;
  title: T;
  where: T;
  summary: T;
  learned: T;
  skills: string[];
  current?: boolean;
}

export const ENTRIES: Entry[] = [
  {
    id: "alcampo",
    kind: "work",
    current: true,
    when: { es: "Nov. 2026 – hoy", en: "Nov 2026 – now" },
    title: { es: "Becario · Dirección de Data", en: "Intern · Data department" },
    where: { es: "Alcampo", en: "Alcampo" },
    summary: {
      es: "Data Warehouse en Google Cloud con BigQuery y dbt, dashboards en Power BI y gestión de proyectos Agile y Waterfall.",
      en: "Data warehouse on Google Cloud with BigQuery and dbt, Power BI dashboards, and Agile and Waterfall project management.",
    },
    learned: {
      es: "Cómo se trabaja con datos en una gran empresa: arquitectura de referencia, calidad y priorizar por impacto.",
      en: "How data work happens at a large company: reference architecture, quality, and prioritising by impact.",
    },
    skills: ["SQL", "BigQuery", "dbt", "Power BI", "Agile"],
  },
  {
    id: "oldenburg",
    kind: "study",
    when: { es: "2025 – 2026", en: "2025 – 2026" },
    title: { es: "Año de Erasmus+", en: "Erasmus+ year" },
    where: { es: "Universität Oldenburg, Alemania", en: "Universität Oldenburg, Germany" },
    summary: {
      es: "Un curso completo en inglés: Generative AI (autoencoders, VAE, AAE) y Embedded Systems II.",
      en: "A full academic year in English: Generative AI (autoencoders, VAE, AAE) and Embedded Systems II.",
    },
    learned: {
      es: "Estudiar y trabajar en otro país y en otro idioma, en equipos internacionales.",
      en: "Studying and working in another country and language, in international teams.",
    },
    skills: ["Python", "PyTorch", "Inglés", "Arduino", "Raspberry Pi"],
  },
  {
    id: "pumpwatch",
    kind: "project",
    when: { es: "2026 – hoy", en: "2026 – now" },
    title: { es: "PumpWatch", en: "PumpWatch" },
    where: { es: "Proyecto personal", en: "Personal project" },
    summary: {
      es: "Plataforma SaaS de analítica de datos en tiempo real: FastAPI, PostgreSQL, Redis y panel en Next.js.",
      en: "Real-time data analytics SaaS: FastAPI, PostgreSQL, Redis and a Next.js dashboard.",
    },
    learned: {
      es: "Diseñar por capas para poder cambiar piezas sin romper el resto, y sostenerlo con 195 tests.",
      en: "Layered design so parts can be swapped without breaking the rest, backed by 195 tests.",
    },
    skills: ["Python", "SQL", "Docker", "TypeScript"],
  },
  {
    id: "vtt",
    kind: "project",
    when: { es: "2026 – hoy", en: "2026 – now" },
    title: { es: "OpenTable VTT", en: "OpenTable VTT" },
    where: { es: "Proyecto personal", en: "Personal project" },
    summary: {
      es: "Servidor y cliente web multijugador en tiempo real: ~49.000 líneas de TypeScript, WebSocket y WebGL.",
      en: "Real-time multiplayer web server and client: ~49,000 lines of TypeScript, WebSocket and WebGL.",
    },
    learned: {
      es: "La seguridad se diseña desde el principio: el servidor solo envía lo que cada cliente puede ver.",
      en: "Security is designed in from the start: the server only sends what each client may see.",
    },
    skills: ["TypeScript", "Docker"],
  },
  {
    id: "urjc",
    kind: "study",
    when: { es: "2022 – 2027", en: "2022 – 2027" },
    title: { es: "Grado en Ingeniería Informática", en: "BSc in Computer Engineering" },
    where: { es: "Universidad Rey Juan Carlos, Madrid", en: "Universidad Rey Juan Carlos, Madrid" },
    summary: {
      es: "Último curso. La base: programación, bases de datos, redes, arquitectura y sistemas.",
      en: "Final year. The foundation: programming, databases, networks, architecture and systems.",
    },
    learned: {
      es: "Fundamentos sólidos para aprender cualquier tecnología nueva rápido.",
      en: "Solid fundamentals for picking up any new technology quickly.",
    },
    skills: ["Java", "C", "SQL", "Python"],
  },
  {
    id: "tutor",
    kind: "work",
    when: { es: "2 cursos", en: "2 school years" },
    title: { es: "Profesor particular", en: "Private tutor" },
    where: { es: "Primaria y Bachillerato", en: "Primary and secondary school" },
    summary: {
      es: "Clases de apoyo y preparación de exámenes.",
      en: "Support lessons and exam preparation.",
    },
    learned: {
      es: "Explicar con claridad y adaptar el ritmo a cada persona.",
      en: "Explaining clearly and adapting the pace to each person.",
    },
    skills: ["Comunicación"],
  },
  {
    id: "adecco",
    kind: "work",
    when: { es: "2023", en: "2023" },
    title: { es: "Chep y Accenture", en: "Chep and Accenture" },
    where: { es: "A través de Adecco", en: "Through Adecco" },
    summary: {
      es: "Mantenimiento de instalaciones y montaje de eventos, en equipos grandes.",
      en: "Facilities maintenance and event set-up, in large teams.",
    },
    learned: {
      es: "Prioridades que cambian y horas de inicio que no se mueven.",
      en: "Shifting priorities and start times that don't move.",
    },
    skills: ["Trabajo en equipo"],
  },
  {
    id: "hosteleria",
    kind: "work",
    when: { es: "Veranos", en: "Summers" },
    title: { es: "Hostelería · sala", en: "Hospitality · front of house" },
    where: { es: "Temporada alta", en: "High season" },
    summary: {
      es: "Atención al cliente con varias mesas a la vez y ritmo sostenido en horas punta.",
      en: "Customer service with several tables at once and a sustained pace at peak hours.",
    },
    learned: {
      es: "Mantener la calma y el orden cuando todo pasa a la vez.",
      en: "Staying calm and organised when everything happens at once.",
    },
    skills: ["Trabajo en equipo", "Comunicación"],
  },
];

/** Etiquetas de habilidad en ingles cuando hace falta. */
export const SKILL_EN: Record<string, string> = {
  Inglés: "English",
  Comunicación: "Communication",
  "Trabajo en equipo": "Teamwork",
  "Visión por computador": "Computer vision",
};

export const KIND_LABEL: Record<Kind, T> = {
  work: { es: "Trabajo", en: "Work" },
  study: { es: "Formación", en: "Education" },
  project: { es: "Proyecto", en: "Project" },
};

export const PROJECTS: { id: string; title: T; kicker: T; text: T; link?: string; stack: string[] }[] = [
  {
    id: "pumpwatch",
    title: { es: "PumpWatch", en: "PumpWatch" },
    kicker: { es: "SaaS de analítica de datos en tiempo real", en: "Real-time data analytics SaaS" },
    text: {
      es: "Backend en Python 3.12 / FastAPI con SQLAlchemy asíncrono, PostgreSQL y Redis: ~8.000 líneas, 50 endpoints REST y JWT con refresh tokens. Arquitectura por capas con patrón repositorio: el proveedor de datos o el canal de aviso (Telegram, Discord, correo) se cambian sin tocar la lógica. 195 tests, CI en GitHub Actions y panel en Next.js.",
      en: "Python 3.12 / FastAPI backend with async SQLAlchemy, PostgreSQL and Redis: ~8,000 lines, 50 REST endpoints and JWT with refresh tokens. Layered architecture with the repository pattern: the data provider or notification channel (Telegram, Discord, email) can be swapped without touching business logic. 195 tests, CI on GitHub Actions and a Next.js dashboard.",
    },
    link: "https://github.com/diesteespana/PumpWatch",
    stack: ["Python", "FastAPI", "PostgreSQL", "Redis", "Next.js"],
  },
  {
    id: "vtt",
    title: { es: "OpenTable VTT", en: "OpenTable VTT" },
    kicker: { es: "Multijugador en tiempo real, seguro por diseño", en: "Real-time multiplayer, secure by design" },
    text: {
      es: "Monorepo de ~49.000 líneas de TypeScript con sincronización por WebSocket, canvas WebGL y permisos por usuario. El servidor calcula qué puede ver cada cliente y le manda solo eso, en vez de mandarlo todo y ocultarlo en el navegador. Más de 1.000 tests (Vitest) y 10 suites end-to-end con Playwright. Prueba a mover el cursor sobre el tablero.",
      en: "A ~49,000-line TypeScript monorepo with WebSocket sync, a WebGL canvas and per-user permissions. The server works out what each client may see and sends only that, instead of sending everything and hiding it in the browser. Over 1,000 tests (Vitest) and 10 end-to-end suites with Playwright. Try moving your cursor over the board.",
    },
    link: "https://github.com/diesteespana/opentable-vtt",
    stack: ["TypeScript", "WebSocket", "WebGL", "Vitest", "Playwright"],
  },
  {
    id: "anomaly",
    title: { es: "Detección de anomalías", en: "Anomaly detection" },
    kicker: { es: "IA generativa · Universität Oldenburg", en: "Generative AI · Universität Oldenburg" },
    text: {
      es: "Comparativa de tres arquitecturas en PyTorch (autoencoder convolucional, VAE y adversarial) entrenadas solo con muestras normales: lo que el modelo no sabe reconstruir es el defecto. Fashion-MNIST y MVTec AD, evaluadas con AUROC y PR-AUC.",
      en: "Three PyTorch architectures compared (convolutional autoencoder, VAE and adversarial), trained only on normal samples: whatever the model can't reconstruct is the defect. Fashion-MNIST and MVTec AD, evaluated with AUROC and PR-AUC.",
    },
    link: "https://github.com/diesteespana/GenAI_projekt_anomaly_detection",
    stack: ["PyTorch", "scikit-learn", "NumPy"],
  },
  {
    id: "robot",
    title: { es: "Aparcamiento con visión", en: "Vision-guided parking" },
    kicker: { es: "Embedded Systems II · Arduino + Raspberry Pi · equipo internacional", en: "Embedded Systems II · Arduino + Raspberry Pi · international team" },
    text: {
      es: "Un robot con Arduino y una Raspberry Pi con cámara que «lee» la mesa. La mesa se divide en franjas con cinta americana negra y encima se dejan trozos de papel con marcadores ArUco impresos. Al reconocerlos, el sistema sabe si una plaza está ocupada, si hay un peatón o si algo está en medio del camino. Trabajo en equipo internacional, en inglés y con GitLab. Arrastra los marcadores por la mesa para probarlo.",
      en: "An Arduino robot and a Raspberry Pi with a camera that “reads” the table. The table is split into lanes with black duct tape, and printed ArUco markers on paper are placed on it. By recognising them, the system knows whether a spot is taken, whether there's a pedestrian, or whether something is blocking the way. International team work, in English, on GitLab. Drag the markers around the table to try it.",
    },
    stack: ["Arduino", "Raspberry Pi", "Visión por computador", "GitLab"],
  },
];

export const SKILL_GROUPS: { name: T; items: string[] }[] = [
  { name: { es: "Datos y cloud", en: "Data and cloud" }, items: ["BigQuery", "dbt", "Google Cloud", "Power BI", "SQL", "PostgreSQL", "MySQL", "Redis"] },
  { name: { es: "Lenguajes", en: "Languages" }, items: ["Python", "Java", "C", "TypeScript", "JavaScript", "HTML/CSS"] },
  { name: { es: "Backend", en: "Backend" }, items: ["FastAPI", "Spring Boot", "REST", "JWT", "SQLAlchemy"] },
  { name: { es: "IA", en: "AI" }, items: ["PyTorch", "scikit-learn", "pandas", "NumPy"] },
  { name: { es: "Herramientas", en: "Tooling" }, items: ["Git", "Docker", "GitHub Actions", "Maven", "Linux", "pytest", "Playwright"] },
  { name: { es: "Hardware", en: "Hardware" }, items: ["Arduino", "Raspberry Pi"] },
];

/** Tres idiomas hablados; catalan (entendido) y aleman (aprendiendo) van aparte, entre "comillas". */
export const LANGUAGES: { name: T; level: number; label: T }[] = [
  { name: { es: "Español", en: "Spanish" }, level: 5, label: { es: "Nativo", en: "Native" } },
  { name: { es: "Inglés", en: "English" }, level: 5, label: { es: "Nativo", en: "Native" } },
  { name: { es: "Aranés", en: "Aranese" }, level: 4, label: { es: "Hablado", en: "Spoken" } },
];
export const LANGUAGES_EXTRA: { name: T; label: T }[] = [
  { name: { es: "Catalán", en: "Catalan" }, label: { es: "entendido", en: "understood" } },
  { name: { es: "Alemán", en: "German" }, label: { es: "aprendiendo", en: "learning" } },
];
