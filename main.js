
import { World } from "./resources/World.js";
import { display } from "./resources/display.js";

const mainView = document.getElementById(`main`);
const introView = document.getElementById(`introScene`);

const newGameButton1 = document.getElementById('newGameButton1');
// const passTimeButton1 = document.getElementById('passTimeButton1');

newGameButton1.onclick = function() {newGame()};
// passTimeButton1.onclick = function() {passTime()};

let world;

function newGame() {
	mainView.style.visibility = `visible`;
	introView.style.visibility = 'hidden';
	world = new World();
	// world.test1();
	world.test2();
	console.log(world);
	display();
};

// function passTime() {
// 	world.passTime();
// 	display();
// };

export {newGame, world};