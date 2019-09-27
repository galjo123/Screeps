const Run = require("Run");
const Targets = require("Targets");
const memory = require("memory");
const _ = require("lodash");

const Global_Targets = {
	Objects(type){
		let objects_array = [];
		
		Run.All("rooms", room => {
			if((room.controller && room.controller.my) || Targets.Resource_Colony_Flag(room).length){
				objects_array.push(...Targets[type](room));
			}
		});

		return objects_array;
	},
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	Exploration_Flags(){
		let exploration_flags = [];

		Run.All("flags", flag => {
			if(flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_PURPLE){
				exploration_flags.push(flag);
			}
		});
		return exploration_flags;	
	},

	Claim_Flags(){
		let claim_flags = [];

		Run.All("flags", flag => {
			if(flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_RED){
				claim_flags.push(flag);
			}
		});
		return claim_flags;
	},

	Resource_Colony_Flags(){
		let resource_colony_flags = [];

		Run.All("flags", flag => {
			if(flag.color == COLOR_YELLOW && flag.secondaryColor == COLOR_YELLOW){
				resource_colony_flags.push(flag);
			}
		});
		return resource_colony_flags;
	},

	Alpha_Squad_Flags(){
		let alpha_squad_flags = [];

		Run.All("flags", flag => {
			if(flag.color == COLOR_RED && flag.secondaryColor == COLOR_RED){
				alpha_squad_flags.push(flag);
			}
		});
		return alpha_squad_flags;
	},

	Beta_Squad_Flags(){
		let beta_squad_flags = [];

		Run.All("flags", flag => {
			if(flag.color == COLOR_RED && flag.secondaryColor == COLOR_PURPLE){
				beta_squad_flags.push(flag);
			}
		});
		return beta_squad_flags;
	}
};

module.exports = Global_Targets;