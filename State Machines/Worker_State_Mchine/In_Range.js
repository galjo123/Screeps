const memory = require("memory");

module.exports = (creep) => {
	const Creep_Action = require("Creep_Action");

	if(Creep_Action[memory.creeps[creep.name].action](creep, Game.getObjectById(memory.creeps[creep.name].target.id)) != -9){
		const total_resources = _.sum(creep.carry);
		
		if(total_resources <= creep.carryCapacity){
			memory.creeps[creep.name].state = "WORK";
		}
		if(total_resources == 0){
			memory.creeps[creep.name].state = "RESUPPLY";
		}
	}
};