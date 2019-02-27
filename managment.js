const do_for = require("do_for");

const managment = {

	start_of_tick(){
/////////MEMORY_DELETION/////////////////////////////
		for(let name in Memory.creeps){
			if(!Game.creeps[name]){
				delete(Memory.creeps[name]);
			}
		}
/////////ROOM_INFO_UPDATE/////////////////////////////
		do_for.All( room => {
			const room_info = require("room_info");
			room.memory.roomInfo = new room_info(room);
		});
	},

	

	run_each_tick() {
		managment.start_of_tick();
	}
};

module.exports = managment;