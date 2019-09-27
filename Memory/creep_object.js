class creep_object {
	constructor(){
		this.state = "SPAWNING";
		this.target = {id:"0"};
		this.action = "";
		this.current_flag = "";
	}
}

module.exports = creep_object;