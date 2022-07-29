#!/usr/local/bin/python3.6
import json
from conexionSparql import ConsultarSparql
from conexionSparql import ConsultarSparqlPersonas
from conexionSpootligth import consultaSpootligth


def consultaPersonaje (consulta):
    uriPerson = consultaSpootligth(consulta)
    consultaPersona = ConsultarSparql(uriPerson)
    personasConectadas = ConsultarSparqlPersonas(uriPerson)
    consultaPersona["conectados"]=personasConectadas
    estructura = CrearNodos(consultaPersona)
    file = open("./frotend/datos.json", 'w')
    file.write(estructura)
    file.close()
    return True

def CrearNodos (consultaPersona):
    Estructura={}
    Estructura["nodes"] = []
    Estructura["links"] = []
    NodeP = {}
    NodeP["name"] =consultaPersona["nombre"]["value"]
    NodeP["resumen"] =consultaPersona["abstract"]["value"]
    NodeP["fechaNacimiento"] =consultaPersona["nacimiento"]["value"]
    NodeP["LugarNacimiento"] =consultaPersona["lugarNacimiento"]["value"]
    NodeP["photo"] =consultaPersona["imagen"]["value"]
    Estructura["nodes"].append(NodeP)
    for row in consultaPersona["conectados"]:
        node = {}
        link = {}
        link["source"] = consultaPersona["nombre"]["value"]
        link["target"] = row["nombre"]["value"]
        link["nombre"] = row["etiqueta"]["value"]
        node["name"] = row["nombre"]["value"]
        Estructura["nodes"].append(node)
        Estructura["links"].append(link)
        json_Estructura = json.dumps(Estructura)
    return json_Estructura

