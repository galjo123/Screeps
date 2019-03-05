const Targets = {
	Assign(creep, role){
		const Targets = require("Targets");

		if(creep.carry.energy == 0){
			switch (role){
				case "harvester":
					creep.memory.Target = Targets.Sources(creep.room)[0]; //needs to be for all sources
					creep.memory.Action = "harvest";//!!!!!!!!!
					break;
			}
		} else if(creep.carry.energy == creep.carryCapacity) {
			switch(role){
				case "harvester":
					creep.memory.Target = Targets.Containers(creep.room, true)[0];//needs to be container closest by position
					creep.memory.Action = "transfer";//!!!!!!!!!!!
					break;
			}
		}
	}
};

module.exports = Targets;