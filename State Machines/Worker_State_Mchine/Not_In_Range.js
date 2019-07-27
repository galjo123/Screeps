module.exports = (creep) => {
	const Creep_Action = require("Creep_Action");

	if(Creep_Action[creep.memory.action](creep, Game.getObjectById(creep.memory.target.id)) == -9){
		creep.memory.state = "MOVE";
	}
};