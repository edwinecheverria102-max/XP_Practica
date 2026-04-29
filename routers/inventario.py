from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import models

router = APIRouter(prefix="/inventario", tags=["Inventario"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def inventario(db: Session = Depends(get_db)):
    """Ver inventario completo con estado de préstamos activos."""

    # ── [COMPLETABLE] ─────────────────────────────────────────────────────
    libros = db.query(models.Libro).all()
    resultado = []
    for libro in libros:
        prestamo_activo = db.query(models.Prestamo).filter(
            models.Prestamo.id_libro == libro.id_libro,
            models.Prestamo.estatus  == "Activo"
        ).first()
        resultado.append({
            "id_libro":  libro.id_libro,
            "titulo":    libro.titulo,
            "estado":    libro.estado,
            "prestamo_activo": {
                "id_usuario":               prestamo_activo.id_usuario,
                "fecha_devolucion_prevista": prestamo_activo.fecha_devolucion_prevista,
            } if prestamo_activo else None,
        })
    return resultado
    # ── [/COMPLETABLE] ─────────────────────────────────────────────────────
