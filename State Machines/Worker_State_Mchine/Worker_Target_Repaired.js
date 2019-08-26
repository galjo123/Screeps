const memory = require("memory");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	const target = Game.getObjectById(memory.creeps[creep.name].target.id);

	if(memory.creeps[creep.name].action == "repair"){
		if(target.hits == target.hitsMax){
			creep.memory.permanent_target = {id: 0};
			Target_Assignment[creep.memory.role](creep);
		}
	}
};