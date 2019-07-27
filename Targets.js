const Convert_to_Object = require("Memory_to_Object_Converter");

const Targets = {
	Sources(room, harvester){
		const _ = require("lodash");
		const sourcekeeper_lairs = room.memory.Dynamic_Room_Info.Sourcekeeper_Lairs;
		const sources_as_memory_objects = room.memory.Static_Room_Info.Sources;
		let sources = [];

		Convert_to_Object.Execute(sources_as_memory_objects,sources);

		sourcekeeper_lairs.forEach(sourcekeeper_lair => {
			const guarded_source = sourcekeeper_lair.pos.findClosestByRange(sources);
			_.pull(sources, guarded_source);
		});
		
		if(harvester){
			_.remove(sources, source => {
				let assigned_creeps = 0;
				for(let name in Game.creeps){
					const creep = Game.creeps[name];
					if(creep.memory.Permanent_Target.id == source.id){
						assigned_creeps++;
					}
				}
				if(assigned_creeps >= room.memory.roomInfo.spots_per_source[source.id]){
					return true;
				}
				return false;
			});
		}
		return sources;
	},

	Containers(room){
		const _ = require("lodash");
		const structures_as_memory_objects = room.memory.Dynamic_Room_Info.Structures;
		let structures = [];

		Convert_to_Object.Execute(structures_as_memory_objects, structures);

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE;
		});
	},

	Spawns(room){
		const _ = require("lodash");
		const structures_as_memory_objects = room.memory.Dynamic_Room_Info.Structures;
		let structures = [];

		Convert_to_Object.Execute(structures_as_memory_objects, structures);

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION;
		});
	},

	Controller(room){
		return room.controller;
	},

	Construction_Sites(room){
		const construction_sites_as_memory_objects = room.memory.Dynamic_Room_Info.Construction_Sites;
		let construction_sites = [];

		Convert_to_Object.Execute(construction_sites_as_memory_objects, construction_sites);

		return construction_sites;
	},

	Maintenance(room){
		const _ = require("lodash");
		const structures_as_memory_objects = room.memory.Dynamic_Room_Info.Structures;
		let structures = [];

		Convert_to_Object.Execute(structures_as_memory_objects, structures);

		return _.filter(structures, structure => {
			return structure.hits <= 0.8 * structure.hitsMax;
		});
	},

	Towers(room){
		const _ = require("lodash");
		const structures_as_memory_objects = room.memory.Dynamic_Room_Info.Structures;
		let structures = [];

		Convert_to_Object.Execute(structures_as_memory_objects, structures);

		return _.filter(structures, structure => structure.structureType == STRUCTURE_TOWER);
	},

	Enemy_Creeps(room){
		const enemy_creeps_as_memory_objects = room.memory.Dynamic_Room_Info.Enemy_Creeps;
		let enemy_creeps = [];

		Convert_to_Object.Execute(enemy_creeps_as_memory_objects, enemy_creeps);
		
		return enemy_creeps;
	},

	Idle_Flag(room){
		const _ = require("lodash");
		const flags = room.memory.Dynamic_Room_Info.Flags;

		return _.filter(flags, flag => flag.name == "IDLE_FLAG")[0];
	}
};

module.exports = Targets;