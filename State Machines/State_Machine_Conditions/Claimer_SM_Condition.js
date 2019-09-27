const memory = require("memory");

module.exports = (creep) => {
	if(creep.memory.role == "claimer"){
		return true;
	} else {
		return false;
	}
};