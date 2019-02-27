const do_for = {
	
	All(objects_hash, function_req){
		for(let name in objects){
			const element = objects_hash[name];
			function_req(element);
		}
	}
};

module.exports = do_for;