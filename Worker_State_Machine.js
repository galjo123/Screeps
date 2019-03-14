const Worker_State_Machine = {
	run: (creep) => {
		const Creep_Action = require("Creep_Actions");
		const Targets = require("Assign_Targets");
		const Permanent_Targets = require("Assign_Permanent_Targets");
		const target = Game.getObjectById(creep.memory.Target.id);

		switch(creep.memory.state){
			case "SPAWNING":
				if(!creep.spawning){
					creep.memory.state = "IDLE";
				}
				break;
			case "IDLE":
				Targets.Assign(creep);
				if(creep.memory.Target.id == 0 || creep.memory.Target == ""){
					Permanent_Targets.Assign(creep);
				}
/////////////////CREEP_GETS_A_TARGET////////////////////////////
				if(target){
					creep.memory.state = "WORKING";
				}
				break;
			case "WORKING":
				Creep_Action[creep.memory.Action](creep, target);
/////////////////SOMETHING_HAPPENS_TO_THE_TARGET////////////////////////////
				if(creep.carry.energy == creep.carryCapacity ||
					Creep_Action[creep.memory.Action](creep, target) == -8 ||
					Creep_Action[creep.memory.Action](creep, target) == -7 ||
					Creep_Action[creep.memory.Action](creep, target) == -6){
					Targets.Assign(creep);
				}
/////////////////TARGET_IS_NOT_IN_RANGE////////////////////////////
				if(Creep_Action[creep.memory.Action](creep, target) == ERR_NOT_IN_RANGE){
					creep.memory.state = "MOVING";
				}
/////////////////CREEP_DOESN'T_HAVE_TARGETS_ANYMORE////////////////////////////
				if(target == null){
					creep.memory.state = "IDLE";
				}
/////////////////REPAIRER_FINISHED_WORK////////////////////////////
				if(creep.memory.role == "repairer" && target.hits == target.hitsMax){
					Targets.Assign(creep);
				}
				break;
			case "MOVING":
				creep.moveTo(target, {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "gold"}});
/////////////////CREEP_IS_IN_RANGE////////////////////////////
				if(Creep_Action[creep.memory.Action](creep, target) != ERR_NOT_IN_RANGE){
					creep.memory.state = "WORKING";
				}
				break;
		}
	}
};
module.exports = Worker_State_Machine;