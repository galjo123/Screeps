const Targets = require("Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		memory.creeps[creep.name].target = creep.memory.permanent_target;
		memory.creeps[creep.name].action = "upgradeController";
	}

	if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		const full_containers = Targets.Full_Containers(creep.room);
		const sources = Targets.Full_Sources(creep.room);

		const targets = Target_Priority.Get(full_containers, sources);

		const targets_in_room = _.filter(targets, target => {
			return target.room.name == creep.room.name;
		});

		if(targets_in_room.length){
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(targets);
		} else {
			memory.creeps[creep.name].target = targets[0];
		}
		if(full_containers.length){
			memory.creeps[creep.name].action = "withdraw";
		} else {
			memory.creeps[creep.name].action = "harvest";
		}
	}
		
	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};	
	}
};