const hue = [1,2,3,4];
const nya = [];
const _ = require("lodash");

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

const object_array1 = [{id: "123", store:{}, structureType: "container"}, {id: "234", store:{}, structureType: "container"}, {id: "345", store:{}, structureType: "container"}];
const object_array2 = [{id: "123", store:{}, structureType: "container"}, {id: "567", store:{}, structureType: "container"}];
const object_array3 = [{id: "789", store:{}, structureType: "container"}];

let string = "alpha";
const current_flag = "Alpha2";
const number = Number(current_flag[current_flag.length - 1]);
const next_flag = string + (number + 1);
console.log(next_flag);