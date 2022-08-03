import { busquedaPersonajes } from "./ConexionAPI.js";


window.addEventListener("load",function(){
    console.log("cargando");
    });


let data
try {
    data = await fetch("datos.json")
        .then(response => {
            return response.json();
        })
    //document.querySelector("img").setAttribute
} catch (error) {

}
if (data != undefined) {
    document.querySelector("img").setAttribute("src", data.nodes[0].photo);
    let descripcion = "";
    console.log(data.nodes[0].name);
    if (data.nodes[0].name != undefined) {
        descripcion += `
    <h2 id="nombre">${data.nodes[0].name}</h2>`;
    } if (data.nodes[0].resumen != undefined) {
        descripcion += `<div class="conDesc">
        <h2 id="descripcion"><span>Descripcion:</span> ${data.nodes[0].resumen}</h2>
        </div>`;
    } if (data.nodes[0].LugarNacimiento != undefined) {
        descripcion += `<h2 id="nacimiento"><span>Lugar de nacimiento: </span>${data.nodes[0].LugarNacimiento}</h2>`;
    } if (data.nodes[0].fechaNacimiento != undefined) {
        descripcion += `<h2 id="fechaNacimiento"><span>Fecha de nacimineto:</span> ${data.nodes[0].fechaNacimiento}</h2>`;
    }if (data.nodes[0].muere != undefined) {
        descripcion += `<h2 id="muere"><span>Muere el:</span> ${data.nodes[0].muere}</h2>`;
    }

    document.querySelector("#descripcionPersonje").innerHTML += descripcion;
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
    ctx2 = canvas.node().getContext("2d"),
    r = 40,
    color = d3.scaleOrdinal(d3.schemeCategory20),
    simulation = d3.forceSimulation()
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 3))
        .force("collide", d3.forceCollide(r + 20))
        .force("charge", d3.forceManyBody()
            .strength(-10500))
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
        ctx2.clearRect(0, 0, width, height);
        
        ctx.beginPath();
        //ctx2.beginPath();
        
        ctx.globalAlpha = 0.3;
        ctx.strokeStyle = "#000";
        ctx2.globalAlpha = 0.8;
        graph.links.forEach(element => {
            drawLink(element);
        });
        ctx.stroke();
        ctx2.stroke();
        ctx.globalAlpha = 1.0;
        ctx2.globalAlpha = 1.0;
        graph.nodes.forEach(element => {
            drawNode(element);
        });
    }
    function dragsubject() {
        return simulation.find(d3.event.x, d3.event.y);
    }

});

function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    console.log(d3.event.subject.name);
    document.querySelector("#busquedatxt").value = d3.event.subject.name;

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
    var img = new Image();
    
    img.src=d.photo;
    ctx.beginPath();
    ctx.fillStyle = color(d.party);
    ctx.moveTo(d.x, d.y);
    ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.textAlign = "center"
    ctx.font = "10pt sans-serif";
    ctx.strokeStyle = "black";
    ctx.strokeText(d.name, d.x, d.y+r+15);
    ctx2.drawImage(img,d.x-(r/2), d.y-(r/2),r+15,r+15);
    //ctx2.drawImage(img,d.x, d.y);

}

function drawLink(l) {
    ctx2.fillStyle = "#000";
    ctx2.font = "10pt sans-serif";
    ctx2.fillText(l.nombre, (l.source.x+l.target.x)/2, (l.target.y+l.source.y)/2);

    ctx.moveTo(l.source.x, l.source.y);
    ctx.lineTo(l.target.x, l.target.y);
    ctx.lineWidth = 1;

}







