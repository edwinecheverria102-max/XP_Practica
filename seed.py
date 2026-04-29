"""
seed.py — carga los datos de ejemplo de SQLQuery1.sql.
Se ejecuta automáticamente desde main.py si la base de datos está vacía.
"""
from datetime import date
from sqlalchemy.orm import Session
import models


def cargar_datos(db: Session):
    # Si ya hay datos no hace nada (evita duplicados al reiniciar el servidor)
    if db.query(models.Autor).first():
        return

    autores = [
        models.Autor(nombre="Gabriel García Márquez", nacionalidad="Colombiana"),
        models.Autor(nombre="Isabel Allende",          nacionalidad="Chilena"),
        models.Autor(nombre="George Orwell",           nacionalidad="Británica"),
        models.Autor(nombre="J.K. Rowling",            nacionalidad="Británica"),
        models.Autor(nombre="Isaac Asimov",            nacionalidad="Estadounidense"),
    ]
    db.add_all(autores)

    categorias = [
        models.Categoria(nombre_categoria="Realismo Mágico"),
        models.Categoria(nombre_categoria="Ciencia Ficción"),
        models.Categoria(nombre_categoria="Fantasía"),
        models.Categoria(nombre_categoria="Distopía"),
        models.Categoria(nombre_categoria="Novela Histórica"),
    ]
    db.add_all(categorias)
    db.commit()

    libros = [
        models.Libro(titulo="Cien años de soledad",               id_autor=1, id_categoria=1, isbn="978-0307474728", anio_publicacion=1967, estado="Disponible"),
        models.Libro(titulo="1984",                               id_autor=3, id_categoria=4, isbn="978-0451524935", anio_publicacion=1949, estado="Rentado"),
        models.Libro(titulo="La casa de los espíritus",           id_autor=2, id_categoria=5, isbn="978-1501117015", anio_publicacion=1982, estado="Disponible"),
        models.Libro(titulo="Harry Potter y la piedra filosofal", id_autor=4, id_categoria=3, isbn="978-8478884452", anio_publicacion=1997, estado="Rentado"),
        models.Libro(titulo="Fundación",                          id_autor=5, id_categoria=2, isbn="978-0553293357", anio_publicacion=1951, estado="Disponible"),
    ]
    db.add_all(libros)

    usuarios = [
        models.Usuario(nombre="Carlos Martínez", correo="carlos.mtz@email.com", telefono="6561234567"),
        models.Usuario(nombre="Lucía Fernández",  correo="lucia.f@email.com",    telefono="6567654321"),
        models.Usuario(nombre="Roberto Gómez",    correo="roberto.g@email.com",  telefono="6569876543"),
        models.Usuario(nombre="Ana Karen Silva",  correo="ana.silva@email.com",  telefono="6561112233"),
        models.Usuario(nombre="Diego Pineda",     correo="diego.p@email.com",    telefono="6564445566"),
    ]
    db.add_all(usuarios)
    db.commit()

    prestamos = [
        models.Prestamo(id_libro=2, id_usuario=1, fecha_devolucion_prevista=date(2026, 5,  5), estatus="Activo"),
        models.Prestamo(id_libro=4, id_usuario=3, fecha_devolucion_prevista=date(2026, 5, 10), estatus="Activo"),
        models.Prestamo(id_libro=1, id_usuario=2, fecha_devolucion_prevista=date(2026, 4, 20), estatus="Devuelto"),
        models.Prestamo(id_libro=3, id_usuario=4, fecha_devolucion_prevista=date(2026, 5,  1), estatus="Activo"),
        models.Prestamo(id_libro=5, id_usuario=5, fecha_devolucion_prevista=date(2026, 4, 15), estatus="Vencido"),
    ]
    db.add_all(prestamos)
    db.commit()

    print("Base de datos cargada con datos de ejemplo.")
