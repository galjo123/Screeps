const Target_Priority = {
	Get(){
		for (var i=0; i < arguments.length; i++) {
	        if(arguments[i].length > 0){
	        	return arguments[i];
	        }
	    }
	    return [];
	}
};

module.exports = Target_Priority;