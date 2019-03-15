const Make = {
	Harvester(spawn){
		const Targets = require("Targets");
		
		const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
		const harvesting_spots = spawn.room.memory.roomInfo.E_harvesting_spots;
		let name,
			available_spots = harvesting_spots;

		if(!Targets.Containers(spawn.room, "spawn").length){
			available_spots = spawn.room.memory.roomInfo.sources.length;
		}

		if(!spawn.spawning && harvester_number < available_spots){
			name = "Harvester_" + Game.time;
			spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "harvester",
																state: "SPAWNING",
																Target: "",
																Permanent_Target: "",
																Action: ""}});
		}
	},

	Worker(spawn){
		const Spawn_Role = require("Assign_Spawn_Role");
		
		const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role != "harvester").length;
		let name;

		if(!spawn.spawning && worker_number < 6){
			name = "Worker_" + Game.time;
			spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: Spawn_Role.Assign(spawn),
																state: "SPAWNING", 
																Target: "", 
																Permanent_Target: "", 
																Action: ""}});
		}
	}
};

module.exports = Make;