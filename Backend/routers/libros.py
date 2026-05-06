from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.database import SessionLocal
import Backend.models as models
import Backend.schemas as schemas

router = APIRouter(prefix="/libros", tags=["Libros"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[schemas.LibroResponse])
def ver_libros(db: Session = Depends(get_db)):
    """Obtener todos los libros."""
    # ── [COMPLETABLE] ── ─────────────────────────────────────────────────────
    return db.query(models.Libro).all()
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────


@router.get("/{id_libro}", response_model=schemas.LibroResponse)
def ver_libro(id_libro: int, db: Session = Depends(get_db)):
    """Ver información de un libro específico."""
    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    libro = db.query(models.Libro).filter(models.Libro.id_libro == id_libro).first()
    if not libro:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    return libro
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────


@router.post("", response_model=schemas.LibroResponse)
def agregar_libro(libro: schemas.LibroCreate, db: Session = Depends(get_db)):
    """Agregar un nuevo libro."""

    # Encontrar o crear autor si se envía el nombre del autor.
    autor_id = libro.id_autor
    if autor_id is not None and autor_id <= 0:
        autor_id = None

    if not autor_id and libro.autor_nombre:
        autor = db.query(models.Autor).filter(models.Autor.nombre == libro.autor_nombre).first()
        if not autor:
            autor = models.Autor(nombre=libro.autor_nombre)
            db.add(autor)
            db.flush()
        autor_id = autor.id_autor

    libro_data = libro.dict(exclude={"autor_nombre"})
    if autor_id is not None:
        libro_data["id_autor"] = autor_id

    nuevo_libro = models.Libro(**libro_data)
    db.add(nuevo_libro)
    db.commit()
    db.refresh(nuevo_libro)
    return nuevo_libro
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────


@router.put("/{id_libro}", response_model=schemas.LibroResponse)
def editar_libro(id_libro: int, libro: schemas.LibroCreate, db: Session = Depends(get_db)):
    """Editar los datos de un libro existente."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    libro_db = db.query(models.Libro).filter(models.Libro.id_libro == id_libro).first()
    if not libro_db:
        raise HTTPException(status_code=404, detail="Libro no encontrado")
    libro_db.titulo           = libro.titulo
    libro_db.id_autor         = libro.id_autor
    libro_db.id_categoria     = libro.id_categoria
    libro_db.isbn             = libro.isbn
    libro_db.anio_publicacion = libro.anio_publicacion
    libro_db.estado           = libro.estado
    db.commit()
    db.refresh(libro_db)
    return libro_db
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────
