var datos = [];

function cargarDatos() {
    d3.json('/assets/datos.json', function (err, data) {
        datos = data;
        graficar();
    });
}

function graficar() {
    const W = 300;
    const H = 300;

    var svg = d3.select("body").append("svg")
        .attr("width", W)
        .attr("height", H)
        .append("g")
        .attr("transform", "translate(40,0)");

    var cluster = d3.layout.cluster() //NODOS
        .size([H, W - 160]);

    var diagonal = d3.svg.diagonal() //cuantas lineas van a salir
        .projection(function (d) {
            return [d.y, d.x];
        });

    var nodes = cluster.nodes(datos),
        links = cluster.links(nodes);
    console.log(nodes)

    var link = svg.selectAll(".link") //liga
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        })

    node.append("circle") //circulo
        .attr("r", 4.5);

    node.append("text")
        .attr("dx", function (d) {
            return d.children ? -8 : 8;
        })
        .attr("dy", 3)
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .text(function (d) {
            return d.name;
        });


}