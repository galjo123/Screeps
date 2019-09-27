const Convert_Initial_To = {
	Uppercase(string){
		const initial = string[0].toUpperCase();
		const output = string.replace(string[0], initial);
		return output;
	}
};

module.exports = Convert_Initial_To;