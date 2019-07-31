const memory = require("memory");

module.exports = (creep) => {
	if(!creep.spawning){
		memory.creeps[creep.name].state = "IDLE";
	}
};