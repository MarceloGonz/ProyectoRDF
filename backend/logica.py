#!/usr/local/bin/python3.6
from cmath import log
from itertools import count
import json
from tkinter.messagebox import NO
from conexionSparql import ConsultarSparql
from conexionSparql import ConsultarSparqlPersonas
from conexionSpootligth import consultaSpootligth,Cimg


def consultaPersonaje (consulta):
    uriPerson = consultaSpootligth(consulta)
    consultaPersona = ConsultarSparql(uriPerson)
    personasConectadas = ConsultarSparqlPersonas(uriPerson)
    consultaPersona["conectados"]=personasConectadas
    estructura = CrearNodos(consultaPersona)
    file = open("./frotend/datos.json", 'w',encoding="cp1252")
    file.write(estructura)
    file.close()
    return True

def CrearNodos (consultaPersona):
    tipoEnlace = ""
    count = 0
    Estructura={}
    Estructura["nodes"] = []
    Estructura["links"] = []
    NodeP = {}
    if(consultaPersona.get("nombre")!=None):
        NodeP["name"] =consultaPersona["nombre"]["value"]
    
    if(consultaPersona.get("abstract")!=None):
        NodeP["resumen"] =consultaPersona["abstract"]["value"]

    if(consultaPersona.get("nacimiento")!=None):
        NodeP["fechaNacimiento"] =consultaPersona["nacimiento"]["value"]

    if(consultaPersona.get("lugarNacimiento")!=None):
        NodeP["LugarNacimiento"] =consultaPersona["lugarNacimiento"]["value"]
          
    if(consultaPersona.get("imagen")!=None):
        NodeP["photo"] =consultaPersona["imagen"]["value"]

    if(consultaPersona.get("muerte")!=None):
        NodeP["muere"] =consultaPersona["muerte"]["value"]    


    Estructura["nodes"].append(NodeP)
    for row in consultaPersona["conectados"]:
        if(tipoEnlace!=row["callret-2"]["value"]):   
            tipoEnlace=row["callret-2"]["value"]
            count=0
            node = {}
            link = {}
            link["source"] = consultaPersona["nombre"]["value"]
            link["target"] = row["nombre"]["value"]
            tipoEnlace = row["callret-2"]["value"];
            if(row["callret-2"]["value"]=="Link from a Wikipage to another Wikipage"):
                link["nombre"] = "Enlazado por\nWikipedia"
            else:
                link["nombre"] = row["callret-2"]["value"]
            node["name"] = row["nombre"]["value"]
            Estructura["nodes"].append(node)
            Estructura["links"].append(link)
        else:
            count+=1
            if(count<5):
                node = {}
                link = {}
                link["source"] = consultaPersona["nombre"]["value"]
                link["target"] = row["nombre"]["value"]
                tipoEnlace = row["callret-2"]["value"];
                if(row["callret-2"]["value"]=="Link from a Wikipage to another Wikipage"):
                    link["nombre"] = "Enlazado por\nWikipedia"
                else:
                    link["nombre"] = row["callret-2"]["value"]
                if(row.get("imagen")!=None):
                    Cimg(row["imagen"]["value"])
                    node["photo"] = row["imagen"]["value"]
                else:
                    node["photo"] = "img/hot-dog.png"
                node["name"] = row["nombre"]["value"]
                Estructura["nodes"].append(node)
                Estructura["links"].append(link)
                
    json_Estructura = json.dumps(Estructura)

    return json_Estructura

consultaPersonaje("Gabriel Garcia Marquez")