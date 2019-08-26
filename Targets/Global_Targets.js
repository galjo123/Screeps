const Run = require("Run");
const Targets = require("Targets");
const memory = require("memory");
const _ = require("lodash");

const Global_Targets = {
	Exploration_Flags(){
		let exploration_flags = [];

		for(let name in Game.flags){
			const flag = Game.flags[name];
			if(flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_PURPLE){
				exploration_flags.push(flag);
			}
		}
		return exploration_flags;	
	},

	Full_Containers(){
		let full_containers = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				full_containers.push(...Targets.Full_Containers(room));
			}
		});

		return full_containers;
	},

	Empty_Containers(){
		let empty_containers = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				empty_containers.push(...Targets.Empty_Containers(room));
			}
		});

		return empty_containers;
	},

	Empty_Spawns_And_Extensions(){
		let empty_spawns_and_extensions = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				empty_spawns_and_extensions.push(...Targets.Empty_Spawns_And_Extensions(room));
			}
		});

		return empty_spawns_and_extensions;
	},

	Semi_Empty_Towers(){
		let semi_empty_towers = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				semi_empty_towers.push(...Targets.Semi_Empty_Towers(room));
			}
		});

		return semi_empty_towers;
	},

	Empty_Towers(){
		let empty_towers = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				empty_towers.push(...Targets.Empty_Towers(room));
			}
		});

		return empty_towers;
	},

	Construction_Sites(){
		let construction_sites = [];
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				construction_sites.push(...Targets.Construction_Sites(room));
			}
		});

		return construction_sites;
	},

	Maintenance(){
		let construction_sites = [];
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				construction_sites.push(...Targets.Maintenance(room));
			}
		});

		return construction_sites;
	},

	Critical_Maintenance(){
		let construction_sites = [];
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				construction_sites.push(...Targets.Critical_Maintenance(room));
			}
		});

		return construction_sites;
	},

	Damaged_Ramparts(){
		let damaged_ramparts = [];
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				damaged_ramparts.push(...Targets.Damaged_Ramparts(room));
			}
		});

		return damaged_ramparts;
	},

	Critical_Damaged_Ramparts(){
		let damaged_ramparts = [];
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				damaged_ramparts.push(...Targets.Critical_Damaged_Ramparts(room));
			}
		});

		return damaged_ramparts;
	},

	Damaged_Walls(){
		let damaged_walls = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				damaged_walls.push(...Targets.Damaged_Walls(room));
			}
		});

		return damaged_walls;
	},

	Critical_Damaged_Walls(){
		let damaged_walls = [];
		
		Run.All("rooms", room => {
			if(room.controller.my || Targets.Resource_Colony_Flag(room).length){
				damaged_walls.push(...Targets.Critical_Damaged_Walls(room));
			}
		});

		return damaged_walls;
	}
};

module.exports = Global_Targets;