const Target_Picker = {
	Pick(creep, targets){
		let target;
		const targets_in_room = _.filter(targets, target => {
			if(target){
				return target.room.name == creep.room.name;
			}
		});
		
		if(targets_in_room.length){
			target = creep.pos.findClosestByPath(targets);
		} else {
			target = targets[0];//COULD USE EXTRA WORK
		}

		return target;
	}
};

module.exports = Target_Picker;