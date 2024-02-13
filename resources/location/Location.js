import {Target, Character, actionLib, statLib} from "../target/Target.js";
import {actionables} from "../World.js";
import { Obj} from "../target/Obj.js";
import { nameValueLabel } from "../display/nameValueLabel.js";


class Location {
	constructor(name, parent, size, options) {
		this.name = name;
		this.locations = [];
		this.exits = [];
		this.characters = [];
		this.objects = [];
		this.parent = parent;
		this.size = size;
		if (options) {
			if (options.terrainDifficulty) this.terrainDifficulty = options.terrainDifficulty;
		}
	}

	/**
	 * 
	 * @param {String} newLocation 
	 */
	addLocation(newLocation, size = 10, options) {
		if (options) {
			newLocation = new Location(newLocation, this, size, options);
		} else {
			newLocation = new Location(newLocation, this, size);
		}
		this.locations.push(newLocation);
		return newLocation;
	}

	addExit(otherLocation) {
		let newExit = {
			exit1: this,
			exit2: otherLocation,
			color: "white"
		};
		this.exits.push(newExit);
		otherLocation.exits.push(newExit);
	}

	getExits() {
		let exits = [];
		this.exits.forEach( exit => {
			let otherLocation = exit.exit1 !== this ? exit.exit1 : exit.exit2;
			exits.push({
				value: otherLocation.name,
				target: otherLocation,
				color: exit.color
			});
		});
		return exits;
	}

	// removeExit(exit) {

	// }

	getDisplay(){
		console.log("Get display: ", this);
		let display = this.parent;
		if (display !== undefined) {
			display = [
				{
					name: "Within",
					value: this.parent.name,
					target: this.parent
				},
				{
					name: "Location",
					value: this.name,
					target: this
				},
			];
		}
		
		console.log("display returning: ", display);
		return display;
	}

	//gets location display
	getTargetable(callback) {
		let targetable = document.createElement('div');
		let location = this;

		if (location.parent) {
			let withinDiv = document.createElement('div');
			withinDiv.className = 'label';
			let withinLabel = document.createElement('span');
			withinLabel.innerText = 'Within: ';
			withinLabel.style.color = 'grey';
			withinDiv.appendChild(withinLabel);
			let withinName = document.createElement('span');
			withinName.innerText = this.parent.name;
			withinName.className = 'clickable';
			withinName.onclick = function() {callback(location.parent)};
			withinDiv.appendChild(withinName);
			targetable.appendChild(withinDiv);
		}

		let locationDiv = document.createElement('div');
		locationDiv.className = 'label';
		let locationLabel = document.createElement('span');
		locationLabel.innerText = 'Location: ';
		locationLabel.style.color = 'grey';
		locationLabel.style.textShadow = `0 0 10px grey`;
		locationDiv.appendChild(locationLabel);
		let locationName = document.createElement('span');
		locationName.innerText = this.name;
		locationName.className = 'clickable';
		locationName.onclick = function() {callback(location)};
		locationDiv.appendChild(locationName);
		targetable.append(locationDiv);

		let exits = document.createElement('div');
		exits.className = 'label';
		let exitsLabel = document.createElement('span');
		exitsLabel.innerText = "Exits: ";
		exitsLabel.style.color = 'grey';
		exits.append(exitsLabel);
		this.exits.forEach( exit => {
			let otherLocation = exit.exit1 !== this ? exit.exit1 : exit.exit2;
			let label = document.createElement('span');
			label.innerText = otherLocation.name;
			label.className = 'inlineLabel';
			label.className += ' clickable';
			label.onclick = function() {callback(otherLocation)};
			exits.append(label);
		});
		targetable.append(exits);

		// let chars = document.createElement('div');
		// chars.className = 'label';
		// let charsLabel = document.createElement('span');
		// charsLabel.innerText = "Characters: ";
		// chars.appendChild(charsLabel);
		// this.characters.forEach( char => {
		// 	let label = document.createElement('span');
		// 	label.innerText = char.stats.name.value;
		// 	label.className = 'inlineLabel';
		// 	label.onclick = function() {callback(char)};
		// 	chars.append(label);
		// });
		// targetable.append(chars);
		// this.appendTargetable(targetable, this.characters, callback, "Characters: ", {color: 'grey'});
		nameValueLabel({target: targetable, label: "Characters: ", callback, stats: this.characters, color: 'grey', clickable: true});

		// this.appendTargetable(targetable, this.objects, callback, "Objects: ", { color: 'grey'});
		nameValueLabel({target: targetable, label: "Objects: ", callback, stats: this.objects, color: 'grey', clickable: true});

		return targetable;
	}

	appendTargetable(targetable, stats, callback, label, options) {
		let newDisplayable = document.createElement('div');
		newDisplayable.className = 'label';
		let newDisplayableLabel = document.createElement('span');
		newDisplayableLabel.innerText = label;
		if (options) {
			if (options.color) newDisplayableLabel.style.color = options.color;
			if (options.textShadow) newDisplayableLabel.style.textShadow = options.textShadow;
		}
		newDisplayable.appendChild(newDisplayableLabel);
		stats.forEach( stat => {
			// console.log(stat);
			let statLabel = document.createElement('span');
			statLabel.innerText = stat.stats.name.value;
			statLabel.className = 'inlineLabel';
			statLabel.onclick = function() {callback(stat)};
			newDisplayable.append(statLabel);
		});
		targetable.append(newDisplayable);
	}

	spawnCharacter(name) {
		let newCharacter = new Character(name, this);
		this.characters.push(newCharacter);
		actionables.push(newCharacter);
		return newCharacter;
	}

	spawnObject(name, options) {
		let newObject = new Obj(name, this);
		this.objects.push(newObject);
		actionables.push(newObject);
		return newObject;
	}
}

export {Location};