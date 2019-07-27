module.exports = (creep) => {
	if(!creep.spawning){
		creep.memory.state = "IDLE";
	}
};