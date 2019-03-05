const do_for = require("do_for_All");

const managment = {

	start_of_tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
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
			const max_creep_number = 3;
			if(!spawn.spawning && spawn.room.memory.roomInfo.my_creeps.length < max_creep_number){
				const name = "Worker_" + Game.time;
				spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "", state: "IDLE", Target: "", Action: ""}});
			}
		});
	},

	creep_action(){
		do_for.All("creeps", creep => {
			const Roles = require("Assign_Roles");
			const Targets = require("Assign_Targets");
			const Worker_State_Machine = require ("Worker_State_Machine");

			Roles.Assign(creep);
			Targets.Assign(creep);
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