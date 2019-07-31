class static_room_info {
	constructor(room){
		const _ = require("lodash");
		///////////////FIND_RESOURCES////////////////////////////////////////
		this.sources = room.find(FIND_SOURCES);
		this.minerals = room.find(FIND_MINERALS);

		this.spots_per_source = new Map();
		this.energy_harvesting_spots = 0;

		this.sources.forEach( source => {
			const terrain_on_position = room.lookForAtArea(
				LOOK_TERRAIN,
				source.pos.y-1,
				source.pos.x-1,
				source.pos.y+1,
				source.pos.x+1,
				true
			);
			const spots = 9 - _.countBy(terrain_on_position, "terrain").wall;
			this.spots_per_source[source.id] = spots;
			this.energy_harvesting_spots += spots;
		});

		this.sourcekeeper_lairs = _.remove(room.find(FIND_STRUCTURES), {owner: {username: "Source Keeper"}});
	}
}

module.exports = static_room_info;