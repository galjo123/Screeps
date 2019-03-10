const Targets = {
	Assign(creep){
		const Targets = require("Targets");

		if(creep.carry.energy == 0){
			switch (creep.memory.role){
				case "harvester":
					creep.memory.Target = Targets.Sources(creep.room)[0]; //needs to be for all sources
					creep.memory.Action = "harvest";
					break;
				case "upgrader":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room)); //needs to be for all sources
						creep.memory.Action = "harvest";
					}
					break;
				case "builder":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room)); //needs to be for all sources
						creep.memory.Action = "harvest";
					}
					break;
			}
		} else if(creep.carry.energy == creep.carryCapacity) {
			switch(creep.memory.role){
				case "harvester":
					creep.memory.Target = Targets.Containers(creep.room, true)[0];//needs to be container closest by position
					creep.memory.Action = "transfer";
					break;
				case "upgrader":
					creep.memory.Target = Targets.Controller(creep.room);
					creep.memory.Action = "upgradeController";
					break;
				case "builder":
					creep.memory.Target = Targets.Construction_Sites(creep.room)[0];//could use a better algorithm
					creep.memory.Action = "build";
			}
		} else if(creep.memory.Target.id != 0){
			switch(creep.memory.role){
				case "harvester":
					if(creep.memory.Target.energy == creep.memory.Target.energyCapacity && creep.memory.Target.my){
						creep.memory.Target = Targets.Containers(creep.room, true)[0];
					} else {
						creep.memory.Target = creep.memory.Target;
					} break;
				case "upgrader":
					creep.memory.Target = creep.memory.Target;
					break;
				case "builder":
					creep.memory.Target = Targets.Construction_Sites(creep.room)[0];
					creep.memory.Action = "build";
			}
		}
		if(creep.memory.Target == undefined){
		    creep.memory.Target = {id: 0};
		}
	}
};

module.exports = Targets;