const Roles = {
	Assign(creep){
		const harvesting_spots = creep.room.memory.roomInfo.E_harvesting_spots;
		const harvester_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
		const upgrader_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "upgrader").length;

		/*if(upgrader_number == 0 && harvester_number > 0){
			creep.memory.role = "upgrader";
		} else*/ if(harvester_number < harvesting_spots){
			creep.memory.role = "harvester";
		}
	}
};
module.exports = Roles;