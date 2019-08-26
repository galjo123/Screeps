const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "upgrader" || creep.memory.role == "worker" || creep.memory.role == "carrier"){
		const Target_Assignment = require("Target_Assignment");
		const target = Game.getObjectById(memory.creeps[creep.name].target.id);
	
		if(target.store){
			if(target.store.energy == 0){
				Target_Assignment[creep.memory.role](creep);
				if(memory.creeps[creep.name].target.id == 0){
					memory.creeps[creep.name].state = "IDLE";
				}
			}
		}
	}
};