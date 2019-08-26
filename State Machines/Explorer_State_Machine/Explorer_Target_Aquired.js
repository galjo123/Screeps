const memory = require("memory");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	Target_Assignment[creep.memory.role](creep);

	if(memory.creeps[creep.name].target.id != 0){
		memory.creeps[creep.name].state = "EXPLORE";
	}
};