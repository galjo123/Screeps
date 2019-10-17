const memory = require("memory");
const _ = require("lodash");

const Targets = {

/////SOURCES////////////////////////////////////////////////////////////////////////////////////////////
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
		let sources = Targets.Sources(room);

		_.filter(sources, source => {
			return source.energy > 0;
		});

		return sources;
	},

/////CONTAINERS////////////////////////////////////////////////////////////////////////////////////////////
	Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE;
		});
	},

	Empty_Containers(room){
		const containers = Targets.Containers(room);

		return _.filter(containers, structure => {
			const stored_resources = structure.store.getUsedCapacity();
			return (structure.structureType == STRUCTURE_STORAGE && structure.store.energy < structure.store.getCapacity()/2) ||
					(structure.structureType == STRUCTURE_CONTAINER && stored_resources < structure.store.getCapacity());
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
		const container_development = memory.rooms[room.name].room_development.containers;

		let source_containers = [];

		if(((room.controller && room.controller.my) || Targets.Resource_Colony_Flag(room).length) && container_development){
			const sources = memory.rooms[room.name].static_room_info.sources;
			sources.forEach(source => {
				source_containers.push(source.pos.findClosestByRange(containers));
			});
		}

		return source_containers;
	},

	Filled_Source_Containers(room){
		const source_containers = Targets.Source_Containers(room);
		return _.filter(source_containers, container => {
			return container.store.energy > 0;
		});
	},

	Mineral_Containers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		const containers = _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_CONTAINER;
		});

		let mineral_containers = [];

		if(memory.rooms[room.name].room_development.mine){
			const minerals = memory.rooms[room.name].static_room_info.minerals;
			minerals.forEach(mineral => {
				const appropriate_container = mineral.pos.findClosestByRange(containers);
				mineral_containers.push(appropriate_container);
			});
		}

		return mineral_containers;
	},

	Filled_Mineral_Containers(room){
		const mineral_containers = Targets.Mineral_Containers(room);
		return _.filter(mineral_containers, container => {
			return container.store.getUsedCapacity() > 0;
		});
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
			return container.store.getUsedCapacity() == container.store.getCapacity();
		});
		return source_containers;
	},

/////DROPPED_RESOUCRCES_AND_TOMBSTONES////////////////////////////////////////////////////////////////////////////////////////////
	Dropped_Resources(room){
		const dropped_resources = memory.rooms[room.name].dynamic_room_info.dropped_resources;
		return dropped_resources;
	},

	Full_Tombstones(room){
		const tombstones = memory.rooms[room.name].dynamic_room_info.tombstones;
		return _.filter(tombstones, tombstone => {
			//PLACEHOLDER//const total_resources = _.sum(tombstone.store);
			return tombstone.store.energy > 0;
		});
	},
/////LINKS////////////////////////////////////////////////////////////////////////////////////////////
	Links(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_LINK;
		});
	},
/////SPAWNS_AND_EXTENSIONS////////////////////////////////////////////////////////////////////////////////////////////
	Spawns_And_Extensions(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;

		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_SPAWN ||
					structure.structureType == STRUCTURE_EXTENSION;
		});
	},

	Empty_Spawns_And_Extensions(room){
		const spawns_and_extensions = Targets.Spawns_And_Extensions(room);

		return _.filter(spawns_and_extensions, structure => {
			return structure.store.energy < structure.store.getCapacity(RESOURCE_ENERGY);
		});
	},
/////CONTROLLER////////////////////////////////////////////////////////////////////////////////////////////
	Controller(room){
		return [room.controller];
	},
/////EXTRACTOR////////////////////////////////////////////////////////////////////////////////////////////
	Extractors(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_EXTRACTOR;
		});
	},
/////CONSTRUCTION_SITES////////////////////////////////////////////////////////////////////////////////////////////
	Construction_Sites(room){
		const construction_sites = memory.rooms[room.name].dynamic_room_info.construction_sites;
		return construction_sites;
	},
/////REPAIRS////////////////////////////////////////////////////////////////////////////////////////////
	Maintenance(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= memory.constants.maintenance_constant * structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART &&
					structure.structureType != STRUCTURE_CONTROLLER;
		});
	},

	Critical_Maintenance(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits <= memory.constants.critical_maintenance_constant * structure.hitsMax &&
					structure.structureType != STRUCTURE_WALL &&
					structure.structureType != STRUCTURE_RAMPART &&
					structure.structureType != STRUCTURE_CONTROLLER;
		});
	},

	Damaged_Walls(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		
		return _.filter(structures, structure => {
			return structure.hits < structure.hitsMax &&
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
			return structure.hits < structure.hitsMax &&
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
/////TOWERS////////////////////////////////////////////////////////////////////////////////////////////
	Towers(room){
		const structures = memory.rooms[room.name].dynamic_room_info.structures;
		return _.filter(structures, structure => {
			return structure.structureType == STRUCTURE_TOWER;
		});
	},

	Empty_Towers(room){
		const towers = Targets.Towers(room);
		return _.filter(towers, tower => {
			return tower.store.energy < tower.store.getCapacity(RESOURCE_ENERGY);
		});
	},

	Critically_Empty_Towers(room){
		const towers = Targets.Towers(room);
		return _.filter(towers, tower => {
			return tower.store.energy < tower.store.getCapacity(RESOURCE_ENERGY) * 0.65;
		});
	},
/////CREEPS////////////////////////////////////////////////////////////////////////////////////////////
	My_Damaged_Creeps(room){
		const enemy_creeps = memory.rooms[room.name].dynamic_room_info.my_creeps;
		return _.filter(enemy_creeps, creep => {
			return creep.hits < creep.hitsMax;
		});
	},

	Enemy_Creeps(room){
		const enemy_creeps = memory.rooms[room.name].dynamic_room_info.enemy_creeps;
		return enemy_creeps;
	},
/////ENEMY_STRUCTURES///////////////////////////////////////////////////////////////////////////////////////
	Enemy_Structures(room){
		const enemy_structures = memory.rooms[room.name].dynamic_room_info.enemy_structures;
		return enemy_structures;
	},
/////FLAGS////////////////////////////////////////////////////////////////////////////////////////////
	Idle_Flag(room){
		const flags = memory.rooms[room.name].dynamic_room_info.flags;

		return _.filter(flags, flag => flag.name == "IDLE_FLAG")[0];
	},

	Resource_Colony_Flag(room){
		const flags = memory.rooms[room.name].dynamic_room_info.flags;

		return _.filter(flags, flag => {return flag.color == COLOR_YELLOW && flag.secondaryColor == COLOR_YELLOW;});
	},
};

module.exports = Targets;