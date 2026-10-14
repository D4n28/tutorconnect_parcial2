-- =====================================================================
-- TutorConnect - Base de Datos Relacional (SQL)
-- Integrantes: Daniel Barrios, Eduardo Escudero
-- Materia: Desarrollo Web - Parcial 2
-- Motor: Compatible con MySQL 8.0+, PostgreSQL, SQLite
-- =====================================================================

-- 1. CREACIÓN DE TABLAS

DROP TABLE IF EXISTS notificaciones;
DROP TABLE IF EXISTS resenas;
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS disponibilidad_tutor;
DROP TABLE IF EXISTS tutor_materias;
DROP TABLE IF EXISTS materias;
DROP TABLE IF EXISTS tutores;
DROP TABLE IF EXISTS estudiantes;
DROP TABLE IF EXISTS usuarios;

-- Tabla Usuarios (Base común para Estudiantes y Tutores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(25),
    ciudad VARCHAR(100) DEFAULT 'Bogotá, Colombia',
    foto_url VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    rol ENUM('estudiante', 'tutor') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla Estudiantes
CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    nivel_academico VARCHAR(50) DEFAULT 'Universidad',
    institucion VARCHAR(120) DEFAULT 'Universidad de los Andes',
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Tutores
CREATE TABLE tutores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE,
    especialidad_principal VARCHAR(100) NOT NULL,
    nivel_educativo VARCHAR(80) NOT NULL,
    biografia TEXT,
    experiencia_anos INT DEFAULT 3,
    precio_hora DECIMAL(8, 2) NOT NULL,
    modalidad ENUM('virtual', 'presencial', 'ambas') DEFAULT 'ambas',
    direccion_presencial VARCHAR(255),
    calificacion_promedio DECIMAL(3, 2) DEFAULT 5.0,
    total_resenas INT DEFAULT 0,
    disponible_ahora BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla Materias
CREATE TABLE materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    categoria VARCHAR(60) NOT NULL,
    icono VARCHAR(40) DEFAULT 'book'
);

-- Tabla Intermedia Tutor - Materias (N a M)
CREATE TABLE tutor_materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT NOT NULL,
    materia_id INT NOT NULL,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE,
    UNIQUE KEY uq_tutor_materia (tutor_id, materia_id)
);

-- Tabla de Franjas de Disponibilidad Semanal del Tutor
CREATE TABLE disponibilidad_tutor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tutor_id INT NOT NULL,
    dia_semana ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE CASCADE
);

-- Tabla Reservas de Tutoría
CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estudiante_id INT NOT NULL,
    tutor_id INT NOT NULL,
    materia_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    modalidad ENUM('virtual', 'presencial') NOT NULL,
    precio DECIMAL(8, 2) NOT NULL,
    estado ENUM('pendiente', 'confirmada', 'rechazada', 'completada', 'cancelada') DEFAULT 'pendiente',
    enlace_videollamada VARCHAR(255),
    direccion_sesion VARCHAR(255),
    notas_estudiante TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
);

-- Tabla Reseñas y Calificaciones
CREATE TABLE resenas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reserva_id INT NOT NULL UNIQUE,
    estudiante_id INT NOT NULL,
    tutor_id INT NOT NULL,
    calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_resena TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (reserva_id) REFERENCES reservas(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE,
    FOREIGN KEY (tutor_id) REFERENCES tutores(id) ON DELETE CASCADE
);

-- Tabla Notificaciones
CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    titulo VARCHAR(120) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo ENUM('reserva_solicitada', 'reserva_confirmada', 'reserva_cancelada', 'recordatorio', 'sistema') NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =====================================================================
-- 2. DATOS DE PRUEBA (SEED DATA)
-- =====================================================================

-- Materias del sistema
INSERT INTO materias (id, nombre, categoria, icono) VALUES
(1, 'Cálculo Diferencial e Integral', 'Matemáticas', 'calculator'),
(2, 'Física Clásica y Cuántica', 'Física', 'atom'),
(3, 'Química Orgánica', 'Química', 'flask'),
(4, 'Programación Web (HTML, CSS, JS)', 'Tecnología', 'code'),
(5, 'Estructuras de Datos y Algoritmos', 'Tecnología', 'cpu'),
(6, 'Inglés Académico y Conversacional', 'Idiomas', 'globe');

