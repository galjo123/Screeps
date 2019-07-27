module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");

	const target = Game.getObjectById(creep.memory.target.id);

	if(target.energy == target.energyCapacity){
		Target_Assignment.Execute(creep);
		if(creep.carry.energy <= creep.carryCapacity/10){
			creep.memory.state = "RESUPPLY";
		}
		if(creep.memory.target.id == 0){
			creep.memory.state = "IDLE";
		}
	}
};