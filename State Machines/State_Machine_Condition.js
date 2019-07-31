const State_Machine_Condition = {
	Worker_State_Machine: require("Worker_SM_Condition"),

	Soldier_State_Machine: (creep) => {return false;},

	Room_State_Machine: (room) => {return true;},

	Room_Stage_State_Machine: (room) => {return true;}
};

module.exports = State_Machine_Condition;