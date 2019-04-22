const Resource = {
	get(role){
		if(role == "miner"){
			return RESOURCE_HYDROGEN;
		} else {
			return RESOURCE_ENERGY;
		}
	}
};

module.exports = Resource;