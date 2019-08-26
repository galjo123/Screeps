const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		let targets = [];

		const empty_containers = Global_Targets.Empty_Containers();
		const closest_container = creep.pos.findClosestByPath(empty_containers);
		const appropriate_empty_containers = _.filter(empty_containers, container => {
			return container.id != creep.memory.permanent_target.id;
		});

		targets = Target_Priority.Get(Global_Targets.Empty_Spawns_And_Extensions(),
									  Global_Targets.Semi_Empty_Towers(),
									  appropriate_empty_containers,
									  Global_Targets.Empty_Towers());

		const targets_in_room = _.filter(targets, target => {
			return target.room.name == creep.room.name;
		});

		if(targets_in_room.length){
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(targets);
		} else {
			memory.creeps[creep.name].target = targets[0];
		}
		memory.creeps[creep.name].action = "transfer";
	}
	if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		const target = Game.getObjectById(creep.memory.permanent_target.id);
		const total_resources = _.sum(target.store);
		/*if(Targets.Dropped_Resources(creep.room).length){
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(Targets.Dropped_Resources(creep.room));
			memory.creeps[creep.name].action = "pickup";
		} else */if(Targets.Tombstones(creep.room).length){
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(Targets.Tombstones(creep.room));
			memory.creeps[creep.name].action = "withdraw";
		} else if(total_resources > 0){
			memory.creeps[creep.name].target = creep.memory.permanent_target;
			memory.creeps[creep.name].action = "withdraw";
		} else {
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(Targets.Full_Containers(creep.room));
			memory.creeps[creep.name].action = "withdraw";
		}
	}
		
	if(memory.creeps[creep.name].target == null){
		memory.creeps[creep.name].target = {id: 0};
	}
};