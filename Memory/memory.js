let memory = {
	rooms:{

	},

	creeps:{

	},

	spawns:{

	},

	constants:{
		maintenance_constant: 0.9,
		critical_maintenance_constant: 0.5,
		critical_rampart_constant: 0.00001,
		critical_wall_constant: 0.00001,
		body_part_costs:{
			MOVE: 50,
			WORK: 100,
			ATTACK: 80,
			CARRY: 50,
	        HEAL: 250,
	        RANGED_ATTACK: 150,
	        TOUGH: 10,
	        CLAIM: 600
		},
		mobile_harvester_part_limit:{
			work_parts: 12,
			move_parts: 13
		},
		static_harvester_part_limit:{
			work_parts: 7,
			move_parts: 5
		},
		stationary_harvester_part_limit:{
			work_parts: 7,
			move_parts: 4
		},
		worker_part_limit:{
			work_parts: 16,
			move_parts: 17
		}
	},

	cpu_checker:{
		cpu_used: 0,
		ticks: 0
	}
};

module.exports = memory;