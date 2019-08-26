const hue = [1,2,3,4];
const nya = [];

object = {
	idle:{
		state: 1
	},
	work:{
		state: 3,

		empty: 4
	}
};

const sources = {source1: {id: 123}, source2: {id:234}};

function sum() {
    for (var i=0; i < arguments.length; i++) {
        if(arguments[i].length > 0){
        	return arguments[i];
        }
    }
}

if(nya){
	console.log(1);
} else console.log(2);