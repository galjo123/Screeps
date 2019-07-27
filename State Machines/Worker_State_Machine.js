const Worker_State_Machine = {
	SPAWNING: {
		FINISHED_SPAWNING: require("Finished_Spawning")
	},
	IDLE:{
		STATE: require("State_Idle"),

		TARGET_AQUIRED: require("Target_Aquired")
	},
	WORK:{
		NO_TARGET: require("No_Target"),
		
		OUT_OF_RESOURCE: require("Out_Of_Resource"),

		TARGET_FULL: require("Target_Full"),

		NOT_IN_RANGE: require("Not_In_Range"),

		STATE: require("State_Action")
	},
	RESUPPLY:{
		NO_TARGET: require("No_Target"),

		FULL_CAPACITY: require("Full_Capacity"),

		NOT_IN_RANGE: require("Not_In_Range"),

		STATE: require("State_Action"),
	},
	MOVE:{
		NO_TARGET: require("No_Target"),

		IN_RANGE: require("In_Range"),

		STATE: require("State_Move")
	}
};

module.exports = Worker_State_Machine;