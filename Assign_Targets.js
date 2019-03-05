const Targets = {
	Assign(creep){
		const Targets = require("Targets");

		if(creep.carry.energy == 0){
			switch (creep.memory.role){
				case "harvester":
					creep.memory.Target = Targets.Sources(creep.room)[0]; //needs to be for all sources
					creep.memory.Action = "harvest";//!!!!!!!!!
					break;
			}
		} else if(creep.carry.energy == creep.carryCapacity) {
			switch(creep.memory.role){
				case "harvester":
					creep.memory.Target = Targets.Containers(creep.room, true)[0];//needs to be container closest by position
					creep.memory.Action = "transfer";//!!!!!!!!!!!
					break;
			}
		} else if(creep.memory.Target.id != 0){
			switch(creep.memory.role){
				case "harvester":
				if(creep.memory.Target.energy == creep.memory.Target.energyCapacity && creep.memory.Target.my){
					creep.memory.Target = Targets.Containers(creep.room, true)[0];
				} else {
					creep.memory.Target = creep.memory.Target;
				}
			}
		}
		if(creep.memory.Target == undefined){
		    creep.memory.Target = {id: 0};
		}
	}
};

module.exports = Targets;