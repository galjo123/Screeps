const memory = require("memory");

module.exports = (creep) => {
	creep.moveTo(Game.getObjectById(memory.creeps[creep.name].target.id), {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "gold"}});
};