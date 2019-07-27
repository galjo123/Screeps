class Dynamic_Room_Info {
	constructor(room){
		const _ = require("lodash");
///////////////FIND_MY_STUFF////////////////////////////////////////
		this.My_Creeps = room.find(FIND_MY_CREEPS);
		this.Structures = room.find(FIND_STRUCTURES);
		this.Construction_Sites = room.find(FIND_CONSTRUCTION_SITES);
		this.Flags = room.find(FIND_FLAGS);
///////////////FIND_HOSTILES/////////////////////////////////////////
		this.Enemy_Creeps = _.filter(room.find(FIND_HOSTILE_CREEPS), creep => creep.owner.username != "tzervo");
		this.Enemy_Structures = _.filter(room.find(FIND_HOSTILE_STRUCTURES), structure => structure.owner.username != "tzervo");
		this.Enemy_Construction_Sites = _.filter(room.find(FIND_HOSTILE_CONSTRUCTION_SITES), construction_site => construction_site.owner.username != "tzervo");
///////////////FIND_TOMATO'S_STUFF////////////////////////////////////////
		/*this.tzervo_creeps = _.filter(FIND_CREEPS, {owner: {username: "tzervo"}});
		this.tzervo_structures = _.filter(FIND_STRUCTURES, {owner: {username: "tzervo"}});
		this.tzervo_spawns = _.filter(FIND_SPAWNS, {owner: {username: "tzervo"}});
		this.tzervo_construction_sites = _.filter(FIND_CONSTRUCTION_SITES, {owner: {username: "tzervo"}});*/
///////////////PLACEHOLDER////////////////////////////////////////
		this.Sourcekeeper_Lairs = _.remove(this.Enemy_Structures, {owner: {username: "Source Keeper"}});
	}
}

module.exports = Dynamic_Room_Info;