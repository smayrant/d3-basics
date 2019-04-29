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
	{ month: 100, sales: 323 },
	{ month: 100, sales: 223 }
];

const salesKPI = (d) => {
	if (d <= 50) {
		return 'red';
	} else if (d <= 150) {
		return 'orange';
	} else {
		return 'blue';
	}
};

const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);

const dots = svg
	.selectAll('circle')
	.data(monthlySales)
	.enter()
	.append('circle')
	.attr('cx', (d) => d.month * 3)
	.attr('cy', (d) => h - d.sales)
	.attr('r', 5)
	.attr('fill', (d) => {
		return salesKPI(d.sales);
	});
