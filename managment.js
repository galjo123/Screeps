
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
		const flag_object = require("flag_object");
		let i = 0;

		Run.All("flags", flag => {
			i++;
			if(!memory.flags[flag.name]){
				flag_id = "Flag_" + Game.time + i;
				memory.flags[flag.name] = new flag_object(flag, flag_id);
			}
			if(!flag.memory.room_ownership){
				const creep_name = memory.rooms.E23N25.dynamic_room_info.my_creeps[0].name;
				flag.memory.room_ownership = Game.creeps[creep_name].memory.room_of_origin;
			}
		});
/////////FOR_CREATING_SPAWN_OBJECTS/////////////////////////
		const spawn_object = require("spawn_object");

		Run.All("spawns", spawn => {
			if(!memory.spawns[spawn.name]){
				memory.spawns[spawn.name] = new spawn_object();
			}
		});

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

		Spawn_Creeps.Harvesters();
		Spawn_Creeps.Upgraders();
		Spawn_Creeps.Carriers();
		Spawn_Creeps.Workers();
		Spawn_Creeps.Explorers();
		//const Make = require("Creep_Spawner");
		//const Targets = require("Targets");
		
			
			/*const creeps = memory.rooms[spawn.room.name].dynamic_room_info.my_creeps;
			let harvesters = _.filter(creeps, creep => {return memory.creeps[creep.name].role == "harvester";});
			const name = "Creep_" + Game.time;

			if(harvesters_needed){
				memory.creeps[name] = new creep_object("harvester");
				spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {room_of_origin: spawn.room.name, role: "harvester", permanent_target: {id: 0}}});
			}*/
			/*const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => memory.creeps[creep.name].role == "harvester").length;
			const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => memory.creeps[creep.name].role != "harvester").length;

			const harvesting_spots = spawn.room.memory.roomInfo.E_harvesting_spots;
			let available_spots = harvesting_spots;

			if(!Targets.Containers(spawn.room, "spawn").length){
				available_spots = spawn.room.memory.roomInfo.sources.length;
			}

			if(!spawn.spawning && harvester_number < available_spots){
				Make.Harvester(spawn);
			} else if(!spawn.spawning && worker_number < 3){
				Make.Worker(spawn);
			} else {
				Make.Soldier(spawn);
			}*/
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
		Managment.State_Machine("Worker_State_Machine", "creeps");
		Managment.State_Machine("Explorer_State_Machine", "creeps");
//console.log("--------------------------------------------");
		/*Run.All("creeps", creep => {
			if(creep.memory.role == "worker"){
				console.log(memory.creeps[creep.name].state, memory.creeps[creep.name].action);
				console.log(memory.creeps[creep.name].target.structureType);
			}
		});*/
		/*const Targets = require("Targets");
		const Global_Targets = require("Global_Targets");
		if(Targets.Tombstones(Game.rooms.E23N25)[0]){
			console.log(Targets.Tombstones(Game.rooms.E23N25)[0].store.energy);
		}*/
		/*for(let room_name in memory.rooms){
			console.log(Object.keys(memory.rooms[room_name]));
		}
		console.log("--------------------------------");*/
	}
};

module.exports = Managment;