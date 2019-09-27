const Target_Assignment = require("Target_Assignment");
const Targets = require("Targets");
const memory = require("memory");
const Creep_Action = require("Creep_Action");

module.exports = creep => {
	Target_Assignment[creep.memory.role](creep);

	const target = memory.creeps[creep.name].target;
	const creep_action = memory.creeps[creep.name].action;
	let color = "red";
	if(creep.memory.role == "healer"){
		color = "green";
	}

	if(target.hits){
		Creep_Action[creep_action](creep, target);
		if(!target.my){
			creep.rangedAttack(target);
		}
		creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: color}});
	}
};