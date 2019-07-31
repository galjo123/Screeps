const Run = require("Run");
const Targets = require("Targets");
const memory = require("memory");
const _ = require("lodash");

const Global_Targets = {
	Sources(){
		let sources = [];
		Run.All("room", room => {
			const colony_flag = _.filter(memory.rooms[room.name].dynamic_room_info.flags, flag => {
				if(memory.flags[flag.name].color == COLOR_YELLOW){
					return flag;
				}
			});
			if(colony_flag){
				sources.push(Targets.Sources(room));
			}
		});
		return sources;
	}
};

module.exports = Global_Targets;