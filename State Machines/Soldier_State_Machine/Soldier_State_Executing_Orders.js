const Target_Assignment = require("Target_Assignment");
const memory = require("memory");
const Targets = require("Targets");
const Creep_Action = require("Creep_Action");
const Convert_Initial_To = require ("Convert_Initial_To");

module.exports = creep => {
	const current_flag = Game.flags[memory.creeps[creep.name].current_flag];
	let color = "red";
	if(creep.memory.role == "healer"){
		color = "green";
	}
	const squad_name = Convert_Initial_To.Uppercase(creep.memory.squad);

	const enemy_creeps = Targets.Enemy_Creeps(creep.room);
	//const enemy_structures = Targets.Enemy_Structures(creep.room);////PLACEHOLDER
	const nearest_enemy_creep = creep.pos.findClosestByRange(enemy_creeps);////PLACEHOLDER

	if(current_flag && creep.pos.x == current_flag.pos.x && creep.pos.y == current_flag.pos.y){
		const number = Number(current_flag.name[current_flag.length - 1]);
		const new_flag = squad_name + (number + 1);
		if(Game.flags[new_flag]){
			memory.creeps[creep.name].current_flag = new_flag;
			Target_Assignment[creep.memory.role](creep);
		} else {
			memory.creeps[creep.name].current_flag = "";
		}
	}

	const target = memory.creeps[creep.name].target;
	const creep_action = memory.creeps[creep.name].action;
	
	if(Creep_Action[creep_action](creep, target) == -9 || Creep_Action[creep_action](creep, target) == -7){
			creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: color}});
			if(nearest_enemy_creep && creep.pos.inRangeTo(nearest_enemy_creep, 3)){
   				creep.rangedAttack(nearest_enemy_creep);
   				if(creep.pos.inRangeTo(nearest_enemy_creep, 1)){
   					creep.attack(nearest_enemy_creep);
   				}
			}
		} else {
			if(nearest_enemy_creep && creep.pos.inRangeTo(nearest_enemy_creep, 3)){
   				creep.rangedAttack(nearest_enemy_creep);
   				if(creep.pos.inRangeTo(nearest_enemy_creep, 1)){
   					creep.attack(nearest_enemy_creep);
   				}
			} else {
				Creep_Action[creep_action](creep, target);
				if(!target.my){
					creep.rangedAttack(target);
				}
			}
	}
};