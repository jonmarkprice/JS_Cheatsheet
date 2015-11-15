'use strict';
var tds = document.getElementsByTagName('td');
var i;
for (i = 0; i < tds.length; i += 1) {
	if (tds[i].textContent == 'no') {
		tds[i].classList.add('notdone');
	}
	else if (tds[i].textContent == 'yes') {
		tds[i].classList.add('done');
	}
}
