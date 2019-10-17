const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");
const Target_Picker = require("Target_Picker");
const differenceBy = require("differenceBy");

module.exports = (creep) => {
	const main_container = Game.getObjectById(creep.memory.permanent_target.id);
	const room_of_origin = Game.rooms[creep.memory.room_of_origin];

	if(memory.creeps[creep.name].state == "WORK"){
		let targets = [];

		const local_empty_containers = Targets.Empty_Containers(room_of_origin);
		const local_source_containers = Targets.Source_Containers(room_of_origin);
		const local_mineral_containers = Targets.Mineral_Containers(room_of_origin);

		const local_empty_spawns_and_extensions = Targets.Empty_Spawns_And_Extensions(room_of_origin);
		const local_critically_empty_towers = Targets.Critically_Empty_Towers(room_of_origin);
		const local_empty_non_source_containers = differenceBy.Id(local_empty_containers, local_source_containers, local_mineral_containers);
		const local_empty_towers = Targets.Empty_Towers(room_of_origin);

		targets = Target_Priority.Get(local_empty_spawns_and_extensions,
									  local_critically_empty_towers,
									  local_empty_non_source_containers,
									  local_empty_towers);
		
		if(!targets.length){
			const empty_containers = Global_Targets.Objects("Empty_Containers");
			const source_containers = Global_Targets.Objects("Source_Containers");
			const mineral_containers = Global_Targets.Objects("Mineral_Containers");

			const empty_spawns_and_extensions = Global_Targets.Objects("Empty_Spawns_And_Extensions");
			const critically_empty_towers = Global_Targets.Objects("Critically_Empty_Towers");
			const empty_non_source_containers = differenceBy.Id(empty_containers, source_containers, mineral_containers);
			const empty_towers = Global_Targets.Objects("Empty_Towers");

			targets = Target_Priority.Get(empty_spawns_and_extensions,
									  critically_empty_towers,
									  empty_non_source_containers,
									  empty_towers);
		}

		memory.creeps[creep.name].target = Target_Picker.Pick(creep, targets);
		memory.creeps[creep.name].action = "transfer";

	} else if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		let targets = [];

		//const dropped_resources = Targets.Dropped_Resource(creep.room);
		const filled_tombstones = Targets.Full_Tombstones(creep.room);
		let filled_main_container = [];
		/*if(Game.rooms[creep.memory.room_of_origin].energyCapacityAvailable < 2000){
			filled_main_container = _.filter(main_container, container => {
				console.log(main_container);
				return container.store.getUsedCapacity() > 0;
			});
		}*/

		const local_empty_spawns_and_extensions = Targets.Empty_Spawns_And_Extensions(room_of_origin);
		let filled_local_source_containers = [];
		let filled_local_containers = [];
		
		if(main_container){
			filled_local_source_containers = Targets.Filled_Source_Containers(main_container.room);
			if(local_empty_spawns_and_extensions.length){
				filled_local_containers = Targets.Full_Containers(main_container.room);
			}
		}

		const filled_source_containers = Global_Targets.Objects("Filled_Source_Containers");
		const filled_mineral_containers = Global_Targets.Objects("Filled_Mineral_Containers");

		targets = Target_Priority.Get(/*dropped_resources*/
									  filled_tombstones,
									  filled_main_container,
									  filled_local_source_containers,
									  filled_local_containers,
									  filled_source_containers,///
									  filled_mineral_containers);///THESE 2 SHOULD BE EQUAL PRIORITY

		memory.creeps[creep.name].target = Target_Picker.Pick(creep, targets);
		/*if(dropped_resources.length){
			memory.creeps[creep.name].action = "pickup";
		} else {*/
		memory.creeps[creep.name].action = "withdraw";
		//}
	}
		
	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};
	}
};