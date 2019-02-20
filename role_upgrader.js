var roleUpgrader = {
	run: function(creep){
		if(creep.carry.energy == 0 && creep.memory.state == "upgrading"){
			creep.memory.state = "gathering";
			creep.say("gathering");
		}
		if(creep.carry.energy == creep.carryCapacity && creep.memory.state == "gathering"){
			creep.memory.state = "upgrading";
			creep.say("upgrading");
		}

		if(creep.memory.state == "gathering"){
			var energy_containers = creep.room.find(FIND_SOURCES); //need to make it so it doesn't go to energy sources but containers
			if(creep.harvest(energy_containers[0]) == ERR_NOT_IN_RANGE){
				creep.moveTo(energy_containers[0], {visulaizePathStyle: {stroke: "#ffaa00"}});
			}
		} else {
			var room_controller = creep.room.controller;
			if(creep.memory.state == "upgrading"){
				if(creep.upgradeController(room_controller) == ERR_NOT_IN_RANGE){
					creep.moveTo(room_controller, {visualizePathStyle: {stroke: "#ffffff"}});
				}
			}
		}
	}
};

module.exports = roleUpgrader;