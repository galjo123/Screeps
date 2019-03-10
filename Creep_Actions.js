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
	}
};

module.exports = Creep_Action;