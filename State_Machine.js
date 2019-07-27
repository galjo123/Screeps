const State_Machine = {
	Activate(State_Machine, object){
		const Run = require("Run");

		Run.All(object + "s", object => {
			const StateMachine = require(State_Machine);

			const State = StateMachine[object.memory.state];
				
			for(let funq in State){
				State[funq](object);
			}
		});
	}
};
	
module.exports = State_Machine;
