const memory = require("memory");
const Target_Assignment = require("Target_Assignment");
const Creep_Action = require("Creep_Action");

module.exports = (creep) => {
	const claim_flag = Game.flags[creep.memory.permanent_target];
	const creep_action = memory.creeps[creep.name].action;
	const target = memory.creeps[creep.name].target;

	if(claim_flag && claim_flag.room && creep.room.name == claim_flag.room.name){
		Target_Assignment[creep.memory.role](creep);
		if(Creep_Action[creep_action](creep, target) == -9){
			creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "purple"}});
		} else {
			Creep_Action[creep_action](creep, target);
		}
	} else {
		creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "purple"}});
	}
};