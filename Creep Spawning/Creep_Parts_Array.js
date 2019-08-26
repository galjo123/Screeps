const Creep_Parts_Array = {
	Create(move_parts, first_parts, second_parts, additional_parts){
		let parts_array = [];
		if(!second_parts){
			second_parts = {number: 0, type: "move"};
		}
		if(!additional_parts){
			additional_parts = {number: 0, type: "move"};
		}

		if(first_parts.type == "ATTACK" ||
			first_parts.type == "TOUGH" ||
			first_parts.type == "RANGED_ATTACK" ||
			first_parts.type == "HEAL" ||
			!second_parts){
			for(let i = 0; i < first_parts.number + second_parts.number + additional_parts.number; i++){
				if(i < first_parts.number){
					parts_array.push(first_parts.type);
				} else if(i < first_parts.number + second_parts.number){
					parts_array.push(second_parts.type);
				} else {
					parts_array.push(additional_parts.type);
				}
				parts_array.push(move_parts.type);
			}
		} else {
			for(let i = 0; i < first_parts.number + second_parts.number + additional_parts.number; i++){
				if(i < first_parts.number){
					parts_array.push(first_parts.type);
				} else if(i < first_parts.number + second_parts.number){
					parts_array.push(second_parts.type);
				} else {
					parts_array.push(additional_parts.type);
				}
				if(i % 2 == 1){
					parts_array.push(move_parts.type);
				}
				if(i == first_parts.number + second_parts.number + additional_parts.number - 1 &&
				move_parts.number * 2 != first_parts.number + second_parts.number + additional_parts.number){
					parts_array.push(move_parts.type);
				}
			}
		}
		
		return parts_array;
	}
};

module.exports = Creep_Parts_Array;