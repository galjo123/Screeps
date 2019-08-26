const creep_object = require("creep_object");
const Creeps_Needed = require("Creeps_Needed");
const Creep_Parts = require("Creep_Parts");
const Run = require("Run");
const memory = require("memory");

const Spawn_Creeps = {
	Harvesters(){
		let i = 0;
		let harvesters_needed = Creeps_Needed.Harvesters();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in harvesters_needed){
					if(room_name == spawn.room.name && Object.keys(harvesters_needed[room_name]).length > 0){
						const source_id = Object.keys(harvesters_needed[room_name])[0];
						
						const name = "Harvester_" + Game.time + i;
						
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep(Creep_Parts.Harvester(spawn.room), name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "harvester",
								permanent_target: Game.getObjectById(source_id)
							}
						});
				
						harvesters_needed[room_name][source_id]--;
				
						if(harvesters_needed[room_name][source_id] == 0){
							delete harvesters_needed[room_name][source_id];
						}
					
						if(Object.keys(harvesters_needed[room_name]).length == 0){
							delete harvesters_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},

	Upgraders(){
		let i = 0;
		let upgraders_needed = Creeps_Needed.Upgraders();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in upgraders_needed){
					if(room_name == spawn.room.name && upgraders_needed[room_name] > 0){
						const name = "Upgrader_" + Game.time + i;
						const energy_available = spawn.room.energyAvailable/upgraders_needed[spawn.room.name];
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep([WORK,CARRY,MOVE]/*Creep_Parts.Upgrader(spawn.room, energy_available)*/, name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "upgrader",
								permanent_target: spawn.room.controller
							}
						});
				
						upgraders_needed[room_name]--;
				
						if(upgraders_needed[room_name] == 0){
							delete upgraders_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},

	Workers(){
		let i = 0;
		let workers_needed = Creeps_Needed.Workers();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in workers_needed){
					if(room_name == spawn.room.name && workers_needed[room_name] > 0){
						const name = "Worker_" + Game.time + i;
						const energy_available = spawn.room.energyAvailable/workers_needed[spawn.room.name];
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]/*Creep_Parts.Worker(spawn.room, energy_available)*/, name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "worker",
								permanent_target: {id: 0}
							}
						});
				
						workers_needed[room_name]--;
				
						if(workers_needed[room_name] == 0){
							delete workers_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},

	Carriers(){
		let i = 0;
		let carriers_needed = Creeps_Needed.Carriers();

		Run.All("spawns", spawn => {
			if(!spawn.spawning && memory.rooms[spawn.room.name].room_development.containers){
				for(let room_name in carriers_needed){
					if(room_name == spawn.room.name && Object.keys(carriers_needed[room_name]).length > 0){
						const container_id = Object.keys(carriers_needed[room_name])[0];
						
						const name = "Carrier_" + Game.time + i;
						
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE]/*Creep_Parts.Carrier(spawn.room)*/, name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "carrier",
								permanent_target: Game.getObjectById(container_id)
							}
						});
				
						carriers_needed[room_name][container_id] = 0;
				
						if(carriers_needed[room_name][container_id] == 0){
							delete carriers_needed[room_name][container_id];
						}
					
						if(Object.keys(carriers_needed[room_name]).length == 0){
							delete carriers_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},

	Explorers(){
		let i = 0;
		let explorers_needed = Creeps_Needed.Explorers();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in explorers_needed){
					if(room_name == spawn.room.name && explorers_needed[room_name] > 0){
						const name = "Explorer_" + Game.time + i;
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep([MOVE], name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "explorer",
								permanent_target: {id: 0}
							}
						});
				
						explorers_needed[room_name]--;
				
						if(explorers_needed[room_name] == 0){
							delete explorers_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	}
};

module.exports = Spawn_Creeps;