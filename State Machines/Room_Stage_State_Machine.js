const Room_Stage_State_Machine = {
	REGULAR: {
		STATE: require("State_Regular"),

		CONTAINERS: require("Transition_To_Containers")
	},

	CONTAINERS:{
		STATE: require("State_Containers"),

		LINKS: require("Transition_To_Links"),

		LOST_CONTAINERS: require("Transition_to_Regular")
	},

	LINKS:{
		STATE: require("State_Links"),

		LOST_LINKS: require("Transition_From_Links")
	}
};

module.exports = Room_State_Machine;