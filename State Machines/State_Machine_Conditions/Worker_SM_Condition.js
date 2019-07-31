const memory = require("memory");

module.exports = (creep) => {
	if(memory.creeps[creep.name].role == "harvester" ||
		memory.creeps[creep.name].role == "upgrader" ||
		memory.creeps[creep.name].role == "builder" ||
		memory.creeps[creep.name].role == "repairer"){
		return true;
	} else {
		return false;
	}
};