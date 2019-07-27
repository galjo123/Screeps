module.exports = (creep) => {
	const Target_Assignment = require("Target_Assignment");

	Target_Assignment.Execute(creep);

	if(creep.memory.target.id != 0){
		switch(creep.memory.role){
			case "harvester":
				if(creep.carry.energy == creep.carryCapacity){
					creep.memory.state = "RESUPPLY";
				} else {
					creep.memory.state = "WORK";
				}
		}
	}
};