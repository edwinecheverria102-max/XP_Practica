from sqlalchemy import Column, Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from Backend.database import Base
from datetime import date, datetime


class Autor(Base):
    __tablename__ = "autores"

    id_autor      = Column(Integer, primary_key=True, index=True)
    nombre        = Column(String(100), nullable=False)
    nacionalidad  = Column(String(50))

    libros = relationship("Libro", back_populates="autor")


class Categoria(Base):
    __tablename__ = "categorias"

    id_categoria      = Column(Integer, primary_key=True, index=True)
    nombre_categoria  = Column(String(50), nullable=False)

    libros = relationship("Libro", back_populates="categoria")


class Libro(Base):
    __tablename__ = "libros"

    id_libro          = Column(Integer, primary_key=True, index=True)
    titulo            = Column(String(150), nullable=False)
    id_autor          = Column(Integer, ForeignKey("autores.id_autor"))
    id_categoria      = Column(Integer, ForeignKey("categorias.id_categoria"))
    isbn              = Column(String(20), unique=True)
    anio_publicacion  = Column(Integer)
    estado            = Column(String(20), default="Disponible")

    autor     = relationship("Autor",    back_populates="libros")
    categoria = relationship("Categoria", back_populates="libros")
    prestamos = relationship("Prestamo", back_populates="libro")


class Usuario(Base):
    __tablename__ = "usuarios"

    id_usuario      = Column(Integer, primary_key=True, index=True)
    nombre          = Column(String(100), nullable=False)
    correo          = Column(String(100), unique=True)
    telefono        = Column(String(15))
    fecha_registro  = Column(Date, default=date.today)

    prestamos = relationship("Prestamo", back_populates="usuario")


class Prestamo(Base):
    __tablename__ = "prestamos"

    id_prestamo               = Column(Integer, primary_key=True, index=True)
    id_libro                  = Column(Integer, ForeignKey("libros.id_libro"))
    id_usuario                = Column(Integer, ForeignKey("usuarios.id_usuario"))
    fecha_salida              = Column(DateTime, default=datetime.utcnow)
    fecha_devolucion_prevista = Column(Date, nullable=False)
    fecha_devolucion_real     = Column(DateTime, nullable=True)
    estatus                   = Column(String(20), default="Activo")

    libro   = relationship("Libro",   back_populates="prestamos")
    usuario = relationship("Usuario", back_populates="prestamos")
