const memory = require("memory");
const Creep_Action = require("Creep_Action");

module.exports = (creep) => {
	const target = Game.getObjectById(memory.creeps[creep.name].target.id);
	const creep_action = memory.creeps[creep.name].action;
	let path_reusing = 5;
	if(creep.memory.role == "worker" || creep.memory.role == "upgrader"){
		path_reusing = 40;
	}

	if(Creep_Action[creep_action](creep, target) == -9){
		creep.moveTo(target, {reusePath: path_reusing, visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "gold"}});
	} else {
		Creep_Action[creep_action](creep, target);
	}
};