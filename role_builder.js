var roleBuilder = {
	run: function(creep){
		if(creep.carry.energy == 0 && creep.memory.state == "building"){
			creep.memory.state = "gathering";
			creep.say("gathering");
		}
		if(creep.carry.energy == creep.carryCapacity && creep.memory.state == "gathering"){
			creep.memory.state = "building";
			creep.say("building");
		}

		if(creep.memory.state == "gathering"){
			var energy_containers = creep.room.find(FIND_SOURCES); //need to make it so it doesn't go to energy sources but containers
			if(creep.harvest(energy_containers[0]) == ERR_NOT_IN_RANGE){
				creep.moveTo(energy_containers[0], {visulaizePathStyle: {stroke: "#ffaa00"}});
			}
		} else {
			var construction_sites = creep.room.find(FIND_CONSTRUCTION_SITES);
			if(creep.memory.state == "building"){
				if(creep.build(construction_sites[0]) == ERR_NOT_IN_RANGE){
					creep.moveTo(construction_sites[0], {visualizePathStyle: {stroke: "#ffffff"}});
				}
			}
		}
	}
};

module.exports = roleBuilder;