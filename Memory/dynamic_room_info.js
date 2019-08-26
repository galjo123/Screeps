class dynamic_room_info {
	constructor(room){
		const _ = require("lodash");
///////////////FIND_MY_STUFF////////////////////////////////////////
		this.my_creeps = room.find(FIND_MY_CREEPS);
		this.structures = room.find(FIND_STRUCTURES);
		this.construction_sites = room.find(FIND_CONSTRUCTION_SITES);
		this.flags = room.find(FIND_FLAGS);
		this.dropped_resources = room.find(FIND_DROPPED_RESOURCES);
		this.tombstones = room.find(FIND_TOMBSTONES);
///////////////FIND_HOSTILES/////////////////////////////////////////
		this.enemy_creeps = _.filter(room.find(FIND_HOSTILE_CREEPS), creep => creep.owner.username != "tzervo");
		this.enemy_structures = _.filter(room.find(FIND_HOSTILE_STRUCTURES), structure => structure.owner.username != "tzervo");
		this.enemy_construction_Sites = _.filter(room.find(FIND_HOSTILE_CONSTRUCTION_SITES), construction_site => construction_site.owner.username != "tzervo");
///////////////FIND_TOMATO'S_STUFF////////////////////////////////////////
		/*this.tzervo_creeps = _.filter(FIND_CREEPS, {owner: {username: "tzervo"}});
		this.tzervo_structures = _.filter(FIND_STRUCTURES, {owner: {username: "tzervo"}});
		this.tzervo_spawns = _.filter(FIND_SPAWNS, {owner: {username: "tzervo"}});
		this.tzervo_construction_sites = _.filter(FIND_CONSTRUCTION_SITES, {owner: {username: "tzervo"}});*/
	}
}

module.exports = dynamic_room_info;