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
			const Targets = require("Targets");
			
			room.memory.roomInfo = new room_info(room);
//////////FOR_DETECTING_CHANGES_IN_ROOM////////////
			room.memory.Counter++;
			if(room.memory.Counter % 3 == 0){
				room.memory.Preavious_Construction_Sites = Targets.Construction_Sites(room);
				room.memory.Preavious_Damaged_Structures = Targets.Damaged_Structures(room);
				room.memory.Counter = 0;
			}
		});

	},
/////////CREEP_SPAWNING//////////////////////////////
	creep_spawning(){
		const Make = require("Creep_Spawner");

		do_for.All("spawns", spawn => {
			Make.Harvester(spawn);
			Make.Worker(spawn);
			/*the function will require when to set what role as in if there are construction sites available make it so creep's role is builder
			the function will require upgrading of creeps
			function will require a function telling it how many creeps it can spawn max
			harvesters require spawning numbers lowered until the room is a bit higher*/
		});
	},
/////////CREEP_ORDERS//////////////////////////////
	creep_action(){
		do_for.All("creeps", creep => {
			const Worker_State_Machine = require ("Worker_State_Machine");
			const Roles = require("Assign_Roles");
			const Targets = require("Targets");
			
///////////////FOR_FINDING_A_CHANGE_IN_THE_NUMBER_OF_CONSTRUCTION_SITES/////////////////////////////////////////
			const current_construction_sites = Targets.Construction_Sites(creep.room);
			const current_damaged_structures = Targets.Damaged_Structures(creep.room);

			if((current_construction_sites.length - creep.room.memory.Preavious_Construction_Sites.length != 0 ||
				current_damaged_structures.length - creep.room.memory.Preavious_Damaged_Structures.length != 0 ) &&
				creep.memory.role != "harvester"){//needs extra conditions!!!!!!(ie. creep death)
				console.log(1);
				Roles.Assign(creep);
			}
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