const static_room_info = require("static_room_info");
const room_development = require("room_development");

class room_object {
	constructor(room){
		this.room_development = new room_development(room);
		this.counter = 0;
		this.static_room_info = new static_room_info(room);
		if(this.static_room_info.sourckeeper_lairs){
			this.state = "SOURCE_KEEPER_TERRITORY";
		} else {
			this.state = "PEACE";
		}
		this.dynamic_room_info = {};
	}
}

module.exports = room_object;