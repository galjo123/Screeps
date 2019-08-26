class flag_object {
	constructor(flag, flag_id){
		this.id = flag_id;
		this.name = flag.name;
		this.room = flag.room;
		this.color = flag.color;
		this.secondary_color = flag.secondaryColor;
	}
}

module.exports = flag_object;