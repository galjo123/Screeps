const Creep_Action = require("Creep_Action");

module.exports = (creep) => {
	Creep_Action[creep.memory.action](creep, Game.getObjectById(creep.memory.target.id));
};