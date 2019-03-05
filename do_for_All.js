const do_for = {
	All(type, function_req){
		for(let name in Game[type]){
			const element = Game[type][name];
			function_req.call(this, element);
		}
	}
};

module.exports = do_for;