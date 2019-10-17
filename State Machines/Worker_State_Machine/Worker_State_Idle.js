const Targets = require("Targets");
const memory = require("memory");

module.exports = (creep) => {
	const idle_flag = Targets.Idle_Flag(creep.room);
	const permanent_target = Game.getObjectById(creep.memory.permanent_target.id);

	if(creep.memory.role == "harvester"){
		creep.moveTo(permanent_target, {visualizePathStyle: {stroke: "aaffff", opacity: 0.4, color: "white"}});
	} else if(idle_flag){
		if(creep.pos.x != idle_flag.pos.x || creep.pos.y != idle_flag.pos.y) {
			creep.moveTo(idle_flag, {visualizePathStyle: {stroke: "aaffff", opacity: 0.4, color: "white"}});
		}
	}
};