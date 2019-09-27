const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");
const Target_Picker = require("Target_Picker");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		const assigned_room = Game.rooms[creep.memory.permanent_target];
		let targets = [];
		let local_targets = false;

		let local_construction_sites = [];
		let local_critical_maintenance = [];
		let local_critical_damaged_ramparts = [];
		let local_critical_damaged_walls = [];
		let local_maintenance = [];
		let local_damaged_ramparts = [];
		let local_damaged_walls = [];

		if(assigned_room){
			local_construction_sites = Targets.Construction_Sites(assigned_room);
			local_critical_maintenance = Targets.Critical_Maintenance(assigned_room);
			local_critical_damaged_ramparts = Targets.Critical_Damaged_Ramparts(assigned_room);
			local_critical_damaged_walls = Targets.Critical_Damaged_Walls(assigned_room);
			local_maintenance = Targets.Maintenance(assigned_room);
			local_damaged_ramparts = Targets.Damaged_Ramparts(assigned_room);
			local_damaged_walls = Targets.Damaged_Walls(assigned_room);
		}

		const global_construction_sites = Global_Targets.Objects("Construction_Sites");
		const global_critical_maintenance = Global_Targets.Objects("Critical_Maintenance");
		const global_critical_damaged_ramparts = Global_Targets.Objects("Critical_Damaged_Ramparts");
		const global_critical_damaged_walls = Global_Targets.Objects("Critical_Damaged_Walls");
		const global_maintenance = Global_Targets.Objects("Maintenance");
		const global_damaged_ramparts = Global_Targets.Objects("Damaged_Ramparts");
		const global_damaged_walls = Global_Targets.Objects("Damaged_Walls");

		targets = Target_Priority.Get(local_critical_maintenance,
									  local_critical_damaged_ramparts,
									  local_critical_damaged_walls,
									  local_construction_sites,
									  global_critical_maintenance,
									  global_critical_damaged_ramparts,
									  global_critical_damaged_walls,
									  global_construction_sites,
									  local_maintenance,
									  local_damaged_walls,
									  local_damaged_ramparts,
									  global_maintenance,
									  global_damaged_walls,
									  global_damaged_ramparts,
									   Targets.Controller(Game.rooms[creep.memory.room_of_origin]));

		if(!targets[0].hits){
			memory.creeps[creep.name].action = "build";
		} else if(targets[0].hits && targets.structureType != STRUCTURE_CONTROLLER){
			memory.creeps[creep.name].action = "repair";
		} else {
			memory.creeps[creep.name].action = "upgradeController";
		}

		memory.creeps[creep.name].target = Target_Picker.Pick(creep, targets);
	}

	if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		const local_full_containers = Targets.Full_Containers(creep.room);
		const local_full_sources = Targets.Full_Sources(creep.room);

		const global_full_containers = Global_Targets.Objects("Full_Containers");

		const targets = Target_Priority.Get(local_full_containers,
											local_full_sources,
											global_full_containers);

		memory.creeps[creep.name].target = Target_Picker.Pick(creep, targets);
		
		if(local_full_containers.length){
			memory.creeps[creep.name].action = "withdraw";
		} else if(local_full_sources.length){
			memory.creeps[creep.name].action = "harvest";
		} else {
			memory.creeps[creep.name].action = "withdraw";
		}
	}
		
	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};	
	}
};