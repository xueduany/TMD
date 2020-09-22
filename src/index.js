import Timeline from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
var groupsId = 0;
var groups = [];
var all = {};
var items = [];

var prev;
var begin;
var end;
var _groupId;

for (var i = 0; i < TimeMarkDebug.length; i++) {
    _groupId = ++groupsId;
    var one = TimeMarkDebug[i];
    if (one.group in all) {
    } else {
        groups.push({ id: _groupId, title: one.when });
        all[one.url] = {
            itemsId: 0,
            groupId: _groupId,
        };
    }
    var itemsId = _groupId;
    console.error(one);
    if (prev == null) {
        prev = {
            id: itemsId,
            group: _groupId,
            title: one.log,
            start_time: new Date(one.time),
        };
        begin = one.time;
    } else {
        var save = Object.assign({}, prev);
        save.end_time = new Date(one.time);
        Object.assign(save, {
            // canResize: false,
            // resizing: true,
            itemProps: {
                onDoubleClick: new Function("document.getElementById(\"anchor"+itemsId+"\").scrollIntoView()")
            },
        });
        items.push(save);
        prev = {
            id: itemsId,
            group: _groupId,
            title: one.log,
            start_time: new Date(one.time),
        };
        if (i == TimeMarkDebug.length - 1) {
            prev.end_time = new Date();
            items.push(prev);
            end = new Date();
            //end.setMilliseconds(end.getMilliseconds() + 100);
        }
    }
}
console.error(groups);
console.error(items);

// var items = [
//     {
//         id: 1,
//         group: 1,
//         title: "item 1",
//         start_time: moment(),
//         end_time: moment().add(1, "hour"),
//     },
//     {
//         id: 2,
//         group: 2,
//         title: "item 2",
//         start_time: moment().add(-0.5, "hour"),
//         end_time: moment().add(0.5, "hour"),
//     },
//     {
//         id: 3,
//         group: 1,
//         title: "item 3",
//         start_time: moment().add(2, "hour"),
//         end_time: moment().add(3, "hour"),
//     },
// ];

ReactDOM.render(
    <div>
        TimeLine
        <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={new Date(begin)}
            defaultTimeEnd={new Date(end)}
        />
    </div>,
    document.getElementById("root")
);
