const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Convert_Initial_To = require ("Convert_Initial_To");
const Target_Priority = require("Target_Priority");

module.exports = (creep) => {
	const squad_name = Convert_Initial_To.Uppercase(creep.memory.squad);
	const squad_name_flags = squad_name + "_Squad_Flags";
	const squad_flags = Global_Targets[squad_name_flags]();
	const initiation_flag = _.filter(squad_flags, flag => {
		return flag.name == squad_name + "0";
	});

	const enemy_creeps = Targets.Enemy_Creeps(creep.room);
	const enemy_structures = Targets.Enemy_Structures(creep.room);
	const my_damaged_creeps = Targets.My_Damaged_Creeps(creep.room);

	if(memory.creeps[creep.name].state == "IDLE"){
		if(initiation_flag.length && initiation_flag[0].room.name == creep.room.name){
			const first_flag_name = squad_name + "1";
			memory.creeps[creep.name].current_flag = first_flag_name;
			memory.creeps[creep.name].target = Game.flags[first_flag_name];
			memory.creeps[creep.name].action = "attack";
		} else {
			const targets = Target_Priority.Get(enemy_creeps,
										enemy_structures,
										my_damaged_creeps);
			memory.creeps[creep.name].target = creep.pos.findClosestByRange(targets);
			if(enemy_creeps.length || enemy_structures.length){
				memory.creeps[creep.name].action = "attack";
			} else {
				memory.creeps[creep.name].action = "heal";
			}
		}
	} else if(memory.creeps[creep.name].state == "EXECUTING_ORDERS"){
		const current_flag = Game.flags[memory.creeps[creep.name].current_flag];

		if(current_flag && current_flag.room && creep.room.name == current_flag.room.name){
			const structures_at_flag_pos = creep.room.lookForAt(LOOK_STRUCTURES, current_flag);
			if(structures_at_flag_pos.length){
				memory.creeps[creep.name].target = structures_at_flag_pos[0];
			} else {
				memory.creeps[creep.name].target = current_flag;
			}
		} else {
			memory.creeps[creep.name].target = current_flag;
		}
		memory.creeps[creep.name].action = "attack";
	}
	

	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};
	}
};