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

    let svg = d3.select("body").append("svg")
        .attr("width", W)
        .attr('height', H)
        .append('g')

    //rango en x

    xRange = d3.scale.linear()
        .range([0, W]) //punto inicial y punto final
        .domain([d3.min(datos, function (d) { //todos los datos en X y Y
                return d.x; //el dato que voy a estar usando
            }),
            d3.max(datos, function (d) {
                return d.x;
            })
        ])

    //elemnytos en y altura
    yRange = d3.scale.linear()
        .range([H, 0]) //punto inicial y punto final
        .domain([d3.min(datos, function (d) { //todos los datos en X y Y
                return d.y; //el dato que voy a estar usando
            }),
            d3.max(datos, function (d) {
                return d.y;
            })
        ])

    //funcion para poder dibujar la linea

    var lineFunc = d3.svg.line() //Se crea con una forma nativa
        .x(function (d) { //donde inicia
            return xRange(d.x + 20);
        })
        .y(function (d) { //donde finaliza
            return yRange(d.y + 16);
        })
        .interpolate('basis') //se pueden agregar

    svg.append("svg:path")
        .attr('d', lineFunc(datos)) //llamamos la funcion line
        .attr("class", 'linea') //agregamos una clase y lo hacemos en css

    //metoso que agrega un x

    var xAxis = d3.svg.axis()
        .scale(xRange)
        .orient("bottom")
        .ticks(8);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30,280)")
        .call(xAxis);

    var yAxis = d3.svg.axis()
        .scale(yRange)
        .orient("left")
        .ticks(6);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(30,-20)")
        .call(yAxis);
}