const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");

module.exports = (creep) => {
	const claim_flag = Game.flags[creep.memory.permanent_target];

	if(creep.room == claim_flag.room){
		const room_controller = claim_flag.room.controller;
		memory.creeps[creep.name].target = room_controller;

		if(claim_flag.color == COLOR_PURPLE){
			memory.creeps[creep.name].action = "claimController";
		} else {
			memory.creeps[creep.name].action = "reserveController";
		}
	} else {
		memory.creeps[creep.name].target = claim_flag;
		memory.creeps[creep.name].action = "reserveController";
	}

	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};
	}
};