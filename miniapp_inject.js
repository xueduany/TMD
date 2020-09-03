var remoteDebug = {
    remoteServer: "http://ip:5387",
    DEBUG: true,
    log: function (msg, when) {
        if (remoteDebug.DEBUG) {
            tt.request({
                url:
                    remoteDebug.remoteServer +
                    "/log?key=" +
                    encodeURIComponent(msg),
                data: {
                    when: when || "miniapp",
                },
                header: {
                    "content-type": "application/json",
                },
            });
        } else {
            console.log(msg, when);
        }
    },
};

module.exports = remoteDebug;
