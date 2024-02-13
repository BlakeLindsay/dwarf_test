import {Target, Character, actionLib, statLib} from "./target/Target.js";
import { Location } from "./location/Location.js";
import { Obj } from "./target/Obj.js";
// const {Target, Character, actionLib, statLib} = await import("./Target.js");
// const {displayTarget} = await import("../main.js");
let actionables = [];

let timePresetsLib = {
		maxSeconds: 59,
		maxMinutes: 59,
		maxHours: 23,
		maxDays: 360,
		maxMonths: 12,
		time1: {
			second: 0,
			minute: 0,
			hour: 0,
			day: 0,
			month: 0,
			year: 0,
		}
	};

class World{
	constructor() {
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
		this.islands[0].regions[0].areas[0].buildings[0].rooms[0].spawnCharacter('Char5');
	}

	test2() {
		// console.log(this.main);
		// this.main.test();
		this.time = timePresetsLib.time1;
		this.player = new Character('Tester');
		actionables.push(this.player);
		this.locations = [new Location('Test Landia')];
		// this.locations.parent = { name: "World"};
		let newBuilding = this.locations[0].addLocation("Test Building");
		let testRoom1 = newBuilding.addLocation("Test Room 1");
		let testRoom2 = newBuilding.addLocation("Test Room 2");
		let testRoom3 = newBuilding.addLocation("Test Room 3");
		let testRoom4 = newBuilding.addLocation("Test Room 4");
		testRoom1.addExit(testRoom2);
		testRoom2.addExit(testRoom3);
		testRoom3.addExit(testRoom4);
		testRoom4.addExit(testRoom1);
		testRoom1.characters.push(this.player);
		this.player.location = testRoom1;
		let char1 = testRoom1.spawnCharacter('Test Character 1');
		let char5 = testRoom1.spawnCharacter('Test Character 5');
		testRoom2.spawnCharacter('Test Character 2');
		testRoom3.spawnCharacter('Test Character 3');
		testRoom4.spawnCharacter('Test Character 4');
		char1.stats.mana.value = 95;
		char1.stats.lifeweaving.value = 50;
		char5.stats.mana.value = 85;
		char5.stats.lifeweaving.value = 10.12312351661412414141414141414141414141414;
		char5.action = actionLib.dumbMove;

		testRoom1.spawnObject(("testObj1"));
		
		console.log(this.locations);
	}

	passTime() {
		console.log('time passed');
		actionables.forEach( actionable => {
			// console.log("current actionable: ", actionable)
			if (actionable.act) actionable.act();
		});
		
		if (this.time.second != timePresetsLib.maxSeconds) {
			this.time.second++;
		} else {
			this.time.second = 0;
			if (this.time.minute != timePresetsLib.maxMinutes) {
				this.time.minute++;
			} else {
				this.time.minute = 0;
				if (this.time.hour != timePresetsLib.maxHours) {
					this.time.hour++;
				} else {
					this.time.hour = 0;
					if (this.time.day != timePresetsLib.maxDays) {
						this.time.day++;
					} else {
						this.time.day = 1;
						if (this.time.month != timePresetsLib.maxMonths) {
							this.time.month++;
						} else {
							this.time.month = 1;
							this.time.year++;
						}
					}
				}
			}
		}
	}

	getDate() {
		console.log(this.time);
		let seconds = 60;
		let minutes = this.time / 60;
		let hours = minutes*24;
		let days = hours*30;
		let phases = days*8;
		let months = days*12;
		
		let second = this.time % seconds;
		let minute = minutes % 60;
		let hour = this.time % hours;
		let day = this.time % days;
		let phase = this.time % phases;
		let month = this.time % months;
		let year = this.time % 31104000;
		
		return [year, month, phase, day, hour, minute, second];
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

export { World, Target, Character, actionLib, statLib, actionables };