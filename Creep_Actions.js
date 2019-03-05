const Creep_Action = {
	harvest(creep, target){
		return creep.harvest(target);
	},
	transfer(creep, target){
		return creep.transfer(target, RESOURCE_ENERGY);
	},
};

module.exports = Creep_Action;