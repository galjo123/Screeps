const Permanent_Targets = {
	Assign(creep){
		const Targets = require("Targets");

		switch(creep.memory.role){
			case "harvester":
				creep.memory.Permanent_Target = Targets.Sources(creep.room, true)[0];
				break;
			case "miner":
				creep.memory.Permanent_Target = Targets.Minerals(creep.room)[0];
				break;
		}
		if(creep.memory.Permanent_Target == undefined){
		    creep.memory.Permanent_Target = {id: 0};
		}
	}
};

module.exports = Permanent_Targets;