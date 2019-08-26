const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");

module.exports = (creep) => {
	const exploration_flag = Global_Targets.Exploration_Flags()[0];
	memory.creeps[creep.name].target = exploration_flag;

	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};
	}
};