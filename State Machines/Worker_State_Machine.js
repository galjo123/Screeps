const Worker_State_Machine = {
	run: (creep) => {
		const Creep_Action = require("Creep_Actions");
		const Other_Targets = require("Targets");
		const Targets = require("Assign_Targets");
		const Permanent_Targets = require("Assign_Permanent_Targets");
		let target = Game.getObjectById(creep.memory.Target.id);
		if(target == null){
			target = 0;
		}

		switch(creep.memory.state){
			case "SPAWNING":
				if(!creep.spawning){
					creep.memory.state = "IDLE";
				}
				break;
			case "IDLE":
				Targets.Assign(creep);
				creep.moveTo(Game.flags["IDLE_FLAG"]);///////////////!!!!!!!!!!!!!NEEDS_RETESTING_AND_CHANGING
				if(creep.memory.Target.id == 0 || creep.memory.Target == ""){
					Permanent_Targets.Assign(creep);
				}
/////////////////CREEP_GETS_A_TARGET////////////////////////////
				if(target){
					creep.memory.state = "WORKING";
				}
/////////////////IN_CASE_CREEP_REMAINS_IDLE////////////////////
				
				break;
			case "WORKING":
/////////////////CREEP_DOESN'T_HAVE_TARGETS_ANYMORE////////////////////////////
				if(creep.memory.Target.id == 0){
					creep.memory.state = "IDLE";
				}
				Creep_Action[creep.memory.Action](creep, target);
/////////////////SOMETHING_HAPPENS_TO_THE_TARGET////////////////////////////
				if(creep.carry.energy == creep.carryCapacity ||
					Creep_Action[creep.memory.Action](creep, target) == -8 ||
					Creep_Action[creep.memory.Action](creep, target) == -7 ||
					Creep_Action[creep.memory.Action](creep, target) == -6){
					Targets.Assign(creep);
				}
				if(target.hits == target.hitsMax && creep.memory.Action == "repair"){
					Targets.Assign(creep);
				}
				if(target.structureType == STRUCTURE_CONTAINER || target.structureType == STRUCTURE_STORAGE){
					if(target.store.energy == 0 && creep.memory.Action == "withdraw"){
						Targets.Assign(creep);
					}
				}
/////////////////TARGET_IS_NOT_IN_RANGE////////////////////////////
				if(Creep_Action[creep.memory.Action](creep, target) == ERR_NOT_IN_RANGE){
					creep.memory.state = "MOVING";
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