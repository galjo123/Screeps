
const Run = require("Run");
const memory = require("memory");

const Managment = {

	Start_of_Tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
				delete(memory.creeps[name]);
			}
		}
/////////ROOM_INFO_UPDATE/////////////////////////////
		const room_object = require("room_object");
		const dynamic_room_info = require("dynamic_room_info");
		const Targets = require("Targets");

		Run.All("rooms", room => {
			if(!memory.rooms[room.name]){
				memory.rooms[room.name] = new room_object(room);
			}

			memory.rooms[room.name].dynamic_room_info = new dynamic_room_info(room);
			
//////////FOR_DETECTING_CHANGES_IN_ROOM////////////
			/*memory.rooms[room.name].counter++;
			if(memory.rooms[room.name].counter % 2 == 0){
				memory.rooms[room.name].preavious_construction_sites = Targets.Construction_Sites(room);
				memory.rooms[room.name].preavious_damaged_structures = Targets.Maintenance(room);
				memory.rooms[room.name].counter = 0;
			}*///AN EXAMPLE OF HOW TO DETECT CHANGE

			const Room_Development_Checker = require("Room_Development_Checker");
			Room_Development_Checker.Run(room);
		});
//////////FOR_CREATING_FLAG_OBJECTS/////////////////////////
		Run.All("flags", flag => {
			if(!flag.memory.room_ownership){
				const creep_name = memory.rooms[flag.room.name].dynamic_room_info.my_creeps[0].name;
				if(creep_name){
					flag.memory.room_ownership = Game.creeps[creep_name].memory.room_of_origin;
				}
			}
		});
/////////FOR_CREATING_CREEP_OBJECTS/////////////////////////
		const creep_object = require("creep_object");

		Run.All("creeps", creep => {
			if(!memory.creeps[creep.name]){
				memory.creeps[creep.name] = new creep_object();
			}
		});
	},

	Structure_Orders(){
		const Targets = require("Targets");
		const Target_Priority = require("Target_Priority");

		Run.All("rooms", room =>{
			for(let id in Targets.Towers(room)){
				const tower = Targets.Towers(room)[id];

				if(Targets.Enemy_Creeps(room).length){
					const enemy_creep = tower.pos.findClosestByRange(Targets.Enemy_Creeps(room));
					tower.attack(enemy_creep);
				} else if(Targets.My_Damaged_Creeps(room).length){
					const my_damaged_creep = tower.pos.findClosestByRange(Targets.My_Damaged_Creeps(room));
					tower.heal(my_damaged_creep);
				} else if((Targets.Maintenance(room).length ||
						   Targets.Critical_Damaged_Ramparts(room).length ||
						   Targets.Damaged_Walls(room).length) &&
						  tower.energy > tower.energyCapacity/2) {

					const damaged_structures = Target_Priority.Get(Targets.Maintenance(room), Targets.Critical_Damaged_Ramparts(room), Targets.Damaged_Walls(room));
					const damaged_structure = tower.pos.findClosestByRange(damaged_structures);

					if(damaged_structures[0].structureType == STRUCTURE_WALL){
						if(tower.energy > tower.energyCapacity * 3/4){
							tower.repair(damaged_structure);
						}
					} else {
						tower.repair(damaged_structure);
					}
				}
			}
		});
	},
/////////CREEP_SPAWNING//////////////////////////////
	Creep_Spawning(){
		const Spawn_Creeps = require("Spawn_Creeps");

		Spawn_Creeps.Explorers();
		Spawn_Creeps.Soldiers();
		Spawn_Creeps.Claimers();
		Spawn_Creeps.Workers();
		Spawn_Creeps.Carriers();
		Spawn_Creeps.Upgraders();
		Spawn_Creeps.Harvesters();
	},
/////////STATE_MACHINE_ACTIVATION//////////////////////////////
	State_Machine(State_Machine_Name, objects){
		Run.All(objects , object => {
			const State_Machine_Condition = require("State_Machine_Condition");

			if(State_Machine_Condition[State_Machine_Name](object)){
				const State_Machine = require(State_Machine_Name);
				const object_array = memory[objects];
				
				const State = State_Machine[object_array[object.name].state];

				for(let funq in State){
					State[funq](object);
				}
			}
		});
	},

	Run_Each_Tick() {
		Managment.Start_of_Tick();
		Managment.Structure_Orders();
		Managment.Creep_Spawning();
		Managment.State_Machine("Soldier_State_Machine", "creeps");
		Managment.State_Machine("Worker_State_Machine", "creeps");
		Managment.State_Machine("Explorer_State_Machine", "creeps");
		Managment.State_Machine("Claimer_State_Machine", "creeps");
//console.log("--------------------------------------------");
		/*Run.All("creeps", creep => {
			if(creep.memory.role == "carrier" && creep.room.name == "E21N25"){
				console.log(memory.creeps[creep.name].state, memory.creeps[creep.name].action);
				console.log(memory.creeps[creep.name].target.structureType);
				console.log(memory.creeps[creep.name].target.id);
			}
		});*/

		/*const Targets = require("Targets");
		console.log(Targets.Critical_Maintenance(Game.rooms.E21N25));*/
		//const Global_Targets = require("Global_Targets");
		/*if(Targets.Tombstones(Game.rooms.E23N25)[0]){
			console.log(Targets.Tombstones(Game.rooms.E23N25)[0].store.energy);
		}*/
		/*memory.cpu_checker.ticks++;
		memory.cpu_checker.cpu_used += Game.cpu.getUsed();
		console.log(memory.cpu_checker.cpu_used/memory.cpu_checker.ticks);*/
	}
};

module.exports = Managment;