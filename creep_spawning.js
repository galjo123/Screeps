////////////////////////PARAMETERES///////////////////////////////

var E_harvesterMax = 1;
var UpgraderMax = 1;
var BuilderMax = 1;

/////////////////////MODULE EXPORT////////////////////////////////

var creepSpawning = {

	run: function(spawnArray, E_harvester_number, Upgrader_number, Builder_number){
		
		if(E_harvester_number < E_harvesterMax){
			var creep_name = "E_harvester_" + Game.time;
			spawnArray["Spawn1"].spawnCreep([WORK,CARRY,MOVE], creep_name, {memory: {role: "E_harvester"}});
		} else
		if(Upgrader_number < UpgraderMax){
			var creep_name = "Upgrader_" + Game.time;
			spawnArray["Spawn1"].spawnCreep([WORK,CARRY,MOVE], creep_name, {memory: {role: "Upgrader", state: "gathering"}});
		} else
		if(Builder_number < BuilderMax){
			var creep_name = "Builder_" + Game.time;
			spawnArray["Spawn1"].spawnCreep([WORK,CARRY,MOVE], creep_name, {memory: {role: "Builder", state: "gathering"}});
		}
	}
};

module.exports = creepSpawning;