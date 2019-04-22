const Body_Parts = {
	get(spawn){
		const Body_Parts_Array = require("Body_Parts_Array_Creator");
		
		let available_energy = spawn.room.energyAvailable;
		let body_parts;

		if(available_energy >= 200){
			let w = Math.floor(available_energy/2/100);
			available_energy -= w * 100;
			let m = Math.floor(available_energy/2/50);
			available_energy -= m * 50;
			let c = Math.floor(available_energy/50);
			if(w > 11){
				w = 11;
			}
			if(c > 11){
				c = 10;
			}
			if(m > 11){
				m = 11;
			}

			body_parts = Body_Parts_Array.get(w,c,m);
		}

		return body_parts;
	}
};
module.exports = Body_Parts;