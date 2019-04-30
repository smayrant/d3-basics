const h = 250;
const w = 600;
const padding = 20;

function getDate(d) {
	// convert date to string
	const strDate = new String(d);
	// retrieve first 4 characters, which correspond to year
	const year = strDate.substr(0, 4);
	// retrieve middle 2 characters, which correspond to month
	const month = strDate.substr(4, 2) - 1;
	// retrieve last 2 characters, which correspond to day
	const day = strDate.substr(6, 2);

	return new Date(year, month, day);
}

function buildLine(ds) {
	const minDate = getDate(ds.monthlySales[0].month);
	const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1].month);

	console.log(minDate);
	console.log(maxDate);
	const xScale = d3.scaleTime().domain([ minDate, maxDate ]).range([ padding + 5, w - padding ]);

	const yScale = d3
		.scaleLinear()
		.domain([
			0,
			d3.max(ds.monthlySales, function(d) {
				return d.sales;
			})
		])
		.range([ h - padding, 10 ]);

	// generate axes
	const yAxisGen = d3.axisLeft(yScale).ticks(7);
	const xAxisGen = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b"));

	const lineFunc = d3
		.line()
		.x(function(d) {
			return xScale(getDate(d.month));
		})
		.y(function(d) {
			return yScale(d.sales);
		});

	const svg = d3.select("body").append("svg").attr("height", h).attr("width", w);

	// add group for axes
	const yAxis = svg.append("g").call(yAxisGen).attr("class", "axis").attr("transform", `translate(${padding}, 0)`);

	const xAxis = svg
		.append("g")
		.call(xAxisGen)
		.attr("class", "axis")
		.attr("transform", `translate(0, ${h - padding})`);

	const viz = svg
		.append("path")
		.attr("d", lineFunc(ds.monthlySales))
		.attr("stroke", "red")
		.attr("stroke-width", 3)
		.attr("fill", "none");
}

function showHeader(dataSet) {
	d3.select("body").append("h1").text(dataSet.category + " Sales (2019)");
}

d3.json("data/MonthlySalesbyCategoryMultiple.json").then(function(data) {
	data.contents.forEach(function(ds) {
		console.log(ds);
		showHeader(ds);
		buildLine(ds);
	});
});
