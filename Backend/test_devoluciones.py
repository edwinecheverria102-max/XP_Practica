from fastapi.testclient import TestClient
from Backend.main import app

client = TestClient(app)

def test_registrar_devolucion_exitosa():
    # Simulamos que enviamos el ID del libro y el ID del usuario
    response = client.post("/devoluciones/", json={"libro_id": 1, "usuario_id": 101})
    assert response.status_code == 201
    assert response.json() == {"mensaje": "Devolución registrada con éxito"}
