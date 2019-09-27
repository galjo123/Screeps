const memory = require("memory");

module.exports = creep => {
	if(memory.creeps[creep.name].current_flag == ""){
		memory.creeps[creep.name].state = "IDLE";
	}
};