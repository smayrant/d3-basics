// select svg container
const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// create margins and dimensions
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
// the container's width minus the left and right margins creates the graph's width
const graphWidth = 600 - margin.left - margin.right;
// the container's height minus the top and bottom margins creates the graph's height
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g')
    .attr('width', graphWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margin.left},${margin.top})`)

d3.json('menu.json').then(data => {

    // create a linear scale for the y-axis
    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, 500]);

    const min = d3.min(data, d => d.orders)
    const max = d3.max(data, d => d.orders)

    // create a band scale
    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)
        .paddingOuter(0.2)

    //  join the data to the rects
    const rects = graph.selectAll('rect')
        .data(data)

    // update rects currently in the DOM
    rects.attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', d => x(d.name))

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', d => x(d.name))
})