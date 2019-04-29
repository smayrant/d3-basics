const h = 400;
const w = 500;

monthlySales = [
    { month: 10, sales: 220 },
    { month: 20, sales: 10 },
    { month: 30, sales: 13 },
    { month: 40, sales: 126 },
    { month: 50, sales: 22 },
    { month: 60, sales: 128 },
    { month: 70, sales: 96 },
    { month: 80, sales: 44 },
    { month: 90, sales: 135 },
    { month: 100, sales: 323 }
];

const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
const lineFunc = d3.svg.line()
    .x(function (d) {
        return d.month * 3;
    })
    .y(function (d) {
        return h - d.sales;
    })
    .interpolate('linear');


const viz = svg
    .append('path')
    .attr('d', lineFunc(monthlySales))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none');

const labels = svg.selectAll('text')
    .data(monthlySales)
    .enter()
    .append('text')
    .text(function (d) {
        return d.sales
    })
    .attr('x', function (d) {
        return d.month * 3 - 10;
    })
    .attr('y', function (d) {
        return h - d.sales;
    })
    .attr('text-anchor', 'middle')