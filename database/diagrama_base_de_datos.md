# Diseño de Base de Datos - TutorConnect
**Integrantes:** Daniel Barrios, Eduardo Escudero  
**Materia:** Desarrollo Web - Parcial 2  

---

## 1. Diagrama Entidad-Relación (ER)

```mermaid
erDiagram
    USUARIOS ||--o| ESTUDIANTES : "es"
    USUARIOS ||--o| TUTORES : "es"
    USUARIOS ||--o{ NOTIFICACIONES : "recibe"
    
    ESTUDIANTES ||--o{ RESERVAS : "solicita"
    TUTORES ||--o{ RESERVAS : "imparte"
    MATERIAS ||--o{ RESERVAS : "tema_de"
    
    TUTORES ||--o{ DISPONIBILIDAD_TUTOR : "define"
    TUTORES ||--|{ TUTOR_MATERIAS : "enseña"
    MATERIAS ||--|{ TUTOR_MATERIAS : "incluye"
    
    RESERVAS ||--o| RESENAS : "genera"
    ESTUDIANTES ||--o{ RESENAS : "escribe"
    TUTORES ||--o{ RESENAS : "evaluado_en"

    USUARIOS {
        int id PK
        string nombre_completo
        string email UK
        string password_hash
        string telefono
        string ciudad
        string foto_url
        string rol
        boolean activo
        timestamp creado_en
    }

    ESTUDIANTES {
        int id PK
        int usuario_id FK
        string nivel_academico
        string institucion
    }

    TUTORES {
        int id PK
        int usuario_id FK
        string especialidad_principal
        string nivel_educativo
        text biografia
        int experiencia_anos
        decimal precio_hora
        string modalidad
        string direccion_presencial
        decimal calificacion_promedio
        int total_resenas
        boolean disponible_ahora
    }

    MATERIAS {
        int id PK
        string nombre UK
        string categoria
        string icono
    }

    TUTOR_MATERIAS {
        int id PK
        int tutor_id FK
        int materia_id FK
    }

    DISPONIBILIDAD_TUTOR {
        int id PK
        int tutor_id FK
        string dia_semana
        time hora_inicio
        time hora_fin
        boolean activo
    }

    RESERVAS {
        int id PK
        int estudiante_id FK
        int tutor_id FK
        int materia_id FK
        date fecha
        time hora_inicio
        time hora_fin
        string modalidad
        decimal precio
        string estado
        string enlace_videollamada
        string direccion_sesion
        text notas_estudiante
        timestamp creado_en
    }

    RESENAS {
        int id PK
        int reserva_id FK
        int estudiante_id FK
        int tutor_id FK
        int calificacion
        text comentario
        timestamp fecha_resena
    }

    NOTIFICACIONES {
        int id PK
        int usuario_id FK
        string titulo
        text mensaje
        string tipo
        boolean leida
        timestamp creado_en
    }
```

---

## 2. Diccionario de Datos

| Tabla | Descripción | Llave Primaria | Llaves Foráneas |
| :--- | :--- | :--- | :--- |
| **`usuarios`** | Cuenta central de acceso con correo y rol (Estudiante / Tutor). | `id` | - |
| **`estudiantes`** | Datos complementarios del perfil del estudiante. | `id` | `usuario_id` → `usuarios(id)` |
| **`tutores`** | Datos profesionales del tutor (tarifa, modalidad, biografía, reputación). | `id` | `usuario_id` → `usuarios(id)` |
| **`materias`** | Catálogo de asignaturas disponibles para filtrar y reservar. | `id` | - |
| **`tutor_materias`** | Relación de muchos a muchos entre profesores y sus áreas de especialidad. | `id` | `tutor_id`, `materia_id` |
| **`disponibilidad_tutor`** | Franjas horarias y días de la semana en los que el profesor atiende citas. | `id` | `tutor_id` → `tutores(id)` |
| **`reservas`** | Registro de citas agendadas con fecha, hora, estado y enlace de videollamada. | `id` | `estudiante_id`, `tutor_id`, `materia_id` |
| **`resenas`** | Calificación (1 a 5 estrellas) y comentarios otorgados al finalizar la sesión. | `id` | `reserva_id`, `estudiante_id`, `tutor_id` |
| **`notificaciones`** | Alertas emitidas por confirmación, recordatorios o cancelaciones de citas. | `id` | `usuario_id` → `usuarios(id)` |
