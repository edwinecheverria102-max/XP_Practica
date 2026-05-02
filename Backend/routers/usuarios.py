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


@router.get("/{id_usuario}", response_model=schemas.UsuarioResponse)
def ver_perfil(id_usuario: int, db: Session = Depends(get_db)):
    """Ver perfil de un usuario específico."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    usuario = db.query(models.Usuario).filter(
        models.Usuario.id_usuario == id_usuario
    ).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return usuario
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────
