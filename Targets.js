const Targets = {
	Sources(room, harvester){
		const _ = require("lodash");
		const sourcekeeper_lairs = room.memory.roomInfo.sourcekeeper_lairs;

		let sources = room.find(FIND_SOURCES);

		sourcekeeper_lairs.forEach(sourcekeeper => {
			const guarded_source = sourcekeeper.pos.findClosestByPath(sources);
			_.pull(sources, guarded_source);
		});
		
		if(harvester){
			_.remove(sources, source => {
				let assigned_creeps = 0;
				for(let i in Game.rooms[room.name].find(FIND_MY_CREEPS)){
					const creep = Game.rooms[room.name].find(FIND_MY_CREEPS)[i];
					if(creep.memory.Permanent_Target.id == source.id){
						assigned_creeps++;
					}
				}

				let available_spots = room.memory.roomInfo.spots_per_source[source.id];

				if(room.energyCapacityAvailable < 600 && room.energyCapacityAvailable >= 450 && available_spots > 4){
					available_spots = 4;
				} else if(room.energyCapacityAvailable < 900 && room.energyCapacityAvailable >= 600 && available_spots > 3){
					available_spots = 3;
				} else if(room.energyCapacityAvailable < 1800 && room.energyCapacityAvailable >= 900 && available_spots > 2){
					available_spots = 2;
				} else if(room.energyCapacityAvailable >= 1800 && available_spots > 1){
					available_spots = 1;
				}
				
				if(assigned_creeps >= available_spots){
					return true;
				}
				return false;
			});
		}

		return sources;
	},

	Containers(room, searcher){
		const _ = require("lodash");
		if(searcher == "harvester"){
			let containers;
			containers = room.find(FIND_STRUCTURES, {filter: structure => {
			 		return structure.energy < structure.energyCapacity || (structure.structureType == STRUCTURE_TERMINAL && structure.store.energy <= 5000);
			}});
			
			if(containers.length == 0){
				containers = room.find(FIND_STRUCTURES, {filter: structure => {
					if(structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE){
						return structure.store.energy < structure.storeCapacity;
					}
				}});
			}
			return containers;
		} else if(searcher == "spawn"){
			return _.filter(room.find(FIND_STRUCTURES), structure => structure.structureType == STRUCTURE_CONTAINER ||
																	structure.structureType == STRUCTURE_STORAGE);
		}else if(searcher == "miner"){
			return _.filter(room.find(FIND_STRUCTURES), structure => structure.structureType == STRUCTURE_TERMINAL );
		} else {
			return room.find(FIND_STRUCTURES, {filter: structure => {
				if(structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE){
			 		return structure.store.energy > 0;
			 	}
			}});
		}
	},

	Controller(room){
		return room.controller;
	},

	Construction_Sites(room){
		return room.find(FIND_CONSTRUCTION_SITES);
	},

	Damaged_Structures(room){
		return room.find(FIND_STRUCTURES,{filter: structure => (structure.structureType != STRUCTURE_WALL &&
																structure.structureType != STRUCTURE_RAMPART) && 
																structure.hits <= 0.8 * structure.hitsMax});
	},

	Damaged_Walls(room){
		return room.find(FIND_STRUCTURES,{filter: structure => (structure.structureType == STRUCTURE_WALL ||
																structure.structureType == STRUCTURE_RAMPART) && 
																structure.hits <= 0.001 * structure.hitsMax});
	},

	Towers(room){
		return room.find(FIND_MY_STRUCTURES, {filter: structure => structure.structureType == STRUCTURE_TOWER});
	},

	Enemy_Creeps(room){
		return room.find(FIND_HOSTILE_CREEPS);
	},

	Damaged_Creeps(room){
		const _ = require("lodash");
		return _.filter(room.find(FIND_MY_CREEPS), creep => creep.hits < creep.hitsMax);
	},

	Idle_Flag(room){
		const _ = require("lodash");
		return _.filter(room.find(FIND_FLAGS), flag => flag.color == COLOR_GREY)[0];
	},

	Minerals(room){
		return room.find(FIND_MINERALS);
	}
};

module.exports = Targets;