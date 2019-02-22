var roleBuilder = {
	run: function(creep){
		if(creep.carry.energy == 0 && creep.memory.state == "working"){
			creep.memory.state = "gathering";
			creep.say("gathering");
		}
		if(creep.carry.energy == creep.carryCapacity && creep.memory.state == "gathering"){
			creep.memory.state = "working";
			creep.say("working");
		}

		if(creep.memory.state == "gathering"){
			var energy_containers = creep.room.find(FIND_SOURCES); //need to make it so it doesn't go to energy sources but containers
			if(creep.harvest(energy_containers[0]) == ERR_NOT_IN_RANGE){
				creep.moveTo(energy_containers[0], {visulaizePathStyle: {stroke: "#ffaa00"}});
			}
		} else {
			//////////////////BUILDING/////////////////////////////////////////
			if(creep.memory.state == "working"){
				var construction_sites = creep.room.find(FIND_CONSTRUCTION_SITES);
				if(construction_sites.length){
					if(creep.build(construction_sites[0]) == ERR_NOT_IN_RANGE){
						creep.moveTo(construction_sites[0], {visualizePathStyle: {stroke: "#ffffff"}});
					}
				} else {
				///////////////UPGRADING///////////////////////////////////	
					var room_controller = creep.room.controller;
					if(creep.memory.state == "working"){
						if(creep.upgradeController(room_controller) == ERR_NOT_IN_RANGE){
							creep.moveTo(room_controller, {visualizePathStyle: {stroke: "#ffffff"}});
						}
					}
				} 
			}
		}
	}
};

module.exports = roleBuilder;