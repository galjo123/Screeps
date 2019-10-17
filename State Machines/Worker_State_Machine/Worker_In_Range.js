const memory = require("memory");

module.exports = (creep) => {
	const Creep_Action = require("Creep_Action");

	if(Creep_Action[memory.creeps[creep.name].action](creep, Game.getObjectById(memory.creeps[creep.name].target.id)) != -9){
		
		if(creep_store.getUsedCapacity() <= creep.store.getCapacity()){
			memory.creeps[creep.name].state = "WORK";
		}
		if(creep_store.getUsedCapacity() == 0){
			memory.creeps[creep.name].state = "RESUPPLY";
		}
	}
};