# XP_Practica

API para practica de sistema de biblioteca hecha con FastAPI y SQLite.

---

## Equipos

| Equipo | Metodologia |
|--------|------|
| Equipo 1 | `PSP` |
| Equipo 2 | `TSP` |
| Equipo 3 | `SCRUM` |
| Equipo 4 | `DAS` |
| Equipo 5 | `DEVOPS` |
| Equipo 6 | `MLOPS` |
| Equipo 7 | `LSD` |
| Equipo 8 | `KANBAN` |
| Equipo 9 | `DDC` |

---
## Cambiar de rama

```bash
# 1. Cambiar a una rama existente
    git checkout nombre-de-la-rama

# 2. verificar la rama en la que estas
    git branch
```
---

## Cómo ejecutar el Backend

```bash

# 1. Clonar repositorio
    git clone [Repo HTTPS Clone]
    cd [folder]
    git branch [branchname]
    git status

# 2. Crear entorno virtual

    #Con Python
    python -m venv venv

    #Con Python 3
    python3 -m venv venv

# 3. Activar entorno virtual

    # Windows:
    venv\Scripts\activate

    # Mac / Linux:
    source venv/bin/activate

# 4. Instalar dependencias

    #Python
    pip install -r requirements.txt

    #Python3
    pip3 install -r requirements.txt

# 5. Correr el servidor
    uvicorn main:app --reload

# 6. Revisar endpoints

    #Abre el navegador y navega a esta dirección:
    http://127.0.0.1:8000/docs

# 7. Detener el servidor

    #Presiona CTRL + C para detener ejecución
    deactivate

```

---

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/registro` | Registrar nuevo usuario |
| POST | `/login` | Iniciar sesión |
| GET | `/usuarios` | Lista de todos los usuarios |
| GET | `/usuarios/{id}` | Ver perfil de usuario |
| GET | `/libros` | Ver todos los libros |
| GET | `/libros/{id}` | Ver información de un libro |
| POST | `/libros` | Agregar libro |
| PUT | `/libros/{id}` | Editar libro |
| GET | `/inventario` | Ver inventario con estado de préstamos |

---

## Estructura del Backend

```
Backend/
├── routers/
│   ├── __init__.py
│   ├── auth.py
│   ├── usuarios.py
│   ├── libros.py
│   └── inventario.py
├── main.py
├── database.py
├── models.py
├── schemas.py
├── seed.py
├── requirements.txt
├── README.md
└── SQLQuery1.sql
```

## Cómo ejecutar el Frontend

```bash
# 1. Entrar en la carpeta
    cd [ruta de tus carpetas]\ Frontend

# 2. Reconstruir modulos de node
    npm i

# 3. Corer el front de forma local
    nmp run dev

# 4. Ver Frontend
    Abre la URL en tu navegador, veras algo como esto: Local: http://localhost:5173/
```
