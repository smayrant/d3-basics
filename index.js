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

// select text from the x axis group and rotate it -40deg using the text anchor as the end instead of the default middle
xAxisGroup.selectAll('text')
    .attr('fill', 'orange')
    .attr('transform', 'rotate(-40)')
    .attr('text-anchor', 'end');

const yAxisGroup = graph.append('g')

// scales 
const y = d3.scaleLinear()
    .range([graphHeight, 0]);

const x = d3.scaleBand()
    .range([0, 500])
    .paddingInner(0.2)
    .paddingOuter(0.2)

// create the axes
const xAxis = d3.axisBottom(x);
const yAxis = d3.axisLeft(y)
    .ticks(5)
    .tickFormat(d => d + ' orders');

const t = d3.transition().duration(800);

// update function
const update = (data) => {

    // update scale domains
    y.domain([0, d3.max(data, d => d.orders)]);
    x.domain(data.map(item => item.name));

    //  join the data to the rects
    const rects = graph.selectAll('rect')
        .data(data)

    // remove exit selection
    rects.exit().remove();

    // add attrs to rects already in the DOM
    rects.attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
    // .transition(t)
    // .attr("height", d => graphHeight - y(d.orders))
    // .attr('y', d => y(d.orders));

    // append the enter selection to the DOM
    rects.enter()
        .append('rect')
        .attr('width', x.bandwidth)
        .attr('height', 0)
        .attr('fill', 'orange')
        // ensures the rects have space in between
        .attr('x', d => x(d.name))
        .attr('y', graphHeight)
        .merge(rects)
        .transition(t)
        .attr('y', d => y(d.orders))
        .attr('height', d => graphHeight - y(d.orders))
    // call the axes
    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
};

let data = [];
// retrieve data from Firestore DB
db.collection('dishes').onSnapshot(res => {
    res.docChanges().forEach(change => {

        const doc = { ...change.doc.data(), id: change.doc.id };

        switch (change.type) {
            case 'added':
                data.push(doc);
                break;

            case 'modified':
                const index = data.findIndex(item => item.id == doc.id);
                data[index] = doc;
                break;

            case 'removed':
                data = data.filter(item => item.id !== doc.id);
                break;
            default:
                break;
        }
    });

    update(data)

});

// Tween
const widthTween = (d) => {

    // define interpolation
    // d3.interpolate returns a function which we call 'i'
}