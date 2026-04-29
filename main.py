from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from routers import auth, usuarios, libros, inventario
from seed import cargar_datos

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
