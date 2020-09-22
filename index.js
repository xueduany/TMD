#!/usr/bin/env node

/**
 * 这里修改监听系统端口号
 */
var listenerPort = 5387;

var express = require("express");
var file = require("fs");
var app = express();

var __TIME_MARK_DEBUG = [];
app.get("/log", function (req, res) {
    var logName = req.query.key;
    var logTime = req.query.time;
    var logPage = req.query.url;
    var group = req.query.group;
    var when = req.query.when;
    __TIME_MARK_DEBUG.push({
        id: logName || __TIME_MARK_DEBUG.length,
        log: logName,
        group: group || "default",
        time: logTime || +new Date(),
        when: when || "0",
        url: logPage || req.protocol + "://" + req.hostname + req.url,
    });
    res.set({
        "Access-Control-Allow-Origin": "*",
    });
    res.end();
});
app.get("/clean", function (req, res) {
    __TIME_MARK_DEBUG = [];
    res.end("clean ok!");
});

var tplFn = (function () {
    var cache = {};
    this.tmpl = function tmpl(str, data) {
        /*
         * // Figure out if we're getting a template, or if we need to // load
         * the template - and be sure to cache the result. var fn = str.length &&
         * str in cache ? cache[str] : // Generate a reusable function that will
         * serve as a template // generator (and which will be cached).
         *
         * new Function("$OBJECT", "var
         * _p_=[],print=function(){_p_.push.apply(_p_,arguments);};" + //
         * Introduce the data as local variables using with(){}
         * "with($OBJECT){$T=tplFn=this;_p_.push('" + // Convert the template
         * into pure JavaScript str.split(/({%.+%})/g).map(function(o) { if
         * (o.indexOf('{%') == -1) { return
         * o.replace(/"([^"']*('[^"']+')+)+[^"']*"/g, function(str) { return
         * str.replace(/\'/g, '\\"') }) } else { return o; }
         * }).join('').replace(/[\r\t\n]/g, "
         * ").split("{%").join("\t").replace(/((^|%})[^\t]*)'/g,
         * "$1\r").replace(/\t=(.*?)%}/g,
         * "',$1,'").split("\t").join("');").split("%}").join("_p_.push('").split("\r").join("\\'") +
         * "');}return _p_.join('');"); // Provide some basic currying to the
         * user return data ? fn.call(tplFn, data) : fn;
         */
        var fn;
        if (str.length && str in cache) {
            fn = cache[str];
        } else {
            var functionString = [
                //
                "var _p_=[],print=function(){_p_.push.apply(_p_,arguments);};", //
                "with($OBJECT){$T=tplFn=$TPLFN;_p_.push('", //
                (function () {
                    var a = str.split(/({%.+%})/g).map(function (o) {
                        if (o.indexOf("{%") == -1) {
                            return o.replace(
                                /"([^"']*('[^"']+')+)+[^"']*"/g,
                                function (str) {
                                    return str.replace(/\'/g, '\\"');
                                }
                            );
                        } else {
                            return o;
                        }
                    });
                    var b = a.join("").replace(/[\r\t\n]/g, " ");
                    b = b.split("{%").join("\t");
                    b = b.replace(/((^|%})[^\t]*)'/g, "$1\r");
                    b = b.replace(/\t=(.*?)%}/g, "',$1,'");
                    b = b
                        .split("\t")
                        .join("');")
                        .split("%}")
                        .join("_p_.push('")
                        .split("\r")
                        .join("\\'");
                    return b;
                })(), //
                "');}return _p_.join('');", //
            ].join("");

            // 调试用
            // return functionString;

            fn = new Function("$OBJECT", "$TPLFN", functionString);

            return data ? fn.call(data, data, tplFn) : fn;
        }
    };
    return this.tmpl;
})();

app.get("/report", function (req, res) {
    var tpl = file.readFileSync("report.tpl.html").toString();
    __TIME_MARK_DEBUG.sort(function (a, b) {
        return a.time - b.time;
    });
    res.end(
        tplFn(tpl, {
            TimeMarkDebug: __TIME_MARK_DEBUG,
        })
    );
});

app.get("/bundle.js", function (req, res) {
    var js = file.readFileSync("bundle.js").toString();
    res.end(js);
});

var server = app.listen(listenerPort, function () {
    console.log("开始监听!");
});
