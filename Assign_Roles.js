const Roles = {
	Assign(creep){
		const Targets = require("Targets");
		
		const harvesting_spots = creep.room.memory.roomInfo.E_harvesting_spots;
		const repairer_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "repairer").length;
		const ratio = 0.05;

		console.log(1);
		if(Targets.Damaged_Structures(creep.room).length > 0 && repairer_number/creep.room.find(FIND_STRUCTURES).length <= ratio){
			creep.memory.role = "repairer";
		} else if(Targets.Construction_Sites(creep.room).length > 0){
			creep.memory.role = "builder";
		} else {
			creep.memory.role = "upgrader";
		}
	}
};
module.exports = Roles;