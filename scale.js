const scale = d3.scaleLinear().domain([ 130, 350 ]).range([ 10, 100 ]);

console.log(scale(300));
console.log(scale(270));
