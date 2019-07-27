
const Run = require("Run");

const Managment = {

	Start_of_Tick(){
/////////MEMORY_DELETION/////////////////////////////
		/*for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
			}
		}*/
/////////ROOM_INFO_UPDATE/////////////////////////////
		Run.All("rooms", room => {
			const Dynamic_Room_Info = require("Dynamic_Room_Info");
			const Static_Room_Info = require("Static_Room_Info");
			const Targets = require("Targets");

			/*if(!room.memory.Static_Room_Info){
				room.memory.Static_Room_Info = new Static_Room_Info(room);
			}*/
			/*
			room.memory.Dynamic_Room_Info = new Dynamic_Room_Info(room);*/
//////////FOR_DETECTING_CHANGES_IN_ROOM////////////
			/*room.memory.Counter++;
			if(room.memory.Counter % 2 == 0){
				room.memory.Preavious_Construction_Sites = Targets.Construction_Sites(room);
				room.memory.Preavious_Damaged_Structures = Targets.Maintenance(room);
				room.memory.Counter = 0;
			}*/
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
		Run.All("spawns", spawn => {
			
			const number_of_creeps = spawn.room.memory.Dynamic_Room_Info.My_Creeps.length;
			let name= "Creep_" + Game.time;
			if(number_of_creeps < 2){
				spawn.spawnCreep([WORK,CARRY,MOVE], name, {memory: {role: "harvester", state: "SPAWNING", target: {id: 0}, permanent_targets: "", action: ""}});
			}
			/*const harvester_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role == "harvester").length;
			const worker_number = _.filter(spawn.room.memory.roomInfo.my_creeps, creep => creep.memory.role != "harvester").length;

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
/////////CREEP_ORDERS//////////////////////////////
	Orders(){
		const State_Machine = require("State_Machine");
		State_Machine.Activate("Worker_State_Machine", "creep");
	},


	Run_Each_Tick() {
		Managment.Start_of_Tick();
		//managment.structure_orders();
		Managment.Creep_Spawning();
		Managment.Orders();
	}
};

module.exports = Managment;