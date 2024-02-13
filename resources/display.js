import { world } from "../main.js";
import { displayLocalObjects } from "./display/displayLocalObjects.js";
import { displayActionButtons } from "./display/displayActionButtons.js";
import { nameValueLabel } from "./display/nameValueLabel.js";

let targetLocked = false;
let currentTarget;

// self display
const holder1 = document.getElementById('holder1');
// location display
const holder2 = document.getElementById('holder2');
// event display
const holder3 = document.getElementById('holder3');
// action display
const holder4 = document.getElementById('holder4');
// target display
const holder5 = document.getElementById('holder5');
const time = document.getElementById('time');
const locationName = document.getElementById('locationName');
const locationExits = document.getElementById('locationExits');
const localCharacters = document.getElementById('localCharacters');
const testDiv = document.getElementById('testDiv');



function display() {
	console.log(world.player.location.characters);
	displaySelf(world);
	displayLocation(world.player.location);
	displayActionButtons();
	if (currentTarget) {
		displayTarget(currentTarget);
	}
	console.log(world.time);
};

function displayLocation(location) {
	displayLocalTime();
	locationName.innerText = location.name;
	locationName.onmouseover = function() {displayTargetMouseOver(location)};
	locationName.onclick = function() {lockTarget(location)};
	displayLocalExits(location.getExits());
	displayLocalCharacters(location.characters);
	displayLocalObjects(location.objects);
};

function displayLocalTime() {
	time.innerHTML = '';
	let element = document.createElement('span');
	element.innerText = `Year: ${world.time.year}, Month: ${world.time.month}, Day: ${world.time.day}, Hour: ${world.time.hour}, Minute: ${world.time.minute}, Second: ${world.time.second}`;
	element.className = 'inlineLabel';
	element.style.color = 'slategrey';
	time.appendChild(element);
};

function displayLocalExits(exits) {
	locationExits.innerHTML = '';
	exits.forEach(exit => {
		let element = document.createElement('span');
		element.innerText = exit.value;
		element.className = 'inlineLabel';
		element.className += ' clickable';
		element.style.color = exit.color;
		element.onmouseover = function() {displayTargetMouseOver(exit.target)};
		element.onclick = function() {lockTarget(exit.target)};
		locationExits.appendChild(element);
	});
};

function displayLocalCharacters(characters) {
	localCharacters.innerHTML = '';
	characters.forEach(character => {
		if (character === world.player) return;
		addLocalCharacter(character);
	});
};

function displaySelf() {
	holder1.innerHTML = '';
	if (world.player.getTargetable) {
		addDisplayable(holder1, world.player.getTargetable(displayTarget));
	}
};

function displayTargetMouseOver(target) {
	if (!targetLocked) {
		displayTarget(target);
	}
};

function displayTarget(target) {
	console.log("target: ", target)
	// if (target === undefined || target.getDisplay() === undefined) {
	// 	return;
	// }
	currentTarget = target;
	holder5.innerHTML = '';
	// const display = target.getDisplay();
	// display.forEach((displayable) => {
	// 	let element = document.createElement('div');
	// 	let name = document.createElement('span');
	// 	let value = document.createElement('span');
	// 	name.innerText = displayable.name + ": ";
	// 	name.style.color = displayable.color;
	// 	value.innerText = displayable.value;
	// 	value.onclick = function() {displayTarget(displayable.target)};
	// 	element.className = 'label';
	// 	element.appendChild(name);
	// 	element.appendChild(value);
	// 	holder5.appendChild(element);
	// });
	if (target.getTargetable) {
		addDisplayable(holder5, target.getTargetable(lockTarget));
	}
};

function lockTarget(target) {
	if (!targetLocked) {
		targetLocked = true;
		holder5.style.borderColor = 'darkred';
	} else {
		targetLocked = false;
		holder5.style.borderColor = 'grey';
	}
	displayTarget(target);
};

function addLocalCharacter(character) {
	addInlineLabel(localCharacters, character);
};

function addInlineLabel(parent, target) {
	try {
		let element = document.createElement('span');
		element.innerText = target.stats.name.value;
		element.className = 'inlineLabel';
		if (target.getTargetable) element.className += " clickable";
		// let tooltip = document.createElement('span');
		// tooltip.innerText = `${text}'s tooltip`;
		// tooltip.className = 'tooltip';
		element.onmouseover = function() {displayTargetMouseOver(target)};
		element.onclick = function() {lockTarget(target)};
		// element.appendChild(tooltip);
		parent.appendChild(element);
	} catch (error) {
		console.log(error, "for " + target);
		console.log(target);
	}
};

function addDisplayable(parent, displayable) {
	parent.append(displayable);
};

// function addToolTip()

function addBlockLabel(parent, text) {

};

export {display, addInlineLabel};