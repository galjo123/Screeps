const memory = require("memory");

module.exports = (creep) => {
	const _ = require("lodash");
	const Target_Assignment = require("Target_Assignment");

	const total_resources = _.sum(creep.carry);
	
	if(total_resources == creep.carryCapacity){
		memory.creeps[creep.name].state = "WORK";
		Target_Assignment.Execute(creep);
		if(memory.creeps[creep.name].target.id == 0){
			memory.creeps[creep.name].state = "IDLE";
		}
	}
};