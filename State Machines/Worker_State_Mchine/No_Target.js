module.exports = (creep) => {
	if(creep.memory.target == null){
		creep.memory.state = "IDLE";
		creep.memory.target = {id: 0};
		
	} else if(creep.memory.target.id == 0){
		creep.memory.state = "IDLE";
	}
};