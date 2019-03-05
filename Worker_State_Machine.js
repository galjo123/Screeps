const Worker_State_Machine = {
	run: (creep) => {
		const Creep_Action = require("Creep_Actions");
		const target = Game.getObjectById(creep.memory.Target.id);

		switch(creep.memory.state){
			case "IDLE":
				if(target){
					creep.memory.state = "WORKING";
				}
				break;
			case "WORKING":
				Creep_Action[creep.memory.Action](creep, target);
				if(Creep_Action[creep.memory.Action](creep, target) == ERR_NOT_IN_RANGE){
					creep.memory.state = "MOVING";
				}
				if(!target){
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