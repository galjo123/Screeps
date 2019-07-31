
const Run = require("Run");
const memory = require("memory");

const Managment = {

	Start_of_Tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
			}
		}
/////////ROOM_INFO_UPDATE/////////////////////////////
		const dynamic_room_info = require("dynamic_room_info");
		const room_object = require("room_object");
		const Targets = require("Targets");

		Run.All("rooms", room => {
			if(!memory.rooms[room.name]){
				memory.rooms[room.name] = new room_object(room);
			}

			memory.rooms[room.name].dynamic_room_info = new dynamic_room_info(room);
			
//////////FOR_DETECTING_CHANGES_IN_ROOM////////////
			memory.rooms[room.name].counter++;
			if(memory.rooms[room.name].counter % 2 == 0){
				memory.rooms[room.name].preavious_construction_sites = Targets.Construction_Sites(room);
				memory.rooms[room.name].preavious_damaged_structures = Targets.Maintenance(room);
				memory.rooms[room.name].counter = 0;
			}
		});
//////////FOR_CREATING_FLAG_OBJECTS////////////////
		const flag_object = require("flag_object");

		Run.All("flags", flag => {
			if(!memory.flags[flag.name]){
				flag.id = "Flag_" + Game.time;
				memory.flags[flag.name] = new flag_object(flag);
			}
		});

		const creep_object = require("creep_object");

		Run.All("creeps", creep => {
			if(!memory.creeps[creep.name]){
				memory.creeps[creep.name] = new creep_object("harvester","SPAWNING",{id:0});
			}
		});
	},



	/*structure_orders(){
		Run.All("rooms", room =>{
			const Targets = require("Targets");

			for(let id in Targets.Towers(room)){
				const tower = Targets.Towers(room)[id];

				if(Targets.Enemy_Creeps(room).length){
					const enemy_creep = tower.pos.findClosestByRange(Targets.Enemy_Creeps(room));
					tower.attack(enemy_creep);
				} else if(Targets.Damaged_Structures(room).length){
					const damaged_structure = tower.pos.findClosestByRange(Targets.Damaged_Structures(room));
					tower.repair(damaged_structure);
				} else if(Targets.Damaged_Walls(room).length){
					const damaged_wall = tower.pos.findClosestByRange(Targets.Damaged_Walls(room));
					tower.repair(damaged_wall);
				}
			}
		});
	},*/
/////////CREEP_SPAWNING//////////////////////////////
	Creep_Spawning(){
		//const Make = require("Creep_Spawner");
		//const Targets = require("Targets");
		const memory = require("memory");
		const creep_object = require("creep_object");

		Run.All("spawns", spawn => {
			const creeps = memory.rooms[spawn.room.name].dynamic_room_info.my_creeps;
			let harvesters = _.filter(creeps, creep => {return memory.creeps[creep.name].role == "harvester";});
			const name = "Creep_" + Game.time;

			if(harvesters.length < 1){
				memory.creeps[name] = new creep_object("harvester","SPAWNING", {id:0});
				spawn.spawnCreep([WORK,CARRY,MOVE], name);
			}
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
		});
	},
/////////STATE_MACHINE_ACTIVATION//////////////////////////////
	State_Machine(State_Machine_Name, objects){
		const Run = require("Run");

		Run.All(objects , object => {
			const State_Machine_Condition = require("State_Machine_Condition");

			if(State_Machine_Condition[State_Machine_Name](object)){
				const State_Machine = require(State_Machine_Name);
				const object_array = memory[objects];
				
				const State = State_Machine[object_array[object.name].state];
				console.log(object_array[object.name].state);

				for(let funq in State){
					State[funq](object);
				}
			}
		});
	},

	Run_Each_Tick() {
		Managment.Start_of_Tick();
		//managment.structure_orders();
		Managment.Creep_Spawning();
		Managment.State_Machine("Worker_State_Machine", "creeps");
	}
};

module.exports = Managment;