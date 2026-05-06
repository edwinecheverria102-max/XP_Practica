from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


# ── Usuarios ──────────────────────────────────────────────────

class UsuarioCreate(BaseModel):
    nombre:   str
    correo:   str
    telefono: Optional[str] = None


class UsuarioResponse(BaseModel):
    id_usuario:     int
    nombre:         str
    correo:         str
    telefono:       Optional[str]
    fecha_registro: Optional[date]

    class Config:
        from_attributes = True


# ── Auth ──────────────────────────────────────────────────────

class LoginRequest(BaseModel):
    correo: str


# ── Libros ────────────────────────────────────────────────────

class LibroCreate(BaseModel):
    titulo:           str
    autor_nombre:     Optional[str] = None
    id_autor:         Optional[int] = None
    id_categoria:     Optional[int] = None
    isbn:             Optional[str] = None
    anio_publicacion: Optional[int] = None
    estado:           Optional[str] = "Disponible"


class LibroResponse(BaseModel):
    id_libro:         int
    titulo:           str
    isbn:             Optional[str]
    anio_publicacion: Optional[int]
    estado:           str

    class Config:
        from_attributes = True
