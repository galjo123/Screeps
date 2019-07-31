const static_room_info = require("static_room_info");

class room_object {
	constructor(room){
		this.stage_state = "REGULAR";
		this.counter = 0;
		this.static_room_info = new static_room_info(room);
		if(this.static_room_info.sourckeeper_lairs){
			this.state = "SOURCE_KEEPER_TERRITORY";
		} else {
			this.state = "PEACE";
		}
		this.dynamic_room_info = {};
		this.preavious_construction_sites = {};
		this.preavious_damaged_structures = {};
	}
}

module.exports = room_object;