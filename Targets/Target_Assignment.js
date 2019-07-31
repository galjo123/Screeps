const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");

const Target_Assignment = {
	Execute(creep){
		switch(memory.creeps[creep.name].role){
			case "harvester":
				if(memory.creeps[creep.name].state == "WORK" || memory.creeps[creep.name].state == "IDLE"){
					//if(Targets.Containers(creep.room)){
				//		creep.memory.target = creep.pos.findClosestByPath(Global_Targets.Containers());
				//	} else {
						const spawns_or_extensions = _.filter(Targets.Spawns_And_Extensions(creep.room), structure => {
							return structure.energy < structure.energyCapacity;
						});
						if(spawns_or_extensions){
							memory.creeps[creep.name].target = creep.pos.findClosestByPath(spawns_or_extensions);
						}
				//	}
					memory.creeps[creep.name].action = "transfer";
				}
				if(memory.creeps[creep.name].state == "RESUPPLY"){
					memory.creeps[creep.name].target = creep.pos.findClosestByPath(/*Global_*/Targets.Sources(creep.room));
					memory.creeps[creep.name].action = "harvest";
				}
		}
		if(memory.creeps[creep.name].target == null){
			memory.creeps[creep.name].target = {id: 0};
		}
	}
};

module.exports = Target_Assignment;