const Targets = {
	Sources(room, harvester){
		const _ = require("lodash");
		const do_for = require("do_for_All");
		const sourcekeepers = room.memory.roomInfo.sourcekeepers;

		let sources = room.find(FIND_SOURCES);

		sourcekeepers.forEach(sourcekeeper => {
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
				if(assigned_creeps >= room.memory.roomInfo.spots_per_source[source.id]){
					return true;
				}
				return false;
			});
		}

		return sources;
	},

	Containers(room, searcher){
		if(searcher == "harvester"){
			return room.find(FIND_STRUCTURES, {filter: structure => {
			 	if(structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE){
			 		return structure.store.energy < structure.storeCapacity;
			 	} else {
			 		return structure.energy < structure.energyCapacity;
			 	}
			}});
		} else if(searcher == "spawn"){
			return _.filter(room.find(FIND_STRUCTURES), structure => structure.structureType == STRUCTURE_CONTAINER ||
																			structure.structureType == STRUCTURE_STORAGE);
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
		return room.find(FIND_STRUCTURES,{filter: structure => structure.hits <= 0.9 * structure.hitsMax});
	}
};

module.exports = Targets;