const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "explorer"){
		return true;
	} else {
		return false;
	}
};