const memory = require("memory");

module.exports = (creep) => {
	const _ = require("lodash");
	const Target_Assignment = require("Target_Assignment");

	//PLACEHOLDER//const total_resources = _.sum(creep.carry);
	if(creep.carry.energy == 0){
		memory.creeps[creep.name].state = "RESUPPLY";
		Target_Assignment[creep.memory.role](creep);
	}
};