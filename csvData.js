const h = 100;
const w = 400;
let dataSet;
let salesTotal = 0;
let salesAvg = 0;
let metrics = [];

function buildLine() {
	var lineFunc = d3
		.line()
		.x(function(d) {
			return (d.month - 20130001) / 3.25;
		}) // set the x values for the line generator
		.y(function(d) {
			return h - d.sales;
		}); // set the y values for the line generator

	const svg = d3.select('body').append('svg').attr('height', h).attr('width', w);

	const viz = svg
		.append('path')
		.attr('d', lineFunc(dataSet))
		.attr('stroke', 'purple')
		.attr('stroke-width', 3)
		.attr('fill', 'none');
}

function showTotals() {
	// create table
	const table = d3.select('body').append('table');
	// retrieve total
	dataSet.forEach(function(d) {
		const saleNum = parseInt(d.sales, 10);
		salesTotal += saleNum;
	});

	salesAvg = salesTotal / dataSet.length;

	// add metrics to array
	metrics.push(`Sales Total: ${salesTotal}`);
	metrics.push(`Sales Avg: ${salesAvg.toFixed(2)}`);

	// add total to the table
	const tr = table.selectAll('tr').data(metrics).enter().append('tr').append('td').text(function(d) {
		return d;
	});
}

d3.csv('data/MonthlySales.csv').then(function(data) {
	dataSet = data;

	buildLine();
	showTotals();
});
