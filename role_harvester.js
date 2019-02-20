var roleHarvester = {

	run: function(creep){
		
		if(creep.carry.energy < creep.carryCapacity){
			var sources = creep.room.find(FIND_SOURCES);
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE){
				creep.moveTo(sources[0], {visulaizePathStyle: {stroke: "#ffffff"}});
			}
		} else {
			var empty_energy_containers = creep.room.find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return (structure.structureType == STRUCTURE_SPAWN || 
						structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_TOWER) && 
						structure.energy < structure.energyCapacity;
				}
			});
			if(empty_energy_containers.length > 0){
				if(creep.transfer(empty_energy_containers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
					creep.moveTo(empty_energy_containers[0], {visualizePathStyle: {stroke: "#ffaa00"}});
				}
			}
		}
	}
};

module.exports = roleHarvester;