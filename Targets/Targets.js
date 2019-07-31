const memory = require("memory");

const Targets = {
	Sources(room, harvester){
		const _ = require("lodash");
		const sourcekeeper_lairs = memory.rooms[room.name].static_room_info.sourcekeeper_lairs;
		let sources = memory.rooms[room.name].static_room_info.sources;

		sourcekeeper_lairs.forEach(sourcekeeper_lair => {
			const guarded_source = sourcekeeper_lair.pos.findClosestByRange(sources);
			_.pull(sources, guarded_source);
		});
		
		if(harvester){
			_.remove(sources, source => {
				let assigned_creeps = 0;
				for(let name in Game.creeps){
					const creep = Game.creeps[name];
					if(memory.creeps[creep.name].permanent_target.id == source.id){
						assigned_creeps++;
					}
				}
				if(assigned_creeps >= memory.rooms[room.name].static_room_info.spots_per_source[source.id]){
					return true;
				}
				return false;
			});
		}
		return sources;
	},

	Containers(room){
		const _ = require("lodash");
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE;
		});
	},

	Spawns_And_Extensions(room){
		const _ = require("lodash");
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION;
		});
	},

	Controller(room){
		return room.controller;
	},

	Construction_Sites(room){
		const construction_sites = memory.rooms[room.name].dynamic_room_info.construction_sites;
		return construction_sites;
	},

	Maintenance(room){
		const _ = require("lodash");
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= 0.9 * structure.hitsMax;
		});
	},

	Towers(room){
		const _ = require("lodash");
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => structure.structureType == STRUCTURE_TOWER);
	},

	Enemy_Creeps(room){
		const enemy_creeps = memory.rooms[room.name].dynamic_room_info.enemy_creeps;
		return enemy_creeps;
	},

	Idle_Flag(room){
		const _ = require("lodash");
		const flags = memory.rooms[room.name].dynamic_room_info.flags;

		return _.filter(flags, flag => flag.name == "IDLE_FLAG")[0];
	}
};

module.exports = Targets;