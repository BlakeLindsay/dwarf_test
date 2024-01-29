/**
 * 	
 * @param {Object} details : needs target, label, callback, and stats. color and textShadow optional
 */
function nvLabel(details) {
	let {target, label, callback, stats} = details;
	let newNVLabel = document.createElement('div');
	newNVLabel.className = 'label';
	let newNLabel = document.createElement('span');
	newNLabel.innerText = label;
	if (details.color) newNLabel.style.color = details.color;
	if (details.textShadow) newNLabel.style.textShadow = details.textShadow;
	newNVLabel.appendChild(newNLabel);
	// newVLabel = document.createElement
		stats.forEach( stat => {
			// console.log(stat);
			let statLabel = document.createElement('span');
			statLabel.innerText = stat.stats.name.value;
			statLabel.className = 'inlineLabel';
			statLabel.onclick = function() {callback(stat)};
			newNVLabel.append(statLabel);
		});
		target.append(newNVLabel);
};

export {nvLabel};