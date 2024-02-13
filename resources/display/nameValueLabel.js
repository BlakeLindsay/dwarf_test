/**
 * 	
 * @param {Object} details : needs target, label, callback, and stats. color, clickable, and textShadow optional
 */
function nameValueLabel(details) {
	let {target, label, callback, stats, clickable} = details;
	let newNameValueLabel = document.createElement('div');
	newNameValueLabel.className = 'label';
	let newNameLabel = document.createElement('span');
	newNameLabel.innerText = label;
	if (details.color) newNameLabel.style.color = details.color;
	if (details.textShadow) newNameLabel.style.textShadow = details.textShadow;
	newNameValueLabel.appendChild(newNameLabel);
	// newVLabel = document.createElement
		stats.forEach( stat => {
			// console.log(stat);
			let valueLabel = document.createElement('span');
			valueLabel.innerText = stat.stats.name.value;
			valueLabel.className = 'inlineLabel';
			if (clickable = true) {
				valueLabel.className += ' clickable';
			}
			valueLabel.onclick = function() {callback(stat)};
			newNameValueLabel.append(valueLabel);
		});
		target.append(newNameValueLabel);
};

export {nameValueLabel};