const memory = require("memory");

const Creep_Action = require("Creep_Action");

module.exports = (creep) => {
	Creep_Action[memory.creeps[creep.name].action](creep, Game.getObjectById(memory.creeps[creep.name].target.id));
};