// select svg container
const svg = d3.select('svg');

d3.json('menu.json').then(data => {

    // create a linear scale for the y-axis
    const y = d3.scaleLinear()
        .domain([0, 1000])
        .range([0, 500]);

    //  join the data to the rects
    const rects = svg.selectAll('rect')
        .data(data)

    // update rects currently in the DOM
    rects.attr('width', 50)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', (d, i) => i * 70)

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', 50)
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', (d, i) => i * 70)
})