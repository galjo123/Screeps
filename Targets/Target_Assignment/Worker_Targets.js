const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		let targets = [];

		const global_construction_sites = Global_Targets.Construction_Sites();
		const global_critical_maintenance = Global_Targets.Critical_Maintenance();
		const global_critical_damaged_ramparts = Global_Targets.Critical_Damaged_Ramparts();
		const global_critical_damaged_walls = Global_Targets.Critical_Damaged_Walls();
		const global_maintenance = Global_Targets.Maintenance();
		const global_damaged_ramparts = Global_Targets.Damaged_Ramparts();
		const global_damaged_walls = Global_Targets.Damaged_Walls();

		targets = Target_Priority.Get(global_critical_maintenance,
									  global_critical_damaged_ramparts,
									  global_critical_damaged_walls,
									  global_construction_sites,
									  global_maintenance,
									  global_damaged_walls,
									  global_damaged_ramparts,
									   Targets.Controller(Game.rooms[creep.memory.room_of_origin]));

		if(global_construction_sites.length){
			memory.creeps[creep.name].action = "build";
		} else if(global_critical_maintenance.length ||
				  global_critical_damaged_ramparts.length ||
				  global_critical_damaged_walls.length ||
				  global_maintenance.length ||
				  global_damaged_ramparts.length ||
				  global_damaged_walls.length){

			memory.creeps[creep.name].action = "repair";
		} else {
			memory.creeps[creep.name].action = "upgradeController";
		}

		const targets_in_room = _.filter(targets, target => {
			return target.room.name == creep.room.name;
		});

		if(targets_in_room.length){
			memory.creeps[creep.name].target = creep.pos.findClosestByPath(targets);
		} else {
			memory.creeps[creep.name].target = targets[0];
		}
	}

	if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		const full_containers = Global_Targets.Full_Containers();
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
		
	if(memory.creeps[creep.name].target == null){
		memory.creeps[creep.name].target = {id: 0};	
	}
};