const memory = require("memory");
const Creep_Parts_Array = require("Creep_Parts_Array");

const Creep_Parts = {
	Harvester(room){
		let energy_available = room.energyAvailable;
		let work_parts = {number: 0, type: WORK},
			carry_parts = {number: 0, type: CARRY},
			move_parts = {number: 0, type: MOVE};

		const work_part_cost = memory.constants.body_part_costs.WORK;
		const move_part_cost = memory.constants.body_part_costs.MOVE;
		const carry_part_cost = memory.constants.body_part_costs.CARRY;

		const mobile_harvester_work_part_limit = memory.constants.mobile_harvester_part_limit.work_parts;
		const mobile_harvester_move_part_limit = memory.constants.mobile_harvester_part_limit.move_parts;
		const static_harvester_work_part_limit = memory.constants.static_harvester_part_limit.work_parts;
		const static_harvester_move_part_limit = memory.constants.static_harvester_part_limit.move_parts;

		if(memory.rooms[room.name].room_development.containers && energy_available >= 200){
			work_parts.number = Math.floor((energy_available/2)/work_part_cost);
			if(work_parts.number > static_harvester_work_part_limit){
				work_parts.number = static_harvester_work_part_limit;
			}

			energy_available -= work_parts.number * work_part_cost;
			move_parts.number = Math.floor((energy_available/2)/move_part_cost);
			if(move_parts.number > static_harvester_move_part_limit){
				move_parts.number = static_harvester_move_part_limit;
			}

			energy_available -= move_parts.number * move_part_cost;
			carry_parts.number = move_parts.number * 2 - work_parts.number;
			if(carry_parts.number * carry_part_cost > energy_available){
				carry_parts.number--;
			}

		} else if(energy_available >= 200){
			work_parts.number = Math.floor((energy_available/2)/work_part_cost);
			if(work_parts.number > mobile_harvester_work_part_limit){
				work_parts.number = mobile_harvester_work_part_limit;
			}

			energy_available -= work_parts.number * work_part_cost;
			move_parts.number = Math.floor((energy_available/2)/move_part_cost);
			if(move_parts.number > mobile_harvester_move_part_limit){
				move_parts.number = mobile_harvester_move_part_limit;
			}
			
			energy_available -= move_parts.number * move_part_cost;
			carry_parts.number = move_parts.number * 2 - work_parts.number;
			if(carry_parts.number * carry_part_cost > energy_available){
				carry_parts.number--;
			}
		}

		return Creep_Parts_Array.Create(move_parts, work_parts, carry_parts);
	},

	Worker(room, energy_per_creep){
		let energy_available = energy_per_creep;
		let work_parts = {number: 0, type: WORK},
			carry_parts = {number: 0, type: CARRY},
			move_parts = {number: 0, type: MOVE};

		const work_part_cost = memory.constants.body_part_costs.WORK;
		const carry_part_cost = memory.constants.body_part_costs.CARRY;
		const move_part_cost = memory.constants.body_part_costs.MOVE;

		if(energy_available >= 200){
			const worker_work_part_limit = memory.constants.worker_part_limit.work_parts;
			const worker_move_part_limit = memory.constants.worker_part_limit.move_parts;
		
			work_parts.number = Math.floor((energy_available/2)/memory.constants.body_part_costs.WORK);
		
			if(work_parts.number > worker_work_part_limit){
				work_parts.number = worker_work_part_limit;
			}
			energy_available -= work_parts.number * memory.constants.body_part_costs.WORK;
			move_parts.number = Math.floor((energy_available/2)/memory.constants.body_part_costs.MOVE);
	
			if(move_parts.number > worker_move_part_limit){
				move_parts.number = worker_move_part_limit;
			}
			energy_available -= move_parts.number * move_part_cost;
			carry_parts.number = move_parts.number * 2 - work_parts.number;
			if(carry_parts.number * carry_part_cost > energy_available || work_parts.number + carry_parts.number + move_parts.number > 50){
				carry_parts.number--;
			}
		}

		return Creep_Parts_Array.Create(move_parts, work_parts, carry_parts);
	}
};

module.exports = Creep_Parts;