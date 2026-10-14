/**
 * TutorConnect - Capa de Datos y Persistencia Local
 * Integrantes: Daniel Barrios, Eduardo Escudero
 * Materia: Desarrollo Web - Parcial 2
 */

const DATOS_SEMILLA = {
  usuarioActual: {
    id: 1,
    nombre: "Elena Martínez",
    email: "elena@email.com",
    rol: "estudiante", // 'estudiante' | 'tutor'
    telefono: "+57 300 123 4567",
    ciudad: "Bogotá, Colombia",
    foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  tutores: [
    {
      id: 1,
      nombre: "Ana García",
      email: "ana.garcia@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      especialidad: "Cálculo diferencial e Integral",
      materias: ["Matemáticas", "Física"],
      nivel: "Universidad",
      precio: 25,
      calificacion: 4.9,
      totalResenas: 127,
      disponible: true,
      modalidad: "Virtual y presencial",
      ciudad: "Madrid, España",
      experiencia: "8 años de experiencia docente",
      sobreMi: "Doctora en Matemáticas por la Universidad Complutense con 8 años de experiencia docente. Especialista en cálculo diferencial, álgebra lineal y estadística aplicada. Metodología práctica enfocada en que entiendas los conceptos clave para exámenes.",
      horarios: ["09:00 - 10:00", "10:00 - 11:00", "14:00 - 15:00", "16:00 - 17:00"],
      dias: ["Lunes", "Miércoles", "Viernes"]
    },
    {
      id: 2,
      nombre: "Carlos Méndez",
      email: "carlos.mendez@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      especialidad: "Ingeniería de Software y Web",
      materias: ["Tecnología", "Programación"],
      nivel: "Universidad",
      precio: 35,
      calificacion: 4.8,
      totalResenas: 89,
      disponible: true,
      modalidad: "Virtual",
      ciudad: "Medellín, Colombia",
      experiencia: "6 años como Senior Dev",
      sobreMi: "Ingeniero de software con pasión por enseñar desarrollo frontend con HTML, CSS, JavaScript y arquitecturas web modernas.",
      horarios: ["10:00 - 11:00", "11:00 - 12:00", "17:00 - 18:00"],
      dias: ["Martes", "Jueves"]
    },
    {
      id: 3,
      nombre: "Mario López",
      email: "mario.lopez@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      especialidad: "Química Orgánica y Bioquímica",
      materias: ["Química"],
      nivel: "Secundaria y Universidad",
      precio: 20,
      calificacion: 4.7,
      totalResenas: 64,
      disponible: true,
      modalidad: "Virtual y presencial",
      ciudad: "Cali, Colombia",
      experiencia: "5 años en tutorías universitarias",
      sobreMi: "Especialista en hacer que la química compleja se entienda de forma sencilla y gráfica.",
      horarios: ["15:00 - 16:00", "16:00 - 17:00"],
      dias: ["Lunes", "Jueves"]
    },
    {
      id: 4,
      nombre: "Roberto Silva",
      email: "roberto.silva@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
      especialidad: "Física Cuántica y Termodinámica",
      materias: ["Física"],
      nivel: "Universidad",
      precio: 22,
      calificacion: 4.9,
      totalResenas: 52,
      disponible: false,
      modalidad: "Virtual",
      ciudad: "Bogotá, Colombia",
      experiencia: "4 años como investigador y tutor",
      sobreMi: "Aprende a resolver problemas complejos de física sin memorizar fórmulas a ciegas.",
      horarios: ["08:00 - 09:00", "18:00 - 19:00"],
      dias: ["Miércoles", "Viernes"]
    },
    {
      id: 5,
      nombre: "Valentina Torres",
      email: "valentina.torres@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
      especialidad: "Inglés IELTS / TOEFL",
      materias: ["Idiomas"],
      nivel: "Todos los niveles",
      precio: 18,
      calificacion: 4.8,
      totalResenas: 95,
      disponible: true,
      modalidad: "Virtual y presencial",
      ciudad: "Barranquilla, Colombia",
      experiencia: "7 años certificada Cambridge C2",
      sobreMi: "Clases 100% enfocadas en conversación real y preparación efectiva de exámenes internacionales.",
      horarios: ["09:00 - 10:00", "11:00 - 12:00", "16:00 - 17:00"],
      dias: ["Lunes", "Martes", "Miércoles"]
    },
    {
      id: 6,
      nombre: "Diego Ramírez",
      email: "diego.ramirez@tutorconnect.com",
      foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      especialidad: "Económicas y Finanzas",
      materias: ["Economía"],
      nivel: "Universidad",
      precio: 28,
      calificacion: 4.7,
      totalResenas: 41,
      disponible: false,
      modalidad: "Virtual",
      ciudad: "Bogotá, Colombia",
      experiencia: "5 años como analista financiero",
      sobreMi: "Econometría, microeconomía y finanzas corporativas explicadas paso a paso con casos prácticos.",
      horarios: ["14:00 - 15:00", "15:00 - 16:00"],
      dias: ["Jueves", "Viernes"]
    }
  ],
  reservas: [
    {
      id: 101,
      tutorId: 1,
      tutorNombre: "Ana García",
      materia: "Cálculo diferencial",
      fecha: "18 oct 2026",
      hora: "09:00 - 10:00",
      modalidad: "Virtual",
      precio: 25,
      estado: "confirmada", // confirmada, pendiente, cancelada, completada
      meetUrl: "videoconferencia.html?id=101&tutor=Ana%20Garc%C3%ADa&materia=C%C3%A1lculo%20diferencial",
      calificada: false
    },
    {
      id: 102,
      tutorId: 2,
      tutorNombre: "Carlos Méndez",
      materia: "Ingeniería de software / Web",
      fecha: "20 oct 2026",
      hora: "11:00 - 12:00",
      modalidad: "Virtual",
      precio: 35,
      estado: "pendiente",
      meetUrl: "videoconferencia.html?id=102&tutor=Carlos%20M%C3%A9ndez&materia=Desarrollo%20Web",
      calificada: false
    },
    {
      id: 103,
      tutorId: 3,
      tutorNombre: "Mario López",
      materia: "Química Orgánica",
      fecha: "12 oct 2026",
      hora: "16:00 - 17:00",
      modalidad: "Presencial",
      precio: 20,
      estado: "completada",
      meetUrl: null,
      calificada: true,
      calificacionEstrellas: 5,
      comentario: "Excelente docente, preparó el examen conmigo y saqué 5.0."
    }
  ],
  solicitudesTutor: [
    {
      id: 201,
      estudianteNombre: "Pedro Álvarez",
      foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      materia: "Cálculo integral",
      fecha: "19 oct 2026",
      hora: "10:00 - 11:00",
      modalidad: "Virtual",
      precio: 25,
      estado: "pendiente"
    },
    {
      id: 202,
      estudianteNombre: "Isabel Fontaine",
      foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      materia: "Álgebra lineal",
      fecha: "21 oct 2026",
      hora: "14:00 - 15:00",
      modalidad: "Presencial",
      precio: 25,
      estado: "pendiente"
    },
    {
      id: 203,
      estudianteNombre: "Tomás Ruiz",
      foto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100",
      materia: "Ecuaciones diferenciales",
      fecha: "22 oct 2026",
      hora: "09:00 - 10:00",
      modalidad: "Virtual",
      precio: 25,
      estado: "pendiente"
    }
  ],
  notificaciones: [
    {
      id: 1,
      titulo: "Reserva confirmada",
      mensaje: "Tu sesión con Ana García de Cálculo Diferencial ha sido confirmada.",
      tiempo: "Hace 10 min",
      leida: false
    },
    {
      id: 2,
      titulo: "Recordatorio de sesión",
      mensaje: "Faltan menos de 24 horas para tu clase de Cálculo.",
      tiempo: "Hace 2 horas",
      leida: false
    },
    {
      id: 3,
      titulo: "Califica tu última sesión",
      mensaje: "Tu sesión con Mario López ha finalizado. Comparte tu opinión.",
      tiempo: "Hace 2 días",
      leida: true
    }
  ]
};

// Clase para manejo de persistencia local en almacenamiento web
class BaseDatosTutor {
  static inicializar() {
    if (!localStorage.getItem("tc_inicializado")) {
      localStorage.setItem("tc_usuarioActual", JSON.stringify(DATOS_SEMILLA.usuarioActual));
      localStorage.setItem("tc_tutores", JSON.stringify(DATOS_SEMILLA.tutores));
      localStorage.setItem("tc_reservas", JSON.stringify(DATOS_SEMILLA.reservas));
      localStorage.setItem("tc_solicitudes", JSON.stringify(DATOS_SEMILLA.solicitudesTutor));
      localStorage.setItem("tc_notificaciones", JSON.stringify(DATOS_SEMILLA.notificaciones));
      localStorage.setItem("tc_inicializado", "true");
    }
  }

  static obtenerUsuarioActual() {
    return JSON.parse(localStorage.getItem("tc_usuarioActual")) || DATOS_SEMILLA.usuarioActual;
  }

  static guardarUsuarioActual(usuario) {
    localStorage.setItem("tc_usuarioActual", JSON.stringify(usuario));
  }

  static obtenerTutores() {
    return JSON.parse(localStorage.getItem("tc_tutores")) || DATOS_SEMILLA.tutores;
  }

  static obtenerTutorPorId(id) {
    const lista = this.obtenerTutores();
    return lista.find(t => t.id === parseInt(id));
  }

  static obtenerReservas() {
    return JSON.parse(localStorage.getItem("tc_reservas")) || DATOS_SEMILLA.reservas;
  }

  static agregarReserva(reserva) {
    const lista = this.obtenerReservas();
    reserva.id = Date.now();
    lista.unshift(reserva);
    localStorage.setItem("tc_reservas", JSON.stringify(lista));
    
    // Agregar notificación automática
    this.agregarNotificacion({
      titulo: "Reserva solicitada",
      mensaje: `Has reservado una sesión con ${reserva.tutorNombre} para el ${reserva.fecha}.`,
      tiempo: "Justo ahora",
      leida: false
    });
    return reserva;
  }

  static actualizarEstadoReserva(id, nuevoEstado) {
    const lista = this.obtenerReservas();
    const item = lista.find(r => r.id === parseInt(id));
    if (item) {
      item.estado = nuevoEstado;
      localStorage.setItem("tc_reservas", JSON.stringify(lista));
    }
  }

  static calificarReserva(id, estrellas, comentario) {
    const lista = this.obtenerReservas();
    const item = lista.find(r => r.id === parseInt(id));
    if (item) {
      item.calificada = true;
      item.calificacionEstrellas = estrellas;
      item.comentario = comentario;
      localStorage.setItem("tc_reservas", JSON.stringify(lista));
    }
  }

  static obtenerSolicitudesTutor() {
    return JSON.parse(localStorage.getItem("tc_solicitudes")) || DATOS_SEMILLA.solicitudesTutor;
  }

  static actualizarEstadoSolicitud(id, nuevoEstado) {
    const lista = this.obtenerSolicitudesTutor();
    const item = lista.find(s => s.id === parseInt(id));
    if (item) {
      item.estado = nuevoEstado;
      localStorage.setItem("tc_solicitudes", JSON.stringify(lista));
    }
  }

  static obtenerNotificaciones() {
    return JSON.parse(localStorage.getItem("tc_notificaciones")) || DATOS_SEMILLA.notificaciones;
  }

  static agregarNotificacion(notificacion) {
    const lista = this.obtenerNotificaciones();
    notificacion.id = Date.now();
    lista.unshift(notificacion);
    localStorage.setItem("tc_notificaciones", JSON.stringify(lista));
  }

  static marcarTodasLeidas() {
    const lista = this.obtenerNotificaciones();
    lista.forEach(n => n.leida = true);
    localStorage.setItem("tc_notificaciones", JSON.stringify(lista));
  }

  static reiniciarDatosPrueba() {
    localStorage.clear();
    this.inicializar();
  }

  // Compatibilidad hacia atrás
  static init() { this.inicializar(); }
  static getCurrentUser() { return this.obtenerUsuarioActual(); }
  static setCurrentUser(u) { this.guardarUsuarioActual(u); }
  static getTutores() { return this.obtenerTutores(); }
  static getTutorById(id) { return this.obtenerTutorPorId(id); }
  static getReservas() { return this.obtenerReservas(); }
  static addReserva(r) { return this.agregarReserva(r); }
  static updateReservaEstado(id, e) { this.actualizarEstadoReserva(id, e); }
  static getSolicitudesTutor() { return this.obtenerSolicitudesTutor(); }
  static updateSolicitudEstado(id, e) { this.actualizarEstadoSolicitud(id, e); }
  static getNotificaciones() { return this.obtenerNotificaciones(); }
  static addNotificacion(n) { this.agregarNotificacion(n); }
  static resetDemoData() { this.reiniciarDatosPrueba(); }
}

// Alias para mantener compatibilidad si se llama TutorDB
const TutorDB = BaseDatosTutor;

// Inicializar la base de datos al cargar el script
BaseDatosTutor.inicializar();
