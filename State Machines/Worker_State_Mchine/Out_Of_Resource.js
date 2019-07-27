module.exports = (creep) => {
	const _ = require("lodash");
	const Target_Assignment = require("Target_Assignment");

	const total_resources = _.sum(creep.carry);
	if(total_resources == 0){
		creep.memory.state = "RESUPPLY";
		Target_Assignment.Execute(creep);
	}
};