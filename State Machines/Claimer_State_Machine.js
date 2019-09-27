const Explorer_State_Macine = {
	SPAWNING: {
		FINISHED_SPAWNING: require("Finished_Spawning")
	},

	IDLE: {
		TARGET_AQUIRED: require("Claimer_Target_Aquired")
	},

	CLAIM: {
		NO_TARGET: require("No_Target"),

		STATE: require("Claimer_State_Claim")
	}
};

module.exports = Explorer_State_Macine;