const memory = require("memory");

module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");
	
	Target_Assignment[creep.memory.role](creep);

	if(memory.creeps[creep.name].target.id != 0){
		memory.creeps[creep.name].state = "RESUPPLY";
	}
};