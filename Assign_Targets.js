const Targets = {
	Assign(creep){
		const Targets = require("Targets");

		if(creep.carry.energy == 0){
			switch (creep.memory.role){
				case "harvester":
					creep.memory.Target =  creep.memory.Permanent_Target;
					creep.memory.Action = "harvest";
					break;
				case "upgrader":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room, false)); //needs to be for all sources
						creep.memory.Action = "harvest";
					}
					break;
				case "builder":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room, false));
						creep.memory.Action = "harvest";
					}
					break;
				case "repairer":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room, false));
						creep.memory.Action = "harvest";
					}
					break;
			}
		} else if(creep.carry.energy == creep.carryCapacity) {
			switch(creep.memory.role){
				case "harvester":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, "harvester"));//needs to be container closest by position
					creep.memory.Action = "transfer";
					break;
				case "upgrader":
					creep.memory.Target = Targets.Controller(creep.room);
					creep.memory.Action = "upgradeController";
					break;
				case "builder":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Construction_Sites(creep.room));//could use a better algorithm
					creep.memory.Action = "build";
					break;
				case "repairer":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Damaged_Structures(creep.room));//could use a better algorithm
					creep.memory.Action = "repair";
					break;
			}
		} else if(creep.carry.energy < creep.carryCapacity){
			switch(creep.memory.role){
				case "harvester":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, "harvester"));
					break;
				case "upgrader":
					creep.memory.Target = creep.memory.Target;
					break;
				case "builder":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Construction_Sites(creep.room));
					creep.memory.Action = "build";
					break;
				case "repairer":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Damaged_Structures(creep.room));//could use a better algorithm
					creep.memory.Action = "repair";
					break;
			}
		}
		if(creep.memory.Target == undefined){
		    creep.memory.Target = {id: 0};
		}
	}
};

module.exports = Targets;