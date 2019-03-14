const Roles = {
	Assign(creep){
		const Targets = require("Targets");
		
		const repairer_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "repairer").length;
		const upgrader_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "upgrader").length;

		const ratio = 0.05;

		if(upgrader_number != 0){
			if(Targets.Damaged_Structures(creep.room).length > 0 && (repairer_number/creep.room.find(FIND_STRUCTURES).length <= ratio || repairer_number == 0)){
				creep.memory.role = "repairer";
			} else if(Targets.Construction_Sites(creep.room).length > 0){
				creep.memory.role = "builder";
			} else {
				creep.memory.role = "upgrader";
			}
		} else {
			creep.memory.role = "upgrader";
		}
	}
};
module.exports = Roles;