const Convert_to_Objects = {
	Execute(memory_array, objects_array){
		memory_array.forEach(memory_object => {
			const object = Game.getObjectById(memory_object.id);
			objects_array.push(object);
		});
	}
};

module.exports = Convert_to_Objects;