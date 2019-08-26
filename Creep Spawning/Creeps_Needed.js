const Run = require("Run");
const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");

const Creeps_Needed = {
	Harvesters(){
		let harvesters_needed = {};

		Run.All("rooms", room => {
			if(room.controller.my){
				let sources = memory.rooms[room.name].static_room_info.sources;
				let spots = {};
				const room_name = room.name;

				if(!harvesters_needed[room_name]){
					harvesters_needed[room_name] = {};
				}

				sources.forEach(source => {			
					if(room.energyCapacityAvailable < 400 && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 5){
						spots[source.id] = memory.rooms[room.name].static_room_info.spots_per_source[source.id];
					} else if(room.energyCapacityAvailable < 600 && room.energyCapacityAvailable >= 400 && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 4){
						spots[source.id] = 4;
					} else if(room.energyCapacityAvailable < 900 && room.energyCapacityAvailable >= 600 && memory.rooms[room.name].static_room_info.spots_per_source[source.id] >= 3){
						spots[source.id] = 3;
					} else if(room.energyCapacityAvailable < 1800 && room.energyCapacityAvailable >= 900 && spots_left[source.id] >= 2){
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
				let sources = memory.rooms[room.name].static_room_info.sources;

				const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
				const room_name = resource_colony_flag.memory.room_ownership;

				if(!harvesters_needed[room_name]){
					harvesters_needed[room_name] = {};
				}
//console.log(memory.rooms.E23N24.static_room_info.sources);
				_.remove(sources, source => {
					for(let name in Game.creeps){
						const creep = Game.creeps[name];
						if(creep.memory.permanent_target.id == source.id){
							return true;
						}
					}
					return false;
				});
//console.log(memory.rooms.E23N24.static_room_info.sources);
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
			const exsisting_room_upgraders = _.filter(memory.rooms[room.name].dynamic_room_info.my_creeps, creep => {
													return creep.memory.role == "upgrader";
												});

			if(room.controller.my && !exsisting_room_upgraders.length){
				upgraders_needed[room.name] = 1;
			}
		});
		return upgraders_needed;
	},

	Workers(){
		let workers_needed = {};

		Run.All("rooms", room => {
			let room_name = room.name;

			if(Targets.Resource_Colony_Flag(room).length){
				const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
				room_name = resource_colony_flag.memory.room_ownership;
			}

			if(!workers_needed[room_name]){
				workers_needed[room_name] = 0;
			}

			if(Global_Targets.Construction_Sites().length){
				workers_needed[room_name] += 2;
			} else {
				workers_needed[room_name] += 1;
			}

			if(room_name == room.name){
				let already_exsisting_workers = 0;
				Run.All("creeps", creep => {
					if(creep.memory.role == "worker" &&
						creep.memory.room_of_origin == [room_name]){
						already_exsisting_workers++;
					}
				});
				workers_needed[room_name] -= already_exsisting_workers;
			}
		});

		return workers_needed;
	},

	Carriers(){
		let carriers_needed = {};

		Run.All("rooms", room => {
	//console.log(room.name);
			const source_containers = Targets.Source_Containers(room);
	//console.log(room.name, source_containers);
			let room_name = room.name;

			if(source_containers.length){
				if(Targets.Resource_Colony_Flag(room).length){
					const resource_colony_flag = Targets.Resource_Colony_Flag(room)[0];
					room_name = resource_colony_flag.memory.room_ownership;
				}

			
				if(!carriers_needed[room_name]){
					carriers_needed[room_name] = {};
				}

				source_containers.forEach(container => {
					let assigned_creeps = 0;
			
					for(let name in Game.creeps){
						const creep = Game.creeps[name];
						if(creep.memory.permanent_target.id == container.id){
							assigned_creeps++;
						}
					}

					if(assigned_creeps < 1){
						carriers_needed[room_name][container.id]++;
					}
				});
			}
		});
//console.log(Object.keys(carriers_needed.E23N25));
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
	}
};

module.exports = Creeps_Needed;