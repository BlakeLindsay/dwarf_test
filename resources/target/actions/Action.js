
class Action {
	constructor(action) {
		let {name, actor} = action;
		this.stats = {};
		this.stats.name.value = name;
		this.stats.actor = actor;
	}

	act() {
		
	}
}

export {Action};