var w = 1300;
var h = 1000;
var svg = d3.select("body").append("svg").attr({"width":w,"height":h});

var edge = svg.selectAll("line")
      .data(edge)
      .enter()
      .append("line")
      .attr("id",function(d,i) {return 'edge'+i})
      .attr('marker-end','url(#circle)')
      .attr()
      .attr("x1", function(d) { return d.source.x })
      .attr("y1", function(d) { return d.source.y })
      .attr("x2", function(d) { return d.target.x })
      .attr("y2", function(d) { return d.target.y })
      .style("stroke", "rgb(135,206,250)")
      .style("stroke-opacity", "0.4")
      .style("pointer-events", "none");