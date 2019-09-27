const Run = require("Run");

const Attack_Squads_Needed = {
	Execute(soldiers_needed, squad_flags, squad_name){
		const first_flag = squad_flags[0];
		const room_name = first_flag.memory.room_ownership;

		if(!soldiers_needed[room_name]){
			soldiers_needed[room_name] = {};
		}
		soldiers_needed[room_name][squad_name] = {};

		soldiers_needed[room_name][squad_name].soldier = 1;
		soldiers_needed[room_name][squad_name].healer = 0;
		let already_exsisting_soldiers = 0;
		let already_exsisting_healers = 0;

		Run.All("creeps", creep => {
			if(creep.memory.squad == squad_name){
				switch (creep.memory.role) {
					case "soldier": already_exsisting_soldiers++;
						break;
					case "healer": already_exsisting_healers++;
						break;
				}
			}
		});

		soldiers_needed[room_name][squad_name].soldier -= already_exsisting_soldiers;
		soldiers_needed[room_name][squad_name].healer -= already_exsisting_healers;
	}
};

module.exports = Attack_Squads_Needed;