from fastapi import APIRouter, status

router = APIRouter()

@router.post("/devoluciones/", status_code=status.HTTP_201_CREATED)
async def registrar_devolucion(data: dict):
    return {"mensaje": "Devolución registrada con éxito"}
