const memory = require("memory");
const Targets = require("Targets");

const Room_Development_Checker = {
	Run(room){
		if(Targets.Containers(room).length >= Object.keys(memory.rooms[room.name].static_room_info.sources).length){
			memory.rooms[room.name].room_development.containers = true;
		} else {
			memory.rooms[room.name].room_development.containers = false;
		}

		if(Targets.Links(room).lenght >= Object.keys(memory.rooms[room.name].static_room_info.sources).length + 1){
			memory.rooms[room.name].room_development.links = true;
		} else {
			memory.rooms[room.name].room_development.links = false;
		}
	}
};

module.exports = Room_Development_Checker;