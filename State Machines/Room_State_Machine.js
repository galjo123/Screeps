const Room_State_Machine = {
	PEACE: {
		STATE: require("State_Peace"),

		ENEMY_INVASION: require("Transition_To_War"),
	},

	SOURCE_KEEPER_TERRITORY:{
		STATE: require("State_Source_Keeper_Territory"),

		TARGET_AQUIRED: require("Transition_To_War")
	},

	WAR:{
		STATE: require("State_War"),
		
		ENEMIES_ELIMINATED: require("Transition_From_War"),
	}
};

module.exports = Room_State_Machine;