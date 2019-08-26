const Worker_State_Machine = {
	SPAWNING: {
		FINISHED_SPAWNING: require("Finished_Spawning")
	},
	IDLE:{
		STATE: require("Worker_State_Idle"),

		TARGET_AQUIRED: require("Worker_Target_Aquired")
	},
	WORK:{
		NO_TARGET: require("No_Target"),

		INVALID_TARGET: require("Invalid_Target"),
		
		OUT_OF_RESOURCE: require("Worker_Out_Of_Resource"),

		TARGET_FULL: require("Worker_Target_Full"),

		TARGET_REPAIRED: require("Worker_Target_Repaired"),

		STATE: require("Worker_State_Action")
	},
	RESUPPLY:{
		NO_TARGET: require("No_Target"),

		INVALID_TARGET: require("Invalid_Target"),

		TARGET_EMPTY: require("Worker_Target_Empty"),

		FULL_CAPACITY: require("Worker_Full_Capacity"),

		STATE: require("Worker_State_Action"),
	}
};

module.exports = Worker_State_Machine;