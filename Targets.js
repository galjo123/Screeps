const Targets = {
	Sources(room){
		return room.find(FIND_SOURCES);
	},

	Containers(room, harvester){
		const _ = require("lodash");
		if(true){
			return _.filter(room.find(FIND_MY_STRUCTURES), structure => structure.energy < structure.energyCapacity);
		} else { //for stuff that's not harvester
			return _.filter(room.find(FIND_MY_STRUCTURES), structure => structure.energy > 0);
		}
	}
};

module.exports = Targets;