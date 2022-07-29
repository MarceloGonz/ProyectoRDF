from fastapi import FastAPI as fast
#from typing import Dict, Union
from fastapi.middleware.cors import CORSMiddleware
import logica as lg

app = fast()

origins = [
    
    "http://localhost",
    "http://localhost:8080",
    "http://127.0.0.1:5500",
    "http://127.0.0.1",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/consultarPersonaje/{Personaje}")
def consultarPersonaje (Personaje):
    print(Personaje)
    respuesta = lg.consultaPersonaje(Personaje)
    return respuesta


