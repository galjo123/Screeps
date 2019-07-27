class Static_Room_Info {
	constructor(room){
		const _ = require("lodash");
		///////////////FIND_RESOURCES////////////////////////////////////////
		this.Sources = room.find(FIND_SOURCES);
		this.Minerals = room.find(FIND_MINERALS);

		this.Spots_per_Source = new Map();
		this.Energy_Harvesting_Spots = 0;

		this.Sources.forEach( source => {
			const terrain_on_position = room.lookForAtArea(
				LOOK_TERRAIN,
				source.pos.y-1,
				source.pos.x-1,
				source.pos.y+1,
				source.pos.x+1,
				true
			);
			const spots = 9 - _.countBy(terrain_on_position, "terrain").wall;
			this.Spots_per_Source[source.id] = spots;
			this.Energy_Harvesting_Spots += spots;
		});
	}
}

module.exports = Static_Room_Info;