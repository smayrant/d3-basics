const canvas = d3.select('.canvas');
const svg = canvas.append('svg')
    .attr('height', 600)
    .attr('width', 600);

// append shapes to svg container
svg.append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

svg.append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

svg.append('line')
    .attr('x1', 380)
    .attr('x2', 380)
    .attr('y1', 20)
    .attr('y2', 125)
    .attr('stroke', 'red')
    .attr('stroke-width', 5)