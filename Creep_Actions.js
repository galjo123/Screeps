const Resource = require("Resources");

const Creep_Action = {
	harvest(creep, target){
		return creep.harvest(target);
	},

	transfer(creep, target){
		return creep.transfer(target, Resource.get(creep.memory.role));
	},
	
	upgradeController(creep, target){
		return creep.upgradeController(target);
	},

	build(creep, target){
		return creep.build(target);
	},

	repair(creep, target){
		return creep.repair(target);
	},
	
	withdraw(creep,target){
		return creep.withdraw(target, Resource.get(creep.memory.role));
	},

	rangedAttack(creep, target){
		return creep.rangedAttack(target);
	}
};

module.exports = Creep_Action;