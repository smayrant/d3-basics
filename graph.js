const dims = { height: 300, width: 300, radius: 150 };
const cent = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

const svg = d3.select('.canvas').append('svg').attr('width', dims.width + 150).attr('height', dims.height + 150);

// graph group
const graph = svg
	.append('g')
	// move group to center of svg container
	.attr('transform', `translate(${cent.x}, ${cent.y}`);

const pie = d3
	.pie()
	// prevent the function from sorting data
	.sort(null)
	// the cost data is used as the value to create the pie angles
	.value((d) => d.cost);

const arcPath = d3.arc().outerRadius(dims.radius);

const update = (data) => {
	console.log(data);
};

// data array
let data = [];

db.collection('expenses').onSnapshot((res) => {
	res.docChanges().forEach((change) => {
		const doc = { ...change.doc.data(), id: change.doc.id };
		switch (change.type) {
			case 'added':
				data.push(doc);
				break;

			case 'modified':
				const index = data.findIndex((item) => item.id == doc.id);
				data[index] = doc;
				break;

			case 'removed':
				data = data.filter((item) => item.id !== doc.id);
				break;
			default:
				break;
		}
	});

	update(data);
});
