const Creep_Action = {
	harvest(creep, target){
		return creep.harvest(target);
	},

	transfer(creep, target){
		return creep.transfer(target, RESOURCE_ENERGY);
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
		return creep.withdraw(target, RESOURCE_ENERGY);
	}
};

module.exports = Creep_Action;