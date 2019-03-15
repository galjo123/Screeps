const Spawn_Role = {
	Assign(spawn){
		const Targets = require("Targets");
		
		const repairer_number = _.filter(spawn.room.memory.roomInfo.my_creeps, spawn => spawn.memory.role == "repairer").length;
		const upgrader_number = _.filter(spawn.room.memory.roomInfo.my_creeps, spawn => spawn.memory.role == "upgrader").length;

		const ratio = 0.05;

		if(upgrader_number != 0){
			if(Targets.Damaged_Structures(spawn.room).length > 0 && (repairer_number/spawn.room.find(FIND_STRUCTURES).length <= ratio || repairer_number == 0)){
				return "repairer";
			} else if(Targets.Construction_Sites(spawn.room).length > 0){
				return "builder";
			} else {
				return "upgrader";
			}
		} else {
			return "upgrader";
		}
	}
};

module.exports = Spawn_Role;