import { world } from "../../main.js";
import { addInlineLabel } from "../display.js";

const localObjects = document.getElementById('localObjects');

function displayLocalObjects(objects) {
	localObjects.innerHTML = '';
	objects.forEach(object => {
		if (object === world.player) return;
		addInlineLabel(localObjects, object);
	});
};

export {displayLocalObjects};