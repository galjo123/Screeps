class room_info {
	constructor(room){
		const _ = require("lodash");
///////////////FIND_MY_STUFF////////////////////////////////////////
		this.my_creeps = room.find(FIND_MY_CREEPS);
		this.my_structures = room.find(FIND_MY_STRUCTURES);
		this.structures = room.find(FIND_STRUCTURES);
		this.my_spawns = room.find(FIND_MY_SPAWNS);
		this.my_construction_sites = room.find(FIND_MY_CONSTRUCTION_SITES);
///////////////FIND_RESOURCES////////////////////////////////////////
		this.sources = room.find(FIND_SOURCES);
		this.minerals = room.find(FIND_MINERALS);
///////////////FIND_HOSTILES/////////////////////////////////////////
		this.enemy_creeps = room.find(FIND_HOSTILE_CREEPS);
		this.enemy_structures = room.find(FIND_HOSTILE_STRUCTURES);
		this.enemy_spawns = room.find(FIND_HOSTILE_SPAWNS);
		this.enemy_construction_sites = room.find(FIND_HOSTILE_CONSTRUCTION_SITES);
///////////////FIND_TOMATO'S_STUFF////////////////////////////////////////
		/*this.tzervo_creeps = _.filter(FIND_CREEPS, {owner: {username: "tzervo"}});
		this.tzervo_structures = _.filter(FIND_STRUCTURES, {owner: {username: "tzervo"}});
		this.tzervo_spawns = _.filter(FIND_SPAWNS, {owner: {username: "tzervo"}});
		this.tzervo_construction_sites = _.filter(FIND_CONSTRUCTION_SITES, {owner: {username: "tzervo"}});*/
///////////////PLACEHOLDER////////////////////////////////////////
		this.sourcekeepers = _.remove(this.enemy_creeps, {owner: {username: "Source Keeper"}});
		
		this.spots_per_source = new Map();
		this.E_harvesting_spots = 0;

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
			this.E_harvesting_spots += spots;
		});
	}
}

module.exports = room_info;