var urlBase = 'http://127.0.0.1:8000';
/* METODOS GET */ 
export async  function busquedaPersonajes(busqueda)  {
    const respuesta = await fetch(urlBase+
    `/consultarPersonaje/${busqueda}`);
    let validador = await respuesta.json();
    return validador;
}
