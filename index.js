var express = require('express');
var app = express();

var __TIME_MARK_DEBUG = [];
app.get('/log', function(req, res) {
	var logName = req.query.key;
	__TIME_MARK_DEBUG.push({
		id : logName || __TIME_MARK_DEBUG.length,
		time : +new Date()
	});
	res.end();
});
app.get('/clean', function(req, res) {
	__TIME_MARK_DEBUG = [];
	res.end('clean ok!');
});
app.get('/report', function(req, res) {
	var report = [];
	for (var i = 1; i < __TIME_MARK_DEBUG.length; i++) {
		report
				.push('"'
						+ __TIME_MARK_DEBUG[i].id
						+ '"'
						+ '减去'
						+ '"'
						+ __TIME_MARK_DEBUG[i - 1].id
						+ '"'
						+ '等于'
						+ '"'
						+ (__TIME_MARK_DEBUG[i].time
								- __TIME_MARK_DEBUG[i - 1].time + '"'))
	}
	res.end(JSON.stringify(__TIME_MARK_DEBUG) + '\r\n' + report.join('\r\n'));
});

var server = app.listen(5387, function() {

});