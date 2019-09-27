const _ = require("lodash");

const differenceBy = {
	Id(){
		let filtered_object_array = [];
		let filtered_id_array = [];

		const main_object_array = arguments[0];
		for(let j = 0; j < arguments[0].length; j++){
			filtered_id_array.push(main_object_array[j].id);
		}

		for(let i = 1; i < arguments.length; i++){
			let argument_id_array = [];
			for(let j = 0; j < arguments[i].length; j++){
				argument_id_array.push(arguments[i][j].id);
			}
			filtered_id_array = _.difference(filtered_id_array, argument_id_array);
		}

		for(let k = 0; k < filtered_id_array.length; k++){
			filtered_object_array.push(Game.getObjectById(filtered_id_array[k]));
		}

		return filtered_object_array;
	}
};

module.exports = differenceBy;