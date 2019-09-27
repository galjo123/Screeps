const Creep_Spawn_Time = {
	Carrier(energy_avaialble){
		let number_of_parts = Math.floor(energy_avaialble/50);
		if(number_of_parts > 50){
			number_of_parts = 50;
		}
		const time_in_ticks = number_of_parts * 3;

		return time_in_ticks;
	}
};

module.exports = Creep_Spawn_Time;