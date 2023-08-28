// import {Character} from "./resources/Character.js";
const {Character} = await import("./Character.js");

export class World{
	constructor() {
		this.islands = [new Island()];
	}

	test1() {
		this.player = new Character('test');
		this.islands[0].regions[0].areas[0].buildings.push(new Building('test building'));
		this.islands[0].regions[0].areas[0].buildings[0].rooms.push(new Room('test room 1'));
		this.islands[0].regions[0].areas[0].buildings[0].rooms.push(new Room('test room 2'));
		this.islands[0].regions[0].areas[0].buildings[0].rooms.push(new Room('test room 3'));
		this.islands[0].regions[0].areas[0].buildings[0].rooms.push(new Room('test room 4'));

		this.islands[0].regions[0].areas[0].buildings[0].rooms[0].characters.push(this.player);
		this.player.location = this.islands[0].regions[0].areas[0].buildings[0].rooms[0];
		this.islands[0].regions[0].areas[0].buildings[0].rooms[0].spawnCharacter('Char1');
		this.islands[0].regions[0].areas[0].buildings[0].rooms[1].spawnCharacter('Char2');
		this.islands[0].regions[0].areas[0].buildings[0].rooms[2].spawnCharacter('Char3');
		this.islands[0].regions[0].areas[0].buildings[0].rooms[3].spawnCharacter('Char4');
	}

	passTime() {
		console.log('time passed');
	}
}

class Island {
	constructor() {
		this.regions = [new Region()];
	}

}

class Region{
	constructor() {
		this.areas = [new Area()];
	}
}

class Area {
	constructor() {
		this.buildings = [];
	}
}

class Building {
	constructor(name) {
		this.name = name;
		this.rooms = [];
	}
}

class Room {
	constructor(name) {
		this.name = name;
		this.characters = [];
	}

	spawnCharacter(name) {
		this.characters.push(new Character(name, this));
	}
}