const Explorer_State_Macine = {
	SPAWNING: {
		FINISHED_SPAWNING: require("Finished_Spawning")
	},

	IDLE: {
		TARGET_AQUIRED: require("Explorer_Target_Aquired")
	},

	EXPLORE: {
		NO_TARGET: require("No_Target"),

		STATE: require("Explorer_State_Explore")
	}
};

module.exports = Explorer_State_Macine;