const Body_Parts_Array = {
	get(W,C,M){
		let array = [];
		
		for (let i = 0; i < W; i++) {
			array.push("WORK");
		}
		for (let i = 0; i < C; i++) {
			array.push("CARRY");
		}
		for (let i = 0; i < M; i++) {
			array.push("MOVE");
		}
		return array;
	}
};

module.exports = Body_Parts_Array;