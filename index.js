// import {Character} from "./resources/Character.js";
// import {World} from "./resources/World.js";
// var Character = require('./resources/Character.js');
const {World} = await import("./resources/World.js");
const {charList, Character} = await import("./resources/Character.js");


const mainView = document.getElementById(`main`);
const introView = document.getElementById(`introScene`);
const newGameButton1 = document.getElementById('newGameButton1');
const passTimeButton1 = document.getElementById('passTimeButton1');
const holder1 = document.getElementById('holder1');
const holder2 = document.getElementById('holder2');
const holder3 = document.getElementById('holder3');
const holder4 = document.getElementById('holder4');

newGameButton1.onclick = function() {newGame()};
passTimeButton1.onclick = function() {passTime()};

// continueButton1.addEventListener('onclick', () => {
// 	confirm();
// 	console.log('evented');
// });

// main.addEventListener("load", () => {
// 	main.style.visibility = visible;
// });

// mainView.addEventListener("load", () => {
// 	mainView.style.display = 'grid';
// });
// mainView.style.visibility = `hidden`;
// introView.style.visibility = 'hidden';

var world;

function newGame() {
	mainView.style.visibility = `visible`;
	introView.style.visibility = 'hidden';
	world = new World();
	world.test1();
	console.log(world);
	console.log(charList);
	display();
};

function passTime() {
	world.passTime();
	display();
};

function display() {
	output1(world.player.stats.name.value);
	// output2(world.player.location.characters);
	displayLocalCharacters(world.player.location.characters);
};

function displayLocation(location) {

}

function displayLocalCharacters(characters) {
	characters.forEach(character => {
		output2(character.stats.name.value);
	});
};

function output1(text) {
	holder1.innerText = text;
};

function output2(text) {
	// document.createTextNode(text);
	addInlineLabel(holder2, text);
};

function output3(text) {
	holder3.innerText = text;
};

function output4(text) {
	holder4.innerText = text;
};

function test2(text) {
	console.log(text);
};

function addInlineLabel(parent, text) {
	let element = document.createElement('div');
	element.innerText = text;
	element.className = 'inlineLabel';
	element.onmouseover = function() {test2('tested')};
	parent.appendChild(element);
};

function addBlockLabel(parent, text) {

};


// function setName(id) {
// 	world.player.stats.name.value = document.getElementById(id).value;
// 	console.log(world.player.stats.name.value);
// }

// function setStrength(id) {
// 	world.player.stats.strength.value = document.getElementById(id).value;
// 	console.log(world.player.stats.strength.value);
// }

// function setDexterity(id) {
// 	world.player.stats.dexterity.value = document.getElementById(id).value;
// 	console.log(world.player.stats.dexterity.value);
// }

// function setIntelligence(id) {
// 	world.player.stats.intelligence.value = document.getElementById(id).value;
// 	console.log(world.player.stats.intelligence.value);
// }

// function setSpirit(id) {
// 	world.player.stats.spirit.value = document.getElementById(id).value;
// 	console.log(world.player.stats.spirit.value);
// }

// let player = new Character();
// console.log(player);

// function newCharacter() {
// 	return new Character();
// }