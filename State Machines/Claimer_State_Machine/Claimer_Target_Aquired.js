const memory = require("memory");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	Target_Assignment[creep.memory.role](creep);

	if(memory.creeps[creep.name].target.name || memory.creeps[creep.name].target.id){
		memory.creeps[creep.name].state = "CLAIM";
	}
};