const Targets = {
	Sources(room){
		return room.find(FIND_SOURCES);
	},

	Containers(room, harvester){
		const _ = require("lodash");
		if(harvester){
			return room.find(FIND_MY_STRUCTURES, {filter: structure => {
				return structure.structureType == STRUCTURE_CONTAINER ||
			 	structure.energy < structure.energyCapacity;
			}});
				
		} else { //for stuff that's not harvester
			return room.find(FIND_MY_STRUCTURES, {filter: structure => {
				return (structure.structureType == STRUCTURE_CONTAINER ||
					structure.structureType == STRUCTURE_STORAGE) &&
					structure.energy > 0;
			}});
		}
	},

	Controller(room){
		return room.controller;
	},

	Construction_Sites(room){
		return room.find(FIND_CONSTRUCTION_SITES);
	}
};

module.exports = Targets;