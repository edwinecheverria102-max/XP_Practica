from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.database import SessionLocal
from sqlalchemy.exc import IntegrityError
from Backend.database import get_db
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


@router.post("", response_model=schemas.LibroResponse, status_code=201)
def agregar_libro(libro: schemas.LibroCreate, db: Session = Depends(get_db)):
    """Agregar un nuevo libro al sistema."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    try:
        # Pydantic v2 recomienda usar model_dump() en lugar de dict()
        # Si usas Pydantic v1, mantén libro.dict()
        datos_libro = libro.model_dump() if hasattr(libro, 'model_dump') else libro.dict()
        
        nuevo_libro = models.Libro(**datos_libro)
        
        db.add(nuevo_libro)
        db.commit()
        db.refresh(nuevo_libro)
        
        return nuevo_libro
        
    except IntegrityError:
        # Revertimos la transacción si hay un error (ej. ISBN duplicado)
        db.rollback()
        raise HTTPException(status_code=400, detail="El libro ya existe o hay un error de integridad de datos.")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error interno del servidor: {str(e)}")
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
