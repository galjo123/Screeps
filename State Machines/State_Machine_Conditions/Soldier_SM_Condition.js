const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "soldier" ||
		creep.memory.role == "healer"){
		return true;
	} else {
		return false;
	}
};