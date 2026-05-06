from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from Backend.database import SessionLocal
import Backend.models as models
import Backend.schemas as schemas

router = APIRouter(prefix="/usuarios", tags=["Usuarios"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("", response_model=list[schemas.UsuarioResponse])
def lista_usuarios(db: Session = Depends(get_db)):
    """Obtener lista de todos los usuarios."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    return db.query(models.Usuario).all()
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────


@router.get("/{id_usuario}")
def ver_perfil(id_usuario: int, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    prestamos = db.query(models.Prestamo).filter(
        models.Prestamo.id_usuario == id_usuario,
        models.Prestamo.estatus == "Activo"
    ).all()

    libros = [
        {
            "titulo": p.libro.titulo,
            "fecha_entrega": p.fecha_devolucion_prevista
        }
        for p in prestamos if p.libro
    ]

    return {
        "nombre_completo": usuario.nombre,
        "fecha_registro": usuario.fecha_registro,
        "correo": usuario.correo,
        "telefono": usuario.telefono,
        "libros_en_posesion": libros
    }

@router.put("/{id_usuario}")
def editar_usuario(id_usuario: int, datos: dict, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    if "correo" in datos:
        usuario.correo = datos["correo"]

    if "telefono" in datos:
        usuario.telefono = datos["telefono"]

    db.commit()
    db.refresh(usuario)

    prestamos = db.query(models.Prestamo).filter(
        models.Prestamo.id_usuario == id_usuario,
        models.Prestamo.estatus == "Activo"
    ).all()

    libros = [
        {
            "titulo": p.libro.titulo,
            "fecha_entrega": p.fecha_devolucion_prevista
        }
        for p in prestamos if p.libro
    ]

    return {
        "nombre_completo": usuario.nombre,
        "fecha_registro": usuario.fecha_registro,
        "correo": usuario.correo,
        "telefono": usuario.telefono,
        "libros_en_posesion": libros
    }