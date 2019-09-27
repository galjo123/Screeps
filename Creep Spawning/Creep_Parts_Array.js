const Creep_Parts_Array = {
	Create(){
		let parts_array = [];

		for(let i = 0; i < arguments.length; i++){
			let parts_number = arguments[i].number;
			for(let j = 0; j < parts_number; j++){
				parts_array.push(arguments[i].type);
			}
		}

		return parts_array;
	}
};

module.exports = Creep_Parts_Array;