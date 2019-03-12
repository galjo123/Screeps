const Targets = {
	Sources(room){
		return room.find(FIND_SOURCES);
	},

	Containers(room, harvester){
		if(harvester){
			return room.find(FIND_STRUCTURES, {filter: structure => {
			 	if(structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_STORAGE){
			 		return structure.store.energy < structure.storeCapacity;
			 	} else {
			 		return structure.energy < structure.energyCapacity;
			 	}
			}});
		} else { //for stuff that's not harvester
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