
let actionLib = {
	dumbMove: (char) => {
		let num = Math.floor(char.location.exits.length * Math.random());
		char.goExit(char.location.exits[num]);
	}
};

export {actionLib};