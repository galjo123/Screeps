const Run = require("Run");
const Targets = require("Targets");

const Global_Targets = {
	Sources(){
		let sources = [];
		Run.All("room", room => {
			sources.push(Targets.Sources());
		});
		return sources;
	}
};

module.exports = Global_Targets;