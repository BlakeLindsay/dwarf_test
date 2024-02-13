import { IDGet } from "./Target.js";
import { objectStatLib } from "./object/objectStatLib.js";
// import { nameValueLabel } from "./display/nameValueLabel.js";

class Obj {
	constructor(name, location) {
		this.ID = IDGet();
		this.location = location;
		this.stats = {};
		this.uses = {};
		this.action = () => {console.log(`${this.stats.name.value} did nothing.`)};
		this.initStats();
		this.stats.name.value = name;
	}

	initStats() {
		let statTemplate = ["name", "value", "durability"];
		statTemplate.forEach( (stat) => {
			this.stats[stat] = {...objectStatLib[stat]};
		});
		console.log(this);
	};

	getTargetable(callback) {
		let targetable = document.createElement('div');
		let obj = this;

		let locationDiv = document.createElement('div');
		locationDiv.className = 'label';
		let locationLabel = document.createElement('span');
		locationLabel.innerText = 'Location: ';
		locationLabel.style.color = 'grey';
		locationDiv.append(locationLabel);
		let locationValue = document.createElement('span');
		locationValue.innerText = this.location.name;
		locationValue.className = "clickable";
		if (callback && obj.location) locationValue.onclick = function() {callback(obj.location)};
		locationDiv.append(locationValue);
		targetable.append(locationDiv);

		this.getTargetableStat(targetable, this.stats.name, callback, this);
		this.getTargetableStat(targetable, this.stats.value);
		this.getTargetableStat(targetable, this.stats.durability);

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
		let obj = this;
		if (this.action) this.action(obj);
	}
}

export {Obj};