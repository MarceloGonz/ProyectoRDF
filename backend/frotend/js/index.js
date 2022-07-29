import { busquedaPersonajes } from "./ConexionAPI.js";

let data
try {
    data = await fetch("datos.json")
        .then(response => {
            return response.json();
        })
    //document.querySelector("img").setAttribute
} catch (error) {
    
}
if(data!= undefined){
document.querySelector("img").setAttribute("src", data.nodes[0].photo);
let descripcion = `
<h2 id="nombre">${data.nodes[0].name}</h2>
<div class="conDesc">
<h2 id="descripcion"><span>Descripcion:</span> ${data.nodes[0].resumen}</h2>
</div>
<h2 id="nacimiento"><span>Lugar de nacimiento: </span>${data.nodes[0].LugarNacimiento}</h2>
<h2 id="fechaNacimiento"><span>Fecha de nacimineto:</span> ${data.nodes[0].fechaNacimiento}</h2>


`
document.querySelector("#descripcionPersonje").innerHTML+=descripcion;
}



var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener('click', buscar);

async function buscar() {
    let busqueda = document.querySelector("#busquedatxt").value;
    await busquedaPersonajes(busqueda);
    
}


var canvas = d3.select("#network"),
    width = canvas.attr("width"),
    height = canvas.attr("height"),
    ctx = canvas.node().getContext("2d"),
    r = 18,
    color = d3.scaleOrdinal(d3.schemeCategory20),
    simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(r + 18))
        .force("charge", d3.forceManyBody()
            .strength(-1000))
        .force("link", d3.forceLink()
            .id(function (d) { return d.name; }));

d3.json("datos.json", function (err, graph) {
    if (err) throw err;

    simulation.nodes(graph.nodes);
    simulation.force("link")
        .links(graph.links);
    simulation.on("tick", update);

    canvas
        .call(d3.drag()
            .container(canvas.node())
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    function update() {
        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = "#000";
        graph.links.forEach(drawLink);
        ctx.stroke();


        ctx.globalAlpha = 1.0;
        graph.nodes.forEach(drawNode);
    }
    function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
    }

});

function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    console.log(d3.event.subject);

}

function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
}

function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
}

function drawNode(d) {
    ctx.beginPath();
    ctx.fillStyle = color(d.party);
    ctx.moveTo(d.x, d.y);
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.font = "16pt Verdana";
    ctx.strokeStyle = "black";
    ctx.strokeText("", d.x, d.y);
}

function drawLink(l) {
    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 10;


}







