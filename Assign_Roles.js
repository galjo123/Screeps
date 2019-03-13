const Roles = {
	Assign(creep){
		const Targets = require("Targets");
		const harvesting_spots = creep.room.memory.roomInfo.E_harvesting_spots;
		
		console.log(1);
		if(Targets.Construction_Sites(creep.room).length > 0){
			creep.memory.role = "builder";
		} else if(Targets.Damaged_Structures(creep.room).length > 0){
			creep.memory.role = "repairer";
		} else {
			creep.memory.role = "upgrader";
		}
	}
};
module.exports = Roles;