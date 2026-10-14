# TutorConnect - Plataforma de Tutorías Online y Presenciales

**Entrega de Parcial 2 - Desarrollo Web**  
**Integrantes del Equipo:**  
- **Daniel Barrios**  
- **Eduardo Escudero**  

---

## 🚀 1. Resumen del Proyecto

**TutorConnect** es una aplicación web responsiva diseñada para conectar a estudiantes con profesores particulares altamente calificados. Basada fielmente en los requerimientos del parcial y en el documento de especificación UI/UX (13 páginas de prototipo), la plataforma permite realizar el ciclo completo de tutorías: desde la exploración filtrada y reserva de horarios hasta la realización de videoconferencias virtuales y la retroalimentación mediante calificaciones y reseñas.

---

## 📁 2. Estructura de Entregables del Parcial

```text
Parcial 2 desarrollo web - Daniel Barrios, Eduardo Escudero/
│
├── index.html                  # Pantalla de Login, Registro y Selección de Rol
├── dashboard-estudiante.html   # Búsqueda rápida, filtros múltiples y lista de tutores
├── tutor-perfil.html           # Perfil del tutor, reseñas y selector de horarios
├── reserva-confirmacion.html   # Pantalla de confirmación, resumen y aviso de notificación
├── mis-reservas.html           # Gestión de reservas, unirse a clase y modal de calificación
├── dashboard-tutor.html        # Panel de tutor, métricas, disponibilidad semanal y solicitudes
├── videoconferencia.html       # Simulador interactivo de videollamada (Meet / Teams)
├── notificaciones.html         # Bandeja de avisos, recordatorios y sincronización
├── perfil.html                 # Edición de datos personales, teléfono y ubicación
│
├── css/
│   ├── styles.css              # Variables de color (Azul/Naranja), reset y tipografía Roboto
│   ├── components.css          # Botones, tarjetas de tutores, modales y badges de estado
│   └── responsive.css          # Media queries y barra inferior (Tab Bar) para móviles
│
├── js/
│   ├── db.js                   # Base de datos local (LocalStorage) y datos precargados (Seed)
│   └── app.js                  # Lógica común de navegación, sesión, toast y footer
│
├── database/
│   ├── schema.sql              # Script SQL (DDL + DML) para MySQL / PostgreSQL / SQLite
│   └── database_diagram.md     # Diagrama Entidad-Relación (Mermaid) y Diccionario de datos
│
└── README.md                   # Este documento con las instrucciones completas
```

---

## 🗄️ 3. Base de Datos (SQL y Diagrama ER)

El script SQL completo se encuentra en [`database/schema.sql`](database/schema.sql).

### Entidades y Relaciones:
- **`usuarios`**: Gestión de cuentas, correo único, contraseña cifrada y rol (`estudiante` o `tutor`).
- **`estudiantes`**: Perfil estudiantil e institución académica.
- **`tutores`**: Especialidad, tarifa horaria, modalidad (`virtual`, `presencial`, `ambas`), biografía y reputación.
- **`materias`** y **`tutor_materias`**: Relación de muchos a muchos para clasificar áreas de conocimiento.
- **`disponibilidad_tutor`**: Franjas horarias y días de la semana activos para agendar.
- **`reservas`**: Sesiones pactadas con estado (`pendiente`, `confirmada`, `rechazada`, `completada`, `cancelada`), enlace de videollamada y precio.
- **`resenas`**: Calificación de 1 a 5 estrellas y opiniones de estudiantes.
- **`notificaciones`**: Alertas de confirmación por correo y WhatsApp.

> Consulta [`database/database_diagram.md`](database/database_diagram.md) para visualizar el diagrama gráfico entidad-relación y el diccionario de datos.

---

## 🌐 4. Cómo Probar la Aplicación

No se requiere instalar Node.js ni servidores complejos:
1. Haz doble clic en [`index.html`](index.html) para abrirlo en Google Chrome, Edge o Firefox.
2. O ejecuta un servidor local con Python desde esta carpeta:
   ```bash
   python -m http.server 8000
   ```
   Y abre en tu navegador `http://localhost:8000`.

### Cuentas Demo Rápidas:
- **Estudiante:** `elena@email.com` (o haz clic en el botón *Demo Estudiante* en el login).
- **Tutor:** `ana.garcia@tutorconnect.com` (o haz clic en el botón *Demo Tutor* en el login).