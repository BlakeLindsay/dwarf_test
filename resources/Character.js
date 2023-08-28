var charIDGiver = 0;
export var charList = [];

export class Character {
	// stats = new Stats();
	constructor(name, location) {
		this.charID = charIDGiver++;
		charList.push(this);
		this.location = location;
		this.initStats1(name);
	}
	initStats1(name) {
		this.stats = {};
		this.stats.name = new Stat('Name', 'text', name);
		this.stats.health = new Stat('Health', 'number', 100, 100, 0);
	}
}

class Displayable {

}

class ID {
	name = {
		name: 'Name',
		type: 'text',
		value: "",
	};
}

class Stat {
	constructor(name, type, value, max, min) {
		this.name = name;
		this.type = type;
		this.value = value;
		this.max = max;
		this.min = min;
	}
}
