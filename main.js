//var roleRepairer = require("role_repairer");
var roleBuilder = require("role_builder");
var roleHarvester = require("role_harvester");
var roleUpgrader = require("role_upgrader");
var creepSpawning = require("creep_spawning");

///////////////////////////////////////////////////////////////////////////////

module.exports.loop = () => {

	var list_of_spawns = Game.spawns;
	var all_creeps = Game.creeps;
	
//////////////////////////////FOR SPAWNING/////////////////////////////////////////

	var E_harvester_number = _.filter(Game.creeps, (creep) => creep.memory.role == "E_harvester").length;
	var Upgrader_number = _.filter(Game.creeps, (creep) => creep.memory.role == "Upgrader").length;
	var Builder_number = _.filter(Game.creeps, (creep) => creep.memory.role == "Builder").length;

    creepSpawning.run(list_of_spawns, E_harvester_number, Upgrader_number, Builder_number);

//////////////////////////////////////////////////////////////////////////////////

	for(var name in Memory.creeps){
		if(!Game.creeps[name]){
			delete Memory.creeps[name];
		}
	}

    for(var name in all_creeps){
    	var creep = all_creeps[name];
    	if(creep.memory.role == "E_harvester"){
    		roleHarvester.run(creep);
    	}
    	if(creep.memory.role == "Upgrader"){
    		roleUpgrader.run(creep);
    	}
    	if(creep.memory.role == "Builder"){
    		roleBuilder.run(creep);
    	}
    }
}

///////////////////////////////////////////////////////////////////////////////
