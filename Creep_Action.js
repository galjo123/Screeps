const Creep_Action = {
	harvest(creep, target){
		return creep.harvest(target);
	},

	pickup(creep, target){
		return creep.pickup(target);
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
	
	withdraw(creep, target){
		return creep.withdraw(target, RESOURCE_ENERGY);
	},

	rangedAttack(creep, target){
		return creep.rangedAttack(target);
	}
};

module.exports = Creep_Action;