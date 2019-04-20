const canvas = d3.select('.canvas');
const svg = canvas.append('svg')
    .attr('height', 600)
    .attr('width', 600);

const group = svg.append('g')
    .attr('transform', 'translate(20, 100)')

// append shapes to svg container
group.append('rect')
    .attr('width', 200)
    .attr('height', 100)
    .attr('fill', 'blue')
    .attr('x', 20)
    .attr('y', 20);

group.append('circle')
    .attr('r', 50)
    .attr('cx', 300)
    .attr('cy', 70)
    .attr('fill', 'pink');

group.append('line')
    .attr('x1', 380)
    .attr('x2', 380)
    .attr('y1', 20)
    .attr('y2', 125)
    .attr('stroke', 'red')
    .attr('stroke-width', 5);

group.append('text')
    .attr('x', 20)
    .attr('y', 200)
    .attr('fill', 'grey')
    .text('The basics of D3')
    .style('font-size', '45')