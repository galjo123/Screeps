const Make = {
	Harvester(spawn){
		const Targets = require("Targets");
		const Body_Parts = require("Body_Parts");
		
		const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
		const harvesting_spots = spawn.room.memory.roomInfo.E_harvesting_spots;
		let name,
			available_spots = harvesting_spots;

		if(!Targets.Containers(spawn.room, "spawn").length){
			available_spots = spawn.room.memory.roomInfo.sources.length;
		}

		if(!spawn.spawning && harvester_number < available_spots){
			name = "Harvester";
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
		
		const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role != "harvester").length;
		let name;

		if(!spawn.spawning && worker_number < 6){
			name = "Worker";
			spawn.spawnCreep(Body_Parts.get(spawn), name, {memory: {role: Spawn_Role.Assign(spawn),
																state: "SPAWNING", 
																Target: "", 
																Permanent_Target: "", 
																Action: ""}});
		}
	},

	Soldier(spawn){
		const soldier_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "ranged_soldier").length;
		let name;

		if(!spawn.spawning && soldier_number < 0){
			name = "Soldier";
			spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,MOVE], name, {memory: {role: "ranged_soldier",
																state: "SPAWNING", 
																Target: "", 
																Permanent_Target: "", 
																Action: ""}});
		}
	}
};

module.exports = Make;