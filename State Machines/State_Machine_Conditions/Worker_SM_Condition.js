const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "harvester" ||
		creep.memory.role == "upgrader" ||
		creep.memory.role == "worker" ||
		creep.memory.role == "carrier" ||
		creep.memory.role == "miner"){
		return true;
	} else {
		return false;
	}
};