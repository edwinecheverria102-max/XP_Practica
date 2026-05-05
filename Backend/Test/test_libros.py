from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from Backend.main import app
from Backend.database import Base
from Backend.routers.libros import get_db
import Backend.models as models

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_biblioteca.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def setup_function():
    db = TestingSessionLocal()
    autor = models.Autor(nombre="Gabriel García Márquez", nacionalidad="Colombiana")
    categoria = models.Categoria(nombre_categoria="Realismo Mágico")
    db.add_all([autor, categoria])
    db.commit()

    libro = models.Libro(
        titulo="Cien años de soledad",
        id_autor=autor.id_autor,
        id_categoria=categoria.id_categoria,
        isbn="978-0307474728",
        anio_publicacion=1967,
        estado="Disponible",
    )
    db.add(libro)
    db.commit()
    db.close()


def teardown_function():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def test_ver_libro_existente():
    response = client.get("/libros/1")
    assert response.status_code == 200
    data = response.json()
    assert data["id_libro"] == 1
    assert data["titulo"] == "Cien años de soledad"
    assert data["isbn"] == "978-0307474728"
    assert data["anio_publicacion"] == 1967
    assert data["estado"] == "Disponible"


def test_ver_libro_no_existente():
    response = client.get("/libros/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Libro no encontrado"