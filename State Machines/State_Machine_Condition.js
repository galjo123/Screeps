const State_Machine_Condition = {
	Worker_State_Machine: require("Worker_SM_Condition"),

	Explorer_State_Machine: require("Explorer_SM_Condition"),

	Claimer_State_Machine: require("Claimer_SM_Condition"),

	Soldier_State_Machine: require("Soldier_SM_Condition"),

	Room_State_Machine: (room) => {return true;},
};

module.exports = State_Machine_Condition;