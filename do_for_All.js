const Do_For = {
	All(type, function_req){
		for(let name in Game[type]){
			const element = Game[type][name];
			function_req.call(this, element);
		}
	}
};

module.exports = Do_For;