import { world } from "../../main.js";
import { addInlineLabel, display } from "../display.js";
// action display
const holder4 = document.getElementById('holder4');

function displayActionButtons() {
	holder4.innerHTML = '';
	let newButton = document.createElement('button');
	newButton.innerText = 'pass time';
	newButton.onclick = function() {passTime()};
	holder4.append(newButton);
};

function passTime() {
	world.passTime();
	display();
};

export {displayActionButtons};