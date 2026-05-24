// ── UniEventos · datos compartidos ──────────────────────────────────────────
// Todas las páginas cargan este script para leer/escribir los mismos eventos.

const STORAGE_KEY = 'unieventos_data';

const eventosIniciales = [
  {
    id: 1,
    nombre: 'Congreso de Ingeniería de Software 2026',
    descripcion: 'Espacio académico para compartir investigaciones, proyectos y avances en el campo del desarrollo de software. Contará con ponentes nacionales e internacionales, talleres prácticos y una feria de proyectos estudiantiles.',
    categoria: 'academico',
    estado: 'activo',
    fecha: '2026-05-28',
    hora_inicio: '09:00',
    hora_fin: '17:00',
    lugar: 'Auditorio Principal',
    direccion: 'Edificio Central, planta baja',
    cupo: 120,
    inscritos: 85,
    costo: 'Gratuito',
    organizador: 'Facultad de Ingeniería',
    telefono: '+593 99 123 4567',
    email_contacto: 'congreso.software@ug.edu.ec',
    requisitos: 'Estar matriculado en la universidad. Traer identificación estudiantil. Para talleres, laptop disponible.'
  },
  {
    id: 2,
    nombre: 'Festival Cultural Universitario',
    descripcion: 'Celebración anual de la diversidad cultural universitaria con presentaciones artísticas, música en vivo y exposiciones.',
    categoria: 'cultural',
    estado: 'activo',
    fecha: '2026-06-02',
    hora_inicio: '15:00',
    hora_fin: '22:00',
    lugar: 'Plaza Central',
    direccion: 'Plaza principal del campus',
    cupo: 500,
    inscritos: 200,
    costo: 'Gratuito',
    organizador: 'Dirección de Bienestar',
    telefono: '+593 99 234 5678',
    email_contacto: 'festival@ug.edu.ec',
    requisitos: 'Abierto a toda la comunidad universitaria.'
  },
  {
    id: 3,
    nombre: 'Torneo Intercarreras de Fútbol',
    descripcion: 'Competencia deportiva entre equipos representativos de cada carrera universitaria.',
    categoria: 'deportivo',
    estado: 'pendiente',
    fecha: '2026-06-07',
    hora_inicio: '08:00',
    hora_fin: '18:00',
    lugar: 'Cancha Deportiva',
    direccion: 'Complejo deportivo universitario',
    cupo: 100,
    inscritos: 32,
    costo: 'Gratuito',
    organizador: 'Depto. de Educación Física',
    telefono: '+593 99 345 6789',
    email_contacto: 'deportes@ug.edu.ec',
    requisitos: 'Inscribirse por equipo (mínimo 7 jugadores). Ropa deportiva obligatoria.'
  },
  {
    id: 4,
    nombre: 'Seminario de Inteligencia Artificial',
    descripcion: 'Seminario sobre aplicaciones actuales de la IA en distintas industrias, con casos de estudio y demo en vivo.',
    categoria: 'academico',
    estado: 'activo',
    fecha: '2026-06-14',
    hora_inicio: '10:00',
    hora_fin: '13:00',
    lugar: 'Laboratorio de Sistemas',
    direccion: 'Edificio de Informática, piso 2',
    cupo: 60,
    inscritos: 45,
    costo: 'Gratuito',
    organizador: 'Carrera de Ingeniería de Sistemas',
    telefono: '+593 99 456 7890',
    email_contacto: 'sistemas@ug.edu.ec',
    requisitos: 'Conocimientos básicos de programación recomendados.'
  },
  {
    id: 5,
    nombre: 'Exposición de Arte Contemporáneo',
    descripcion: 'Muestra de obras de estudiantes y docentes del área de artes, con temática de identidad cultural.',
    categoria: 'cultural',
    estado: 'pendiente',
    fecha: '2026-06-20',
    hora_inicio: '09:00',
    hora_fin: '18:00',
    lugar: 'Galería de Arte',
    direccion: 'Edificio de Humanidades, planta baja',
    cupo: 200,
    inscritos: 12,
    costo: 'Gratuito',
    organizador: 'Facultad de Artes',
    telefono: '+593 99 567 8901',
    email_contacto: 'artes@ug.edu.ec',
    requisitos: 'Abierto al público general.'
  },
  {
    id: 6,
    nombre: 'Maratón Universitaria 5K',
    descripcion: 'Carrera atlética de 5 kilómetros por el campus universitario, premiación a los tres primeros lugares.',
    categoria: 'deportivo',
    estado: 'finalizado',
    fecha: '2026-05-15',
    hora_inicio: '07:00',
    hora_fin: '12:00',
    lugar: 'Campus Universitario',
    direccion: 'Salida: entrada principal del campus',
    cupo: 150,
    inscritos: 150,
    costo: 'Gratuito',
    organizador: 'Depto. de Educación Física',
    telefono: '+593 99 678 9012',
    email_contacto: 'maraton@ug.edu.ec',
    requisitos: 'Certificado médico vigente. Ropa deportiva y zapatos adecuados.'
  }
];

// ── Helpers de sesión ────────────────────────────────────────────────────────

function getSesion() {
  try { return JSON.parse(sessionStorage.getItem('unieventos_sesion')) || null; }
  catch { return null; }
}

function setSesion(datos) {
  sessionStorage.setItem('unieventos_sesion', JSON.stringify(datos));
}

function cerrarSesion() {
  sessionStorage.removeItem('unieventos_sesion');
  window.location.href = 'index.html';
}

// ── Helpers de eventos ───────────────────────────────────────────────────────

function getEventos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : eventosIniciales;
  } catch { return eventosIniciales; }
}

function setEventos(lista) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
}

function getEvento(id) {
  return getEventos().find(e => e.id === Number(id)) || null;
}

function eliminarEvento(id) {
  const lista = getEventos().filter(e => e.id !== Number(id));
  setEventos(lista);
}

function guardarEvento(datos) {
  const lista = getEventos();
  const idx = lista.findIndex(e => e.id === Number(datos.id));
  if (idx >= 0) { lista[idx] = { ...lista[idx], ...datos }; }
  else {
    datos.id = Date.now();
    datos.inscritos = datos.inscritos || 0;
    lista.push(datos);
  }
  setEventos(lista);
  return datos.id;
}

// ── Helpers de formato ───────────────────────────────────────────────────────

function formatFecha(isoDate) {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-');
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${parseInt(d)} de ${['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'][parseInt(m)-1]}, ${y}`;
}

function formatFechaCorta(isoDate) {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

// ── Nav helper: mostrar/ocultar sesión ───────────────────────────────────────

function renderNav() {
  const sesion = getSesion();
  const navUser = document.querySelector('.nav-user');
  if (!navUser) return;

  if (sesion) {
    const iniciales = sesion.nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase();
    navUser.innerHTML = `
      <span style="font-size:0.85rem;color:var(--text-muted)">Hola, ${sesion.nombre.split(' ')[0]}</span>
      <div class="avatar" title="Cerrar sesión" onclick="cerrarSesion()" style="cursor:pointer">${iniciales}</div>
    `;
  } else {
    navUser.innerHTML = `<a href="login.html" class="btn btn-secondary btn-sm">Iniciar sesión</a>`;
  }
}

document.addEventListener('DOMContentLoaded', renderNav);
