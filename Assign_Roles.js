const Roles = {
	Assign(creep){
		const harvesting_spots = creep.room.memory.roomInfo.E_harvesting_spots;
		
		if(upgrader_number == 0 && harvester_number > 0){
			creep.memory.role = "upgrader";
		} else if(harvester_number < harvesting_spots){
			creep.memory.role = "harvester";
		}
	}
};
module.exports = Roles;