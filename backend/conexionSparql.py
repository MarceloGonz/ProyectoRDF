import  ssl
from SPARQLWrapper import SPARQLWrapper, JSON
import json

ssl . _create_default_https_context  =  ssl . _create_unverified_context 

sparql = SPARQLWrapper(
    "https://dbpedia.org/sparql"
)
sparql.setReturnFormat(JSON)
def ConsultarSparql (uriPerson):
    sparql.setQuery("""
        SELECT * 
        WHERE
        {
        <%s> dbo:abstract ?abstract .
        OPTIONAL {<%s>  dbo:birthDate ?nacimiento.}
        OPTIONAL {<%s> dbo:birthPlace/rdfs:label ?lugarNacimiento. }
        OPTIONAL {<%s> rdfs:label ?nombre.}
        OPTIONAL {<%s> dbo:thumbnail ?imagen.}
        OPTIONAL {<%s> dbo:deathDate ?muerte.}
        FILTER(LANG(?abstract)="es" ||LANG(?abstract)="en")
        FILTER(LANG(?nombre)="en")
        FILTER(LANG(?lugarNacimiento)="en")
        }
        """%(uriPerson,uriPerson,uriPerson,uriPerson,uriPerson,uriPerson)
    )
    try:
        ret = sparql.queryAndConvert()
        for r in ret["results"]["bindings"]:
            return r
    except Exception as e:
        print(e)

def ConsultarSparqlPersonas (uriPerson):
    sparql.setQuery("""
    SELECT DISTINCT  ?p  ?nombre  MIN(?etiqueta)
    WHERE
    {
   <%s> ?o ?p.
   ?o rdfs:label ?etiqueta.
    ?p rdf:type foaf:Person.
    OPTIONAL {?p rdfs:label ?nombre.}
    FILTER(LANG(?nombre)="en")
    FILTER(LANG(?etiqueta)="en")
    }ORDER BY (?p)
        """%(uriPerson)
    )
    try:
        ret = sparql.queryAndConvert()
        listaPersonas = []
        for r in ret["results"]["bindings"]:
            listaPersonas.append(r)
        return listaPersonas
    except Exception as e:
        print(e)


