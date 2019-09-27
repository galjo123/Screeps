const Soldier_State_Machine = {
	SPAWNING: {
		FINSIHED_SPAWNING: require("Finished_Spawning")
	},

	IDLE: {
		STATE: require("Soldier_State_Idle"),

		ORDERS_GIVEN: require("Soldier_Orders_Given")
	},

	EXECUTING_ORDERS: {
		NO_TARGET: require("No_Target"),

		INVALID_TARGET: require("Invalid_Target"),

		ORDERS_EXECUTED: require("Soldier_Orders_Executed"),

		STATE: require("Soldier_State_Executing_Orders")
	}
};

module.exports = Soldier_State_Machine;