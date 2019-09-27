const memory = require("memory");

module.exports = (creep) => {
	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].state = "IDLE";
		memory.creeps[creep.name].target = {id: 0};
	} else if(memory.creeps[creep.name].target.id == 0){
		memory.creeps[creep.name].state = "IDLE";
	}
};