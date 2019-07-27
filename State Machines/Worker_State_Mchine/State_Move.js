module.exports = (creep) => {
	creep.moveTo(Game.getObjectById(creep.memory.target.id), {visualizePathStyle: {stroke: "ffffff", opacity: 0.5, color: "gold"}});
};