const memory = require("memory");

module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");

	Target_Assignment.Execute(creep);

	if(memory.creeps[creep.name].target.id != 0){
		switch(memory.creeps[creep.name].role){
			case "harvester":
				if(creep.carry.energy == creep.carryCapacity){
					memory.creeps[creep.name].state = "RESUPPLY";
				} else {
					memory.creeps[creep.name].state = "WORK";
				}
		}
	}
};