const Targets = require("Targets");
const Global_Targets = require("Global_Targets");
const memory = require("memory");
const _ = require("lodash");
const Target_Priority = require("Target_Priority");
const Target_Picker = require("Target_Picker");
const differenceBy = require("differenceBy");

module.exports = (creep) => {
	if(memory.creeps[creep.name].state == "WORK"){
		const source = Game.getObjectById(creep.memory.permanent_target.id);
		let targets = [];

		if(creep.room.controller.my){
			let unfilled_appropriate_container = [];
			let unfilled_appropriate_link = [];

			if(memory.rooms[creep.room.name].room_development.containers){
				const room_source_containers = Targets.Source_Containers(source.room);
				const appropriate_container = source.pos.findClosestByRange(room_source_containers);
				if(appropriate_container){
					if(appropriate_container.store.getUsedCapacity() < appropriate_container.store.getCapacity()){
						unfilled_appropriate_container = [appropriate_container];
					}
				}
			}

			if(memory.rooms[creep.room.name].room_development.links){
				const links = Targets.Links(source.room);
				const appropriate_link = source.pos.findClosestByRange(links);

				if(appropriate_container.store.getUsedCapacity() < appropriate_container.store.getCapacity()){
					unfilled_appropriate_link = [appropriate_link];
				}
			}

			targets = Target_Priority.Get(unfilled_appropriate_link,
											unfilled_appropriate_container);
			if(!targets.length){
				const local_empty_containers = Targets.Empty_Containers(creep.room);
				const local_source_containers = Targets.Source_Containers(creep.room);
				const local_mineral_containers = Targets.Mineral_Containers(creep.room);

				const local_empty_spawns_and_extensions = Targets.Empty_Spawns_And_Extensions(creep.room);
				const local_critically_empty_towers = Targets.Critically_Empty_Towers(creep.room);
				const local_filtered_empty_containers = differenceBy.Id(local_empty_containers, local_source_containers, local_mineral_containers);
				const local_empty_towers = Targets.Empty_Towers(creep.room);

				targets = Target_Priority.Get(local_empty_spawns_and_extensions,
											local_critically_empty_towers,
											local_filtered_empty_containers,
											local_empty_towers);
			}

			if(!targets.length){
				const empty_containers = Global_Targets.Objects("Empty_Containers");
				const source_containers = Global_Targets.Objects("Source_Containers");
				const mineral_containers = Global_Targets.Objects("Mineral_Containers");

				const empty_spawns_and_extensions = Global_Targets.Objects("Empty_Spawns_And_Extensions");
				const critically_empty_towers = Global_Targets.Objects("Critically_Empty_Towers");
				const filtered_empty_containers = differenceBy.Id(empty_containers, source_containers, mineral_containers);
				const empty_towers = Global_Targets.Objects("Empty_Towers");

				targets = Target_Priority.Get(empty_spawns_and_extensions,
											critically_empty_towers,
											filtered_empty_containers,
											empty_towers);
			}
		} else {
			let unfilled_appropriate_container = [];
			const unfilled_room_containers = Targets.Empty_Containers(source.room);
			
			const room_source_containers = Targets.Source_Containers(source.room);
			const appropriate_container = source.pos.findClosestByRange(room_source_containers);
			if(appropriate_container){
				if(appropriate_container.store.getUsedCapacity() < appropriate_container.store.getCapacity()){
					unfilled_appropriate_container = [appropriate_container];
				}
			}

			targets = Target_Priority.Get(unfilled_appropriate_container,
										  unfilled_room_containers);
		}

		memory.creeps[creep.name].target = Target_Picker.Pick(creep, targets);
		memory.creeps[creep.name].action = "transfer";

	} else if(memory.creeps[creep.name].state == "RESUPPLY" || memory.creeps[creep.name].state == "IDLE"){
		memory.creeps[creep.name].target = creep.memory.permanent_target;
		memory.creeps[creep.name].action = "harvest";
	}
		
	if(!memory.creeps[creep.name].target){
		memory.creeps[creep.name].target = {id: 0};
	}
};