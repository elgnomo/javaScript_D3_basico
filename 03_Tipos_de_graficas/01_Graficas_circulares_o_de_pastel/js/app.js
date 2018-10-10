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

    var radius = Math.min(W, H) / 2;

    var color = d3.scale.ordinal()
        .range(["Brown", "CadetBlue", "CornflowerBlue", "DarkGoldenRod", "Yellow", "DarkMagenta", "DarkRed", "GreenYellow", "HotPink", "Peru", "Tomato", "Teal", "Salmon"]);

    var arc = d3.svg.arc() //Arcos
        .outerRadius(radius - 10)
        .innerRadius(0);

    var pie = d3.layout.pie() //Nos facilita el computo del JSON
        .value(function (d) {
            return d.dato;
        });

    var svg = d3.select("body").append("svg")
        .attr("width", W)
        .attr("height", H)
        .append("g") //G Agrupar elemento
        .attr("transform", "translate(" + W / 2 + "," + H / 2 + ")"); //orienta del centro

    var g = svg.selectAll(".arc")
        .data(pie(datos))
        .enter().append("g")
        .attr("class", "arc");
    //dibujar
    g.append("path")
        .attr("d", arc) //tipo de grafico
        .style("fill", function (d) {
            return color(d.data.nombre);
        });

    g.append("text")
        .text(function (d) {
            return d.data.nombre + " (" + d.data.dato + ")";
        })
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + "), rotate(" + angle(d) + ")";
        })

    function angle(d) { //angulo como mostrarlo
        var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
        return a > 90 ? a - 180 : a;
    }


}