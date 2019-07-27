const Targets = require("Targets");
const Global_Targets = require("Global_Targets");

const Target_Assignment = {
	Execute(creep){
		switch(creep.memory.role){
			case "harvester":
				if(creep.memory.state == "WORK" || creep.memory.state == "IDLE"){
					//if(Targets.Containers(creep.room)){
				//		creep.memory.target = creep.pos.findClosestByPath(Global_Targets.Containers());
				//	} else {
						const spawn = Targets.Spawns(creep.room)[0];
						if(spawn.energy < spawn.energyCapacity){
							creep.memory.target = spawn;
						} else {
							creep.memory.target = {id: 0};
						}
				//	}
					creep.memory.action = "transfer";
				}
				if(creep.memory.state == "RESUPPLY"){
					creep.memory.target = creep.pos.findClosestByPath(/*Global_*/Targets.Sources(creep.room));
					creep.memory.action = "harvest";
				}
		}
	}
};

module.exports = Target_Assignment;