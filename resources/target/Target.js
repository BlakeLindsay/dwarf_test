import {statLib} from "./statLib.js";

var IDGiver = 0;

function IDGet() {
	return IDGiver++;
}

let actionLib = {
	dumbMove: (char) => {
		let num = Math.floor(char.location.exits.length * Math.random());
		char.goExit(char.location.exits[num]);
	}
};

class Target {
	newDisplayable(name, value, target, color) {
		return {
			name: name,
			value: value,
			target: target,
			color: color
		};
	}
}

class Character{
	// stats = new Stats();
	constructor(name, location) {
		// super();
		this.ID = IDGiver++;
		this.location = location;
		this.stats = {};
		this.skills = {};
		this.action = () => {console.log(`${this.stats.name.value} did nothing.`)};
		// this.initStats2(name);
		this.initStats();
		this.stats.name.value = name;
	}

	addStat(name, value, target, color) {
		this.stats[name] = newDisplayable(name, value, target, color);
	}

	addSkill(name, value, target, color) {
		this.skills[name] = newDisplayable(name, value, target, color);
	}

	initStats() {
		let statTemplate = ["name", "health", "stamina", "mana", "strength", 'dexterity', 'intelligence', 'spirit', 'martial', 'athletics', 'divination', 'casting', 'enchanting', 'arcane', 'aeromancy', 'aquamancy', 'geomancy', 'illusion', 'lifeweaving'];
		statTemplate.forEach( (stat) => {
			this.stats[stat] = {...statLib[stat]};
		});
	};

	initStat(stats) {
		stats.forEach( (stat) => {
			this.stats[stat] = {...statLib[stat]};
		});
	}

	getDisplay() {
		let display = Object.values(this.stats);
		display.concat(Object.values(this.skills));
		return display;
	}

	getTargetable(callback) {
		let targetable = document.createElement('div');
		let char = this;

		let locationDiv = document.createElement('div');
		locationDiv.className = 'label';
		let locationLabel = document.createElement('span');
		locationLabel.innerText = 'Location: ';
		locationLabel.style.color = 'grey';
		locationDiv.append(locationLabel);
		let locationValue = document.createElement('span');
		locationValue.innerText = this.location.name;
		if (this.location.getTargetable) {
			locationValue.className = 'clickable';
		}
		if (callback && char.location) locationValue.onclick = function() {callback(char.location)};
		locationDiv.append(locationValue);
		targetable.append(locationDiv);

		this.getTargetableStat(targetable, this.stats.name, callback, this);
		this.getTargetableStat(targetable, this.stats.health);
		this.getTargetableStat(targetable, this.stats.stamina);
		this.getTargetableStat(targetable, this.stats.mana);
		this.getTargetableStat(targetable, this.stats.strength);
		this.getTargetableStat(targetable, this.stats.dexterity);
		this.getTargetableStat(targetable, this.stats.intelligence);
		this.getTargetableStat(targetable, this.stats.spirit);
		this.getTargetableStat(targetable, this.stats.martial);
		this.getTargetableStat(targetable, this.stats.athletics);
		this.getTargetableStat(targetable, this.stats.divination);
		this.getTargetableStat(targetable, this.stats.casting);
		this.getTargetableStat(targetable, this.stats.enchanting);
		this.getTargetableStat(targetable, this.stats.arcane);
		this.getTargetableStat(targetable, this.stats.aeromancy);
		this.getTargetableStat(targetable, this.stats.aquamancy);
		this.getTargetableStat(targetable, this.stats.geomancy);
		this.getTargetableStat(targetable, this.stats.illusion);
		this.getTargetableStat(targetable, this.stats.lifeweaving);

		return targetable;
	}

	getTargetableStat(targetable, stat, callback, target) {
		let statDiv = document.createElement('div');
		statDiv.className = 'label';
		let statLabel = document.createElement('span');
		statLabel.innerText = stat.label;
		statLabel.style.color = stat.color;
		if (stat.filter) {
			statLabel.style.filter = stat.filter;
		}
		if (stat.textShadow) {
			statLabel.style.textShadow = stat.textShadow;
		}
		statDiv.append(statLabel);
		let statValue = document.createElement('span');
		statValue.innerText = stat.value;
		if (stat.clickable) {
			statValue.className = "clickable";
		}
		if (callback && target) statValue.onclick = function() {callback(target)};
		statDiv.append(statValue);
		targetable.append(statDiv);
	}

	act() {
		let char = this;
		this.action(char);
	}

	goExit(exit) {
		let index = this.location.exits.indexOf(exit);
		console.log(index);
		if (index > -1) {
			// console.log(this);
			let lastLocation = this.location;
			let charIndex = this.location.characters.indexOf(this);
			this.location.characters.splice(charIndex, 1);
			let otherLocation = exit.exit1 !== this.location ? exit.exit1 : exit.exit2;
			otherLocation.characters.push(this);
			this.location = otherLocation;
			console.log(`${this.stats.name.value} moved from ${lastLocation.name} to ${otherLocation.name}`);
			// console.log(this);
		} else {
			throw new Error(`exit ${exit} not found in ${this.location}`);
		}
	}
}

function newDisplayable(name, value, target, color) {
	return {
		name: name,
		value: value,
		target: target,
		color: color
	};
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

export { Target, Character, actionLib, statLib, IDGet };