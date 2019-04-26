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

const xAxisGroup = graph.append('g')
    // the x axis group is moved to the bottom of the graph
    .attr('transform', `translate(0, ${graphHeight})`)
const yAxisGroup = graph.append('g');

// retrieve data from Firestore DB
db.collection('dishes').get().then(res => {
    let data = [];
    res.docs.forEach(doc => {
        data.push(doc.data())
    })
    // create a linear scale for the y - axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)])
        .range([graphHeight, 0]);

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
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders));

    // create the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(5)
        .tickFormat(d => d + ' orders');

    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    // select text from the x axis group and rotate it -40deg using the text anchor as the end instead of the default middle
    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end')
})