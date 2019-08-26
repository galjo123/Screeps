const memory = require("memory");
const Creep_Action = require("Creep_Action");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	const target = Game.getObjectById(memory.creeps[creep.name].target.id);
	const creep_action = memory.creeps[creep.name].action;

	if(Creep_Action[creep_action](creep, target) == -7){
		Target_Assignment[creep.memory.role](creep);
	}
};