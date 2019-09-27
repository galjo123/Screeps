const memory = require("memory");
const Target_Assignment = require("Target_Assignment");

module.exports = (creep) => {
	const target = memory.creeps[creep.name].target;
	const target_room = target.room;

	creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "purple"}});
	
	if(target.pos && creep.pos.x == target.pos.x && creep.pos.y == target.pos.y){
		Target_Assignment[creep.memory.role](creep);
	}
};