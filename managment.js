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
		const Targets = require("Targets");
		
		do_for.All("spawns", spawn => {
			const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
			const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role != "harvester").length;

			const harvesting_spots = spawn.room.memory.roomInfo.E_harvesting_spots;
			let available_spots = harvesting_spots;

			if(!Targets.Containers(spawn.room, "spawn").length){
				available_spots = spawn.room.memory.roomInfo.sources.length;
			}

			if(!spawn.spawning && harvester_number < available_spots){
				Make.Harvester(spawn);
			} else if(!spawn.spawning && worker_number < 6){
				Make.Worker(spawn);
			} else {
				Make.Soldier(spawn);
			}
			/*function will require a function telling it how many creeps it can spawn max*/
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
				creep.memory.role != "harvester"){
				console.log(creep.memory.role);
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