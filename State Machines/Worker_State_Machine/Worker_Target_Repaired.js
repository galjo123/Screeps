const memory = require("memory");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	const target = Game.getObjectById(memory.creeps[creep.name].target.id);

	if(memory.creeps[creep.name].action == "repair"){
		if(target && target.hits == target.hitsMax){
			Target_Assignment[creep.memory.role](creep);
		}
	}
};