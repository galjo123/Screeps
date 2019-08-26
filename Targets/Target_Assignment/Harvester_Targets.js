const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		let targets = [];

		if(creep.room.controller.my){
			if(memory.rooms[creep.room.name].room_development.containers){
				const source = Game.getObjectById(creep.memory.permanent_target.id);
				const source_containers = Targets.Source_Containers(source.room);
				const appropriate_container = source.pos.findClosestByRange(source_containers);
				const total_resources = _.sum(appropriate_container.store);

				if(total_resources < appropriate_container.storeCapacity){
					targets = [appropriate_container];
				} else {
					targets = Target_Priority.Get(Global_Targets.Empty_Spawns_And_Extensions(),
											Global_Targets.Semi_Empty_Towers(),
											Global_Targets.Empty_Containers(),
											Global_Targets.Empty_Towers());
				}
			} else {
				targets = Target_Priority.Get(Global_Targets.Empty_Spawns_And_Extensions(),
											Global_Targets.Semi_Empty_Towers(),
											Global_Targets.Empty_Containers(),
											Global_Targets.Empty_Towers());
			}
		} else {
			targets = Target_Priority.Get([creep.pos.findClosestByPath(Targets.Containers(creep.room))]);
		}

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
		memory.creeps[creep.name].target = creep.memory.permanent_target;
		memory.creeps[creep.name].action = "harvest";
	}
		
	if(memory.creeps[creep.name].target == null){
		memory.creeps[creep.name].target = {id: 0};
	}
};