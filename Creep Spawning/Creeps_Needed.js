const Run = require("Run");
const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Creep_Spawn_Time = require("Creep_Spawn_Time");

const Creeps_Needed = {
	Harvesters(){
		let harvesters_needed = {};

		Run.All("rooms", room => {
			if(room.controller && room.controller.my){
				let sources = memory.rooms[room.name].static_room_info.sources;
				let spots = {};
				const room_name = room.name;
		
				if(!harvesters_needed[room_name]){
					harvesters_needed[room_name] = {};
				}
			
				sources.forEach(source => {
					if(room.energyCapacityAvailable < 400 && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 5){
						spots[source.id] = memory.rooms[room.name].static_room_info.spots_per_source[source.id];
					} else if(room.energyCapacityAvailable < 600 /*&& room.energyCapacityAvailable >= 400*/ && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 4){
						spots[source.id] = 4;
					} else if(room.energyCapacityAvailable < 900 /*&& room.energyCapacityAvailable >= 600*/ && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 3){
						spots[source.id] = 3;
					} else if(room.energyCapacityAvailable < 1800 /*&& room.energyCapacityAvailable >= 900*/ && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 2){
						spots[source.id] = 2;
					} else {
						spots[source.id] = 1;
					}

					let assigned_creeps = 0;
			
					for(let name in Game.creeps){
						const creep = Game.creeps[name];
						if(creep.memory.permanent_target.id == source.id){
							assigned_creeps++;
						}
					}
			
					const permanent_target = source.id;
								
					if(assigned_creeps < spots[source.id]){
						const spots_left = spots[source.id] - assigned_creeps;
						harvesters_needed[room_name][permanent_target] = spots_left;
					}
				});
			} else if(Targets.Resource_Colony_Flag(room).length && memory.rooms[room.name].room_development.containers) {
				const room_sources = memory.rooms[room.name].static_room_info.sources;
				let sources = room_sources.slice(room_sources.length - 1);
			
				const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
				const room_name = resource_colony_flag.memory.room_ownership;
	
				if(!harvesters_needed[room_name]){
					harvesters_needed[room_name] = {};
				}
			
				_.remove(sources, source => {
					for(let name in Game.creeps){
						const creep = Game.creeps[name];
						if(creep.memory.permanent_target.id == source.id){
							return true;
						}
					}
					return false;
				});
			
				sources.forEach(source => {
					const permanent_target = source.id;
					harvesters_needed[room_name][permanent_target] = 1;
				});
			}
		});

		return harvesters_needed;
	},

	Upgraders(){
		let upgraders_needed = {};

		Run.All("rooms", room => {
			let exsisting_room_upgraders = 0;
			Run.All("creeps", creep => {
				if(creep.memory.role == "upgrader" && creep.room.name == room.name){
					exsisting_room_upgraders++;
				}
			});

			if(room.controller){
				if(room.controller.my && exsisting_room_upgraders == 0){
					upgraders_needed[room.name] = 1;
				}
			}
		});
		return upgraders_needed;
	},

	Workers(){
		let workers_needed = {};

		Run.All("rooms", room => {
			if((room.controller && room.controller.my) || Targets.Resource_Colony_Flag(room).length){
				let room_name = room.name;
			
				if(Targets.Resource_Colony_Flag(room).length){
					const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
					room_name = resource_colony_flag.memory.room_ownership;
				}
						
				if(!workers_needed[room_name]){
					workers_needed[room_name] = {};
				}
			

				let already_exsisting_workers = 0;
				Run.All("creeps", creep => {
					if(creep.memory.role == "worker" &&
						creep.memory.permanent_target == room.name){
						already_exsisting_workers++;
					}
				});
							
				if(Global_Targets.Objects("Construction_Sites").length && Game.rooms[room_name].controller.level < 7 && already_exsisting_workers < 2){
					workers_needed[room_name][room.name] = 2;
				} else if(already_exsisting_workers < 1){
					workers_needed[room_name][room.name] = 1;
				}
			}
		});

		return workers_needed;
	},

	Carriers(){
		let carriers_needed = {};

		Run.All("rooms", room => {
			const source_containers = Targets.Source_Containers(room);
			let room_name = room.name;

			if(source_containers.length){
				if(Targets.Resource_Colony_Flag(room).length){
					const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
					room_name = resource_colony_flag.memory.room_ownership;
				}

			
				if(!carriers_needed[room_name]){
					carriers_needed[room_name] = {};
				}

				if(Game.rooms[room_name].energyCapacityAvailable < 2000){
					if(source_containers.length){
						source_containers.forEach(container => {
							let assigned_creeps = 0;
												
							for(let name in Game.creeps){
								const creep = Game.creeps[name];
								if(creep.memory.permanent_target.id == container.id/* &&
									(creep.ticksToLive > Creep_Spawn_Time.Carrier(Game.rooms[room_name].energyAvailable)/2 || creep.spawning)*/){
										assigned_creeps++;
								}
							}
						
							if(assigned_creeps < 1){
								carriers_needed[room_name][container.id]++;
							}
						});
					}
				} else {
					let already_exsisting_carriers = 0;
					Run.All("creeps", creep => {
						if(creep.memory.role == "carrier" &&
						   creep.memory.permanent_target.room.name == room.name/* &&
						   (creep.ticksToLive > Creep_Spawn_Time.Carrier(Game.rooms[room_name].energyAvailable || creep.spawning))*/){
							already_exsisting_carriers++;
						}
					});
					if(!already_exsisting_carriers){
						carriers_needed[room_name][source_containers[0].id] = 1;
					}
				}
			}
		});
		return carriers_needed;
	},

	Explorers(){
		let already_exsisting_explorers = 0;
		let explorers_needed = {};

		Run.All("creeps", creep => {
			if(creep.memory.role == "explorer"){
				already_exsisting_explorers++;
			}
		});

		if(already_exsisting_explorers < Global_Targets.Exploration_Flags().length){
			const exploration_flags = Global_Targets.Exploration_Flags();

			exploration_flags.forEach(flag => {
			const room_name = flag.memory.room_ownership;
			explorers_needed[room_name] = 1;
			});
		}
		return explorers_needed;
	},

	Claimers(){
		let claimers_needed = {};
		let claim_flags = [];
		claim_flags.push(...Global_Targets.Resource_Colony_Flags());
		claim_flags.push(...Global_Targets.Claim_Flags());

		claim_flags.forEach(flag => {
			const room_name = flag.memory.room_ownership;
			let assigned_creeps = 0;

			if(!claimers_needed[room_name]){
				claimers_needed[room_name] = {};
			}

			for(let creep_name in Game.creeps){
				const creep = Game.creeps[creep_name];
				if(creep.memory.permanent_target == flag.name){
					assigned_creeps++;
				}
			}

			if(!assigned_creeps){
				claimers_needed[room_name][flag.name] = 1;
			}
		});

		return claimers_needed;
	},

	Soldiers(){
		const Attack_Squads_Needed = require("Attack_Squads_Needed");

		let soldiers_needed = {};
		const alpha_squad_flags = Global_Targets.Alpha_Squad_Flags();
		const beta_squad_flags = Global_Targets.Beta_Squad_Flags();

		if(alpha_squad_flags.length){
			Attack_Squads_Needed.Execute(soldiers_needed, alpha_squad_flags, "alpha");
		}
		if(beta_squad_flags.length){
			Attack_Squads_Needed.Execute(soldiers_needed, beta_squad_flags, "beta");
		}
		return soldiers_needed;
	}
};

module.exports = Creeps_Needed;