from Backend.routers import auth, inventario, libros
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend.database import engine, Base, SessionLocal
from Backend.routers import usuarios
from Backend.seed import cargar_datos

Base.metadata.create_all(bind=engine)

db = SessionLocal()
cargar_datos(db)
db.close()

app = FastAPI(title="XP_Practica")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(usuarios.router)
app.include_router(libros.router)
app.include_router(inventario.router)
