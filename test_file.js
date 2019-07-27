object = {
	idle:{
		state: (state) => {return state;},

		target_aquired: (state) => {return state;}
	},
	work:{
		state: (state) => {return state;},

		empty: (state) => {return state;}
	}
};

const Creep_State = object.idle;
//let output;

for(let state in Creep_State){
	//output = state_function("idle");
	console.log(Creep_State[state]("idle"));
}

