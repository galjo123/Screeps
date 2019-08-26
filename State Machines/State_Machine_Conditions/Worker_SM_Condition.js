const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "harvester" ||
		creep.memory.role == "upgrader" ||
		creep.memory.role == "worker" ||
		creep.memory.role == "carrier"){
		return true;
	} else {
		return false;
	}
};