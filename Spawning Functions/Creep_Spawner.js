const Make = {
	Harvester(spawn){
		const Targets = require("Targets");
		const Body_Parts = require("Body_Parts");
		
		let name;

		if(!spawn.spawning){
			name = "Harvester_" + Game.time;
			spawn.spawnCreep(Body_Parts.get(spawn), name, {memory: {role: "harvester",
																state: "SPAWNING",
																Target: "",
																Permanent_Target: "",
																Action: ""}});
		}
	},

	Worker(spawn){
		const Spawn_Role = require("Assign_Spawn_Role");
		const Body_Parts = require("Body_Parts");
		
		let name;

		if(!spawn.spawning){
			name = "Worker_" + Game.time;
			spawn.spawnCreep(Body_Parts.get(spawn), name, {memory: {role: Spawn_Role.Assign(spawn),
																state: "SPAWNING", 
																Target: "", 
																Permanent_Target: "", 
																Action: ""}});
		}
	},

	Miner(spawn){
		const Body_Parts = require("Body_Parts");
		let name;

		if(!spawn.spawning){
			name = "Miner_" + Game.time;
			spawn.spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]/*Body_Parts.get(spawn)*/, name, {memory: {role: "miner",
																state: "SPAWNING", 
																Target: "", 
																Permanent_Target: "", 
																Action: ""}});
		}
	}
};

module.exports = Make;