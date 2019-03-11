const do_for = require("do_for_All");

const managment = {

	start_of_tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
			}
		}
		for(let name in Memory.constructionSites){
			if(!Game.constructionSites[name]){
				delete(Memory.constructionSites[name]);
			}
		}
/////////ROOM_INFO_UPDATE/////////////////////////////
		do_for.All("rooms", room => {
			const room_info = require("room_info");
			room.memory.roomInfo = new room_info(room);
		});
	},
/////////CREEP_SPAWNING//////////////////////////////
	creep_spawning(){
		do_for.All("spawns", spawn => {
			const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
			const upgrader_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "upgrader").length;
			const builder_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "builder").length;
			let name;
			if(!spawn.spawning && harvester_number > 0 && upgrader_number == 0){
			name = "Upgrader_" + Game.time;
			spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "upgrader", state: "SPAWNING", Target: "", Action: ""}});
			} else if(!spawn.spawning && harvester_number < 3){
			name = "Harvester_" + Game.time;
			spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "harvester", state: "SPAWNING", Target: "", Action: ""}});
			} else if(!spawn.spawning && builder_number < 3){
			name = "Builder_" + Game.time;
			spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "builder", state: "SPAWNING", Target: "", Action: ""}});
			}
		});
	},
/////////CREEP_ORDERS//////////////////////////////
	creep_action(){
		do_for.All("creeps", creep => {
			//const Roles = require("Assign_Roles");
			const Worker_State_Machine = require ("Worker_State_Machine");
			
			//const harvester_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
			//const upgrader_number = _.filter(creep.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "upgrader").length;

			/*if(creep.room.memory.roomInfo.my_construction_sites.length > 0 && upgrader_number > 0 && creep.memory.role != "harvester"){
				Roles.Assign(creep);
			}*/
			Worker_State_Machine.run(creep);

		});
	},


	run_each_tick() {

		managment.start_of_tick();
		managment.creep_spawning();
		managment.creep_action();
	}
};

module.exports = managment;