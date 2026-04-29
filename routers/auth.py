from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models
import schemas

router = APIRouter(tags=["Auth"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/registro", response_model=schemas.UsuarioResponse)
def registro(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    """Registrar un nuevo usuario."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    existente = db.query(models.Usuario).filter(
        models.Usuario.correo == usuario.correo
    ).first()
    if existente:
        raise HTTPException(status_code=400, detail="Correo ya registrado")

    nuevo_usuario = models.Usuario(
        nombre=usuario.nombre,
        correo=usuario.correo,
        telefono=usuario.telefono,
    )
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────


@router.post("/login")
def login(credenciales: schemas.LoginRequest, db: Session = Depends(get_db)):
    """Iniciar sesión con correo."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    usuario = db.query(models.Usuario).filter(
        models.Usuario.correo == credenciales.correo
    ).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Login exitoso", "id_usuario": usuario.id_usuario}
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────
