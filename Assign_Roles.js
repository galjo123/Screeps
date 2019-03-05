const Roles = {
	Assign(creep){
		const harvesting_spots = creep.room.memory.roomInfo.E_harvesting_spots;
		const harvester_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
		
		if(harvester_number < harvesting_spots){
			creep.memory.role = "harvester";
		}
	}
};
module.exports = Roles;