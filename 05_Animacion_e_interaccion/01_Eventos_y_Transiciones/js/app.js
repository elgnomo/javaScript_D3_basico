var datos = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

function graficar() {
    var w = 500;
    var h = 300;

    var svg = d3.select('body')
        .append('svg')
        .attr("width", w)
        .attr("height", h);

    svg.selectAll("rect")
        .data(datos)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", 0)
        .attr("height", 100)

        .attr("x", function (d, i) {
            return i * 21 + 30;
        })

        .attr("height", function (d) {
            return d + 50;
        })

        .attr("y", function (d) {
            return h - d - 50;
        })
        .attr("fill", "blue")


        .on("mouseover", function () {
            d3.select(this)
                .attr("fill", "tomato");
        })

        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", "SteelBlue");
        })

        .transition()
        /*.delay(function (d, i) {
            return i * 100;
        })*/
        .delay(function (d, i) {
            return 100;
        })
        .duration(2000)
        .attr('width', function (d) {
            return 20
        })


    svg.selectAll("text")
        .data(datos)
        .enter()
        .append("text")
        .text(function (d) {
            return d;
        })
        .attr("x", function (d, i) {
            return i * 21 + 40;
        })
        .attr("y", function (d) {
            return h - d - 53;
        })
}