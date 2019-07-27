const Targets = require("Targets");

module.exports = (creep) => {
	const idle_flag = Targets.Idle_Flag(creep.room);
	
	if(creep.pos.x != idle_flag.pos.x || creep.pos.y != idle_flag.pos.y) {
		creep.moveTo(idle_flag);
	}
};