-- Usuarios
INSERT INTO usuarios (id, nombre_completo, email, password_hash, telefono, ciudad, foto_url, rol) VALUES
(1, 'Elena Martínez', 'elena@email.com', '$2y$10$demoHashEstudiante123', '+57 300 123 4567', 'Bogotá, Colombia', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'estudiante'),
(2, 'Ana García', 'ana.garcia@tutorconnect.com', '$2y$10$demoHashTutor123', '+57 310 987 6543', 'Madrid, España', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'tutor'),
(3, 'Carlos Méndez', 'carlos.mendez@tutorconnect.com', '$2y$10$demoHashTutor456', '+57 320 555 1234', 'Medellín, Colombia', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'tutor'),
(4, 'Mario López', 'mario.lopez@tutorconnect.com', '$2y$10$demoHashTutor789', '+57 315 444 8899', 'Cali, Colombia', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'tutor'),
(5, 'Roberto Silva', 'roberto.silva@tutorconnect.com', '$2y$10$demoHashTutor101', '+57 318 777 2211', 'Bogotá, Colombia', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150', 'tutor'),
(6, 'Valentina Torres', 'valentina.torres@tutorconnect.com', '$2y$10$demoHashTutor202', '+57 312 333 9900', 'Barranquilla, Colombia', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', 'tutor');

-- Perfiles de Estudiantes
INSERT INTO estudiantes (id, usuario_id, nivel_academico, institucion) VALUES
(1, 1, 'Universidad', 'Universidad Nacional de Colombia');

-- Perfiles de Tutores
INSERT INTO tutores (id, usuario_id, especialidad_principal, nivel_educativo, biografia, experiencia_anos, precio_hora, modalidad, direccion_presencial, calificacion_promedio, total_resenas, disponible_ahora) VALUES
(1, 2, 'Cálculo y Física Matemática', 'Doctora en Matemáticas (UCM)', 'Doctora en Matemáticas por la Universidad Complutense con 8 años de experiencia docente. Especialista en cálculo, álgebra lineal y estadística aplicada.', 8, 25.00, 'ambas', 'Calle 100 #15-20, Edificio Business Center', 4.90, 127, TRUE),
(2, 3, 'Ingeniería de Software y Web', 'Magíster en Ciencias Computacionales', 'Ingeniero de software senior con 6 años de experiencia formando desarrolladores frontend y fullstack. Apasionado por la pedagogía interactiva.', 6, 35.00, 'virtual', NULL, 4.80, 89, TRUE),
(3, 4, 'Química Orgánica y Bioquímica', 'Biólogo y Químico Farmacéutico', 'Docente universitario apasionado por hacer la química comprensible mediante analogías prácticas y ejercicios resueltos paso a paso.', 5, 20.00, 'ambas', 'Carrera 7 #72-41, Consultorio de Tutorías', 4.70, 64, TRUE),
(4, 5, 'Física Termodinámica y Mecánica', 'Físico Puro (Universidad Nacional)', 'Formación profunda y sólida metodología para superar exámenes universitarios y pruebas de admisión con éxito.', 4, 22.00, 'virtual', NULL, 4.90, 52, FALSE),
(5, 6, 'Inglés Avanzado y Conversacional', 'Licenciada en Lenguas Modernas (C2)', 'Certificación Cambridge DELTA. Clases dinámicas enfocadas en fluidez verbal, entrevistas de trabajo y exámenes TOEFL/IELTS.', 7, 18.00, 'ambas', 'Avenida El Dorado #68C-61', 4.85, 95, TRUE);

-- Asociación Tutor - Materias
INSERT INTO tutor_materias (tutor_id, materia_id) VALUES
(1, 1), -- Ana -> Cálculo
(1, 2), -- Ana -> Física
(2, 4), -- Carlos -> Programación Web
(2, 5), -- Carlos -> Algoritmos
(3, 3), -- Mario -> Química
(4, 2), -- Roberto -> Física
(5, 6); -- Valentina -> Inglés

-- Disponibilidad Semanal
INSERT INTO disponibilidad_tutor (tutor_id, dia_semana, hora_inicio, hora_fin) VALUES
(1, 'Lunes', '08:00:00', '10:00:00'),
(1, 'Lunes', '10:00:00', '12:00:00'),
(1, 'Lunes', '14:00:00', '16:00:00'),
(1, 'Miércoles', '09:00:00', '11:00:00'),
(1, 'Miércoles', '15:00:00', '17:00:00'),
(1, 'Viernes', '08:00:00', '12:00:00'),
(2, 'Martes', '14:00:00', '18:00:00'),
(2, 'Jueves', '10:00:00', '13:00:00');

-- Reservas de Ejemplo
INSERT INTO reservas (id, estudiante_id, tutor_id, materia_id, fecha, hora_inicio, hora_fin, modalidad, precio, estado, enlace_videollamada, direccion_sesion) VALUES
(1, 1, 1, 1, '2026-10-18', '09:00:00', '10:00:00', 'virtual', 25.00, 'confirmada', 'https://meet.google.com/abc-tuto-con', NULL),
(2, 1, 2, 4, '2026-10-19', '11:00:00', '12:00:00', 'virtual', 35.00, 'pendiente', 'https://meet.google.com/xyz-code-dev', NULL),
(3, 1, 3, 3, '2026-10-12', '16:00:00', '17:00:00', 'presencial', 20.00, 'completada', NULL, 'Carrera 7 #72-41');

-- Reseñas
INSERT INTO resenas (reserva_id, estudiante_id, tutor_id, calificacion, comentario) VALUES
(3, 1, 3, 5, 'Excelente profesor, me ayudó a superar el parcial de química orgánica con la mejor nota del curso.');

-- Notificaciones
INSERT INTO notificaciones (usuario_id, titulo, mensaje, tipo, leida) VALUES
(1, 'Reserva confirmada', 'Tu sesión con Ana García de Cálculo Diferencial ha sido confirmada para el 18 de Octubre.', 'reserva_confirmada', FALSE),
(1, 'Recordatorio de sesión', 'Faltan 24 horas para tu sesión de Cálculo Diferencial.', 'recordatorio', FALSE),
(2, 'Nueva solicitud de reserva', 'Elena Martínez ha solicitado una sesión para el 18 de Octubre a las 09:00 AM.', 'reserva_solicitada', FALSE);
