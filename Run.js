const memory = require("memory");

const Run = {
	All(type, function_req){
		for(let name in Game[type]){
			const element = Game[type][name];
			function_req.call(this, element);
		}
	},

	All_Memory_Rooms(function_req){
		for(let room_memory_object in memory.rooms){
			function_req.call(this, room_memory_object);
		}
	}
};

module.exports = Run;