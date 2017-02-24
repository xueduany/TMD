var express = require('express');
var app = express();

var __TIME_MARK_DATE = [];
app.get('/log', function(req, res) {
	var logName = req.query.key;
	__TIME_MARK_DATE.push({
		id : logName || __TIME_MARK_DATE.length,
		time : +new Date()
	});
	res.end();
});
app.get('/clean', function(req, res) {
	__TIME_MARK_DATE = [];
	res.end('clean ok!');
});
app.get('/report', function(req, res) {
	var report = [];
	for (var i = 1; i < __TIME_MARK_DATE.length; i++) {
		report
				.push('"'
						+ __TIME_MARK_DATE[i].id
						+ '"'
						+ '减去'
						+ '"'
						+ __TIME_MARK_DATE[i - 1].id
						+ '"'
						+ '等于'
						+ '"'
						+ (__TIME_MARK_DATE[i].time
								- __TIME_MARK_DATE[i - 1].time + '"'))
	}
	res.end(JSON.stringify(__TIME_MARK_DATE) + '\r\n' + report.join('\r\n'));
});

var server = app.listen(5387, function() {

});