class creep_object {
	constructor(role,state, permanent_target){
		this.role = role;
		this.state = state;
		this.target = {id:"0"};
		this.permanent_target = permanent_target;
		this.action = "";
	}
}

module.exports = creep_object;