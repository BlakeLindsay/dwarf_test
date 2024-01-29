
function getTargetable(callback, stats, statTemplate, target) {
	let targetable = document.createElement('div');
	// let char = this;

	let locationDiv = document.createElement('div');
	locationDiv.className = 'label';
	let locationLabel = document.createElement('span');
	locationLabel.innerText = 'Location: ';
	locationLabel.style.color = 'grey';
	locationDiv.append(locationLabel);
	let locationValue = document.createElement('span');
	locationValue.innerText = target.location.name;
	if (callback && target.location) locationValue.onclick = function() {callback(target.location)};
	locationDiv.append(locationValue);
	targetable.append(locationDiv);

	getTargetableStat(targetable, stats.name, callback, target);

	statTemplate.forEach( (stat) => {
		getTargetableStat(targetable, stats[stat]);
	});

	return targetable;
}

function getTargetableStat(targetable, stat, callback, target) {
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
	if (callback && target) statValue.onclick = function() {callback(target)};
	statDiv.append(statValue);
	targetable.append(statDiv);
}

export {getTargetable};