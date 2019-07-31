const memory = require("memory");

module.exports = (creep) => {
	const Creep_Action = require("Creep_Action");

	if(Creep_Action[memory.creeps[creep.name].action](creep, Game.getObjectById(memory.creeps[creep.name].target.id)) == -9){
		memory.creeps[creep.name].state = "MOVE";
	}
};