module.exports = (creep) => {
	const Creep_Action = require("Creep_Action");

	if(Creep_Action[creep.memory.action](creep, Game.getObjectById(creep.memory.target.id)) != -9){
		const total_resources = _.sum(creep.carry);
		
		if(total_resources <= creep.carryCapacity){
			creep.memory.state = "WORK";
		}
		if(total_resources == 0){
			creep.memory.state = "RESUPPLY";
		}
	}
};