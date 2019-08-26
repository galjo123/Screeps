const memory = require("memory");
const _ = require("lodash");

const Targets = {
	Sources(room){
		const sourcekeeper_lairs = memory.rooms[room.name].static_room_info.sourcekeeper_lairs;
		let sources = memory.rooms[room.name].static_room_info.sources;

		sourcekeeper_lairs.forEach(sourcekeeper_lair => {
			const guarded_source = sourcekeeper_lair.pos.findClosestByRange(sources);
			_.pull(sources, guarded_source);
		});

		return sources;
	},

	Full_Sources(room){
		const sourcekeeper_lairs = memory.rooms[room.name].static_room_info.sourcekeeper_lairs;
		let sources = memory.rooms[room.name].static_room_info.sources;

		sourcekeeper_lairs.forEach(sourcekeeper_lair => {
			const guarded_source = sourcekeeper_lair.pos.findClosestByRange(sources);
			_.pull(sources, guarded_source);
		});

		_.filter(sources, source => {
			return source.energy > 0;
		});

		return sources;
	},

	Empty_Source_Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		const containers = _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER;
		});
		let source_containers = [];

		const sources = memory.rooms[room.name].static_room_info.sources;
		sources.forEach(source => {
			source_containers.push(source.pos.findClosestByRange(containers));
		});

		_.remove(source_containers, container => {
			const total_resources = _.sum(container.store);
			return total_resources == container.storeCapacity;
		});
		return source_containers;
	},

	Dropped_Resources(room){
		const dropped_resources = memory.rooms[room.name].dynamic_room_info.dropped_resources;
		return dropped_resources;
	},

	Tombstones(room){
		const tombstones = memory.rooms[room.name].dynamic_room_info.tombstones;
		return _.filter(tombstones, tombstone => {
			//PLACEHOLDER//const total_resources = _.sum(tombstone.store);
			return tombstone.store.energy > 0;
		});
	},
	
	Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE;
		});
	},

	Empty_Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			const stored_resources = _.sum(structure.store);
			return (structure.structureType == STRUCTURE_CONTAINER ||
					(structure.structureType == STRUCTURE_STORAGE && structure.store.energy < structure.storeCapacity/2)) &&
					stored_resources < structure.storeCapacity;
		});
	},

	Full_Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			let stored_energy = 0;
			if(structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE){
				stored_energy = structure.store.energy;
				return stored_energy > 0;
			}
		});
	},

	Source_Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		const containers = _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER;
		});
		let source_containers = [];
		if((room.controller.my || Targets.Resource_Colony_Flag(room).length) && memory.rooms[room.name].room_development.containers){
			const sources = memory.rooms[room.name].static_room_info.sources;
			sources.forEach(source => {
				source_containers.push(source.pos.findClosestByRange(containers));
			});
		}
		return source_containers;

	},
	Links(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_LINK;
		});
	},

	Spawns_And_Extensions(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION;
		});
	},

	Empty_Spawns_And_Extensions(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return (structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION) &&
					structure.energy < structure.energyCapacity;
		});
	},

	Controller(room){
		return [room.controller];
	},

	Construction_Sites(room){
		const construction_sites = memory.rooms[room.name].dynamic_room_info.construction_sites;
		return construction_sites;
	},

	Maintenance(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= memory.constants.maintenance_constant * structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART;
		});
	},

	Critical_Maintenance(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= memory.constants.cricital_maintenance_constant * structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART;
		});
	},

	Damaged_Walls(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= structure.hitsMax &&
					structure.structureType == STRUCTURE_WALL;
		});
	},

	Critical_Damaged_Walls(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= structure.hitsMax * memory.constants.critical_wall_constant &&
					structure.structureType == STRUCTURE_WALL;
		});
	},

	Damaged_Ramparts(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= structure.hitsMax &&
					structure.structureType == STRUCTURE_RAMPART;
		});
	},

	Critical_Damaged_Ramparts(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= structure.hitsMax * memory.constants.critical_rampart_constant &&
					structure.structureType == STRUCTURE_RAMPART;
		});
	},

	Towers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_TOWER;
		});
	},

	Empty_Towers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_TOWER &&
					structure.energy < structure.energyCapacity;
		});
	},

	Semi_Empty_Towers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_TOWER && structure.energy < structure.energyCapacity * 0.6;
		});
	},

	Enemy_Creeps(room){
		const enemy_creeps = memory.rooms[room.name].dynamic_room_info.enemy_creeps;
		return enemy_creeps;
	},

	Idle_Flag(room){
		const flags = memory.rooms[room.name].dynamic_room_info.flags;

		return _.filter(flags, flag => flag.name == "IDLE_FLAG")[0];
	},

	Resource_Colony_Flag(room){
		const flags = memory.rooms[room.name].dynamic_room_info.flags;

		return _.filter(flags, flag => {return flag.color == COLOR_YELLOW && flag.secondaryColor == COLOR_ORANGE;});
	},
};

module.exports = Targets;