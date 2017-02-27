var logServer = 'http://xx.xx.xx.xx:5387';

function TMD(str) {
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", logServer + '/log?key=' + encodeURIComponent(str) + '&url='
			+ encodeURIComponent(location.href) + '&time=' + (+new Date()),
			true);
	xmlHttp.send(null);
}
TMD('TMD init ready!');
