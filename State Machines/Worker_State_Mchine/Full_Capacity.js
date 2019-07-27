module.exports = (creep) => {
	const _ = require("lodash");
	const Target_Assignment = require("Target_Assignment");

	const total_resources = _.sum(creep.carry);
	if(total_resources == creep.carryCapacity){
		creep.memory.state = "WORK";
		Target_Assignment.Execute(creep);
		if(creep.memory.target.id == 0){
			creep.memory.state = "IDLE";
		}
	}
};