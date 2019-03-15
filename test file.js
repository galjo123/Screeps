const M = 4,
	  C = 4,
	  W = 4;
let body_parts_array = [];

for (let i = 0; i < W; i++) {
	body_parts_array.push("WORK");
}
for (let i = 0; i < C; i++) {
	body_parts_array.push("CARRY");
}
for (let i = 0; i < M; i++) {
	body_parts_array.push("MOVE");
}
console.log(body_parts_array);