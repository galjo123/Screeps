const Body_Parts = {
	get(spawn){
		const Body_Parts_Array = require("Body_Parts_Array_Creator");
		
		const available_energy = spawn.room.energyAvailable;
		let body_parts;

		switch (available_energy) {
			case 200: 
				body_parts = Body_Parts_Array.get(1,1,1);
				break;
			case 400: 
				body_parts = Body_Parts_Array.get(2,2,2);
				break;
			case 600: 
				body_parts = Body_Parts_Array.get(3,3,3);
				break;
			case 800: 
				body_parts = Body_Parts_Array.get(4,4,4);
				break;
		}
		return body_parts;
	}
};
module.exports = Body_Parts;