const memory = require("memory");

module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");

	const target = Game.getObjectById(memory.creeps[creep.name].target.id);

	if(creep.memory.role == "harvester" || creep.memory.role == "carrier"){
		let fullness = 0;
		let capacity = 0;

		for(let property in target){
			if(property == "store"){
				const _ = require("lodash");

				fullness = _.sum(target.store);
				capacity = target.storeCapacity;
			}
			if(property == "energy"){
				fullness = target.energy;
				capacity = target.energyCapacity;
			}
		}

		if(fullness == capacity){
			if(creep.carry.energy <= creep.carryCapacity/10){
				memory.creeps[creep.name].state = "RESUPPLY";
			}
			Target_Assignment[creep.memory.role](creep);
			if(memory.creeps[creep.name].target.id == 0){
				memory.creeps[creep.name].state = "IDLE";
			}
		}
	}
};