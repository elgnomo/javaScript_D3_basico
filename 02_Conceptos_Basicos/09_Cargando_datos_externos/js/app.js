"use strict"

var datos = [1, 2, 3, 5, 8, 11, 13, 21, 34, 55, 89, 144]

function cargandoDatos() {
    /*
        d3.json('/assets/datos.json', function (err, data) {
            datos = data;
            console.log(datos);
            graficar();
        })
    */
    d3.csv('/assets/datos.csv', function (err, data) {
        datos = data;
        console.log(datos);
        graficar();
    })

}

function graficar() {
    const W = 500;
    const H = 300;

    var svg = d3.select('body')
        .append('svg')
        .attr('width', W)
        .attr('height', H)

    svg.selectAll('rect')
        .data(datos)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 20)
        .attr('height', 100)

        .attr('x', function (d, i) {
            return i * 21 + 30 //ancho de las barrras de 20 mas 1 espacio
        })
        .attr('height', function (d) {
            return d.dato;
        })
        .attr("y", function (d) {
            return H - d.dato; //Altura menos el dato
        })

    svg.selectAll('text')
        .data(datos)
        .enter()
        .append('text')
        .text(function (d) {
            return d.dato;
        })
        .attr('x', function (d, i) {
            return i * 21 + 40;
        })
        .attr('y', function (d) {
            return H - d.dato - 3;
        })

}