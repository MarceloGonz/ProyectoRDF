import requests
url = 'https://api.dbpedia-spotlight.org/en/annotate?text='
myHeaders = {"accept": "application/json"};
args = { "method": 'GET',
               "headers": myHeaders,
               "cache": 'default' };
def consultaSpootligth (consulta):
    query = url+consulta
    data = requests.get(query,headers=myHeaders) 
    if data.status_code==200:
        respuesta = data.json()
        return(respuesta["Resources"][0]["@URI"])

#consultaSpootligth("Gabriel García Márquez")
