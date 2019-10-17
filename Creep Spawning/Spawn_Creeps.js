const creep_object = require("creep_object");
const Creeps_Needed = require("Creeps_Needed");
const Creep_Parts = require("Creep_Parts");
const Run = require("Run");
const memory = require("memory");
const _ = require("lodash");

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
						const energy_available = spawn.room.energyAvailable;
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep(Creep_Parts.Upgrader(spawn.room, energy_available), name, {
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
					if(room_name == spawn.room.name && Object.keys(workers_needed[room_name]).length > 0){
						const assigned_room = Object.keys(workers_needed[room_name])[0];
						let workers_in_waiting = 0;
						if(spawn.room.energyAvailable < 400){
							workers_in_waiting = 1;
						} else {
							_.sum(workers_needed[room_name]);
						}
						const energy_available = spawn.room.energyAvailable/workers_in_waiting;

						const name = "Worker_" + Game.time + i;
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep(Creep_Parts.Worker(spawn.room, energy_available), name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "worker",
								permanent_target: assigned_room
							}
						});
				
						workers_needed[room_name][assigned_room]--;
				
						if(workers_needed[room_name][assigned_room] == 0){
							delete workers_needed[room_name][assigned_room];
						}
						if(Object.keys(workers_needed[room_name]).length == 0){
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
						spawn.spawnCreep(Creep_Parts.Carrier(spawn.room, spawn.room.energyAvailable), name, {
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
	},

	Claimers(){
		let i = 0;
		let claimers_needed = Creeps_Needed.Claimers();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in claimers_needed){
					if(room_name == spawn.room.name && Object.keys(claimers_needed[room_name]).length > 0){
						const flag_name = Object.keys(claimers_needed[room_name])[0];
						const name = "Claimer_" + Game.time + i;
				
						memory.creeps[name] = new creep_object();
						spawn.spawnCreep([CLAIM, CLAIM, MOVE, MOVE], name, {
							memory: {
								room_of_origin: spawn.room.name,
								role: "claimer",
								permanent_target: flag_name
							}
						});
				
						claimers_needed[room_name]--;
				
						if(claimers_needed[room_name] == 0){
							delete claimers_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},

	Soldiers(){
		let i = 0;
		let soldiers_needed = Creeps_Needed.Soldiers();

		Run.All("spawns", spawn => {
			if(!spawn.spawning){
				for(let room_name in soldiers_needed){
					if(room_name == spawn.room.name && Object.keys(soldiers_needed[room_name]).length > 0){
						const squad = Object.keys(soldiers_needed[room_name])[0];
						const combat_role = Object.keys(soldiers_needed[room_name][squad])[0];
						if(soldiers_needed[room_name][squad][combat_role]){
							const name = "Soldier_" + Game.time + i;//NEEDS EXTRA WORK

							memory.creeps[name] = new creep_object();
							spawn.spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,ATTACK,ATTACK,ATTACK,RANGED_ATTACK,
												MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,HEAL], name, {
								memory: {
									room_of_origin: spawn.room.name,
									squad: squad,
									role: combat_role,
									permanent_target: {id: 0}
								}
							});
					
							soldiers_needed[room_name][squad][combat_role]--;
						}
				
						if(soldiers_needed[room_name][squad][combat_role] == 0){
							delete soldiers_needed[room_name][squad][combat_role];
						}

						if(Object.keys(soldiers_needed[room_name][squad]).length == 0){
							delete soldiers_needed[room_name][squad];
						}

						if(Object.keys(soldiers_needed[room_name]).length == 0){
							delete soldiers_needed[room_name];
						}
					}
				}
				i++;
			}
		});
	},
};

module.exports = Spawn_Creeps;