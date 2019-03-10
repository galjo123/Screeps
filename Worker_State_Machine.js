const Worker_State_Machine = {
	run: (creep) => {
		const Creep_Action = require("Creep_Actions");
		//const Targets = require("Assign_Targets");
		const target = Game.getObjectById(creep.memory.Target.id);

		switch(creep.memory.state){
			case "SPAWNING":
				if(!creep.spawning){
					creep.memory.state = "IDLE";
				}
				break;
			case "IDLE":
				Targets.Assign(creep);
				if(target){
					creep.memory.state = "WORKING";
				}
				break;
			case "WORKING":
				Creep_Action[creep.memory.Action](creep, target);
				/*if(Creep_Action[creep.memory.Action](creep, target) == ERR_FULL ||
					Creep_Action[creep.memory.Action](creep, target) == ERR_INVALID_TARGET){
					Targets.Assign(creep);
				}*/
				if(Creep_Action[creep.memory.Action](creep, target) == ERR_NOT_IN_RANGE){
					creep.memory.state = "MOVING";
				}
				if(target == null){
					creep.memory.state = "IDLE";
				}
				break;
			case "MOVING":
				creep.moveTo(target);
				if(Creep_Action[creep.memory.Action](creep, target) != ERR_NOT_IN_RANGE){
					creep.memory.state = "WORKING";
				}
				break;
		}
	}
};
module.exports = Worker_State_Machine;