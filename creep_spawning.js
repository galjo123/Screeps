////////////////////USEFUL VARIABLES///////////////////////////////

var E_harvesterMax = 5;
var UpgraderMax = 1;
var F_upgraderMax = 0;
var F_builderMax = 0;

/////////////////////MODULE EXPORT////////////////////////////////

var creepSpawning = {

	run: function(spawnArray, E_harvester_number, Upgrader_number, F_upgrader_number, F_builder_number){
		

		var name = "E_harvester" + Game.time;

		spawnArray[].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "E.harvester"}});
		
		var name = "Upgrader" + Game.time;

		spawnArray[].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "upgrader"}});
		
		var name = "F_upgrader" + Game.time;

		spawnArray[].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "F.upgrader"}});
		
		var name = "F_builder" + Game.time;

		spawnArray[].spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "F.builder"}});
	}

};

module.exports = creepSpawning;