const Targets = {
	Assign(creep){
		const Targets = require("Targets");

		if(creep.carry.energy == 0){
			switch (creep.memory.role){
				case "harvester":
					creep.memory.Target =  creep.memory.Permanent_Target;
					creep.memory.Action = "harvest";
					break;
				case "miner":
					creep.memory.Target =  creep.memory.Permanent_Target;
					creep.memory.Action = "harvest";
					break;
				case "upgrader":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, false));
					creep.memory.Action = "withdraw";
					if(creep.memory.Target == undefined){
						creep.memory.Target = creep.pos.findClosestByPath(Targets.Sources(creep.room, false));
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
				/*case "ranged_soldier":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Enemy_Creeps(creep.room));
					creep.memory.Action = "rangedAttack";
					break;*/
			}
		} else if(creep.carry.energy <= creep.carryCapacity) {
			switch(creep.memory.role){
				case "harvester":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, "harvester"));
					creep.memory.Action = "transfer";
					break;
				case "miner":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, "miner"));
					creep.memory.Action = "transfer";
					break;
				case "upgrader":
					creep.memory.Target = Targets.Controller(creep.room);
					creep.memory.Action = "upgradeController";
					break;
				case "builder":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Construction_Sites(creep.room));
					creep.memory.Action = "build";
					break;
				case "repairer":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Damaged_Structures(creep.room));
					creep.memory.Action = "repair";
					break;
			}
		}

		if(creep.carry.H == 0){
			switch (creep.memory.role){
				case "miner":
					creep.memory.Target =  creep.memory.Permanent_Target;
					creep.memory.Action = "harvest";
					break;
				}
		} else if(creep.carry.H <= creep.carryCapacity){
			switch (creep.memory.role){
				case "miner":
					creep.memory.Target = creep.pos.findClosestByPath(Targets.Containers(creep.room, "miner"));
					creep.memory.Action = "transfer";
					break;
				}
		}

		if(creep.memory.Target == undefined){
		    creep.memory.Target = {id: 0};
		}
	}
};

module.exports = Targets;