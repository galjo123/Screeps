const memory = require("memory");

module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");

	const target = Game.getObjectById(memory.creeps[creep.name].target.id);

	if(target.energy == target.energyCapacity){
		Target_Assignment.Execute(creep);
		if(creep.carry.energy <= creep.carryCapacity/10){
			memory.creeps[creep.name].state = "RESUPPLY";
		}
		if(memory.creeps[creep.name].target.id == 0){
			memory.creeps[creep.name].state = "IDLE";
		}
	}
};