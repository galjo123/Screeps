var roleHarvester = require("role.harvester");
var creepSpawning = require("creep_spawning");

///////////////////////////////////////////////////////////////////////////////

module.exports.loop = () => {

	var list_of_spawns = Room.find(FIND_MY_SPAWNS);
	var all_creeps = Game.creeps;
	
//////////////////////////////FOR SPAWNING/////////////////////////////////////////

	var E_harvester_number = _.filter(Game.creeps, (creep) => creep.memory.role == "E_harvester");
	var Upgrader_number = _.filter(Game.creeps, (creep) => creep.memory.role == "Upgrader");
	var F_upgrader_number = _.filter(Game.creeps, (creep) => creep.memory.role == "F_upgrader");
	var F_builder_number = _.filter(Game.creeps, (creep) => creep.memory.role == "F_builder");

//////////////////////////////////////////////////////////////////////////////////

    creepSpawning.run(list_of_spawns, E_harvester_number, Upgrader_number, F_upgrader_number, F_builder_number);
}

///////////////////////////////////////////////////////////////////////////////
