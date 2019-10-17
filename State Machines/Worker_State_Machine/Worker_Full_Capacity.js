const memory = require("memory");

module.exports = (creep) => {
	const _ = require("lodash");
	const Target_Assignment = require("Target_Assignment");

	if(creep.store.getUsedCapacity() == creep.store.getCapacity()){
		memory.creeps[creep.name].state = "WORK";
		Target_Assignment[creep.memory.role](creep);
		if(memory.creeps[creep.name].target.id == 0){
			memory.creeps[creep.name].state = "IDLE";
		}
	}
};