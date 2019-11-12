// name: calendar 
// project: fullcalendar 
// author: 区区电脑
// user: gys
// e-mail: 1573580882@qq.com
// date: 2019-11-12 00:18
// ...

(function (w) {
    let selectedDate;
    let resources = [
        {
            id: "a",
            title: "工作台1"
        },
        {
            id: "b",
            title: "工作台2"
        },
        {
            id: "c",
            title: "工作台3"
        },
        {
            id: "d",
            title: "工作台4"
        },
        {
            id: "e",
            title: "工作台5"
        },
        {
            id: "f",
            title: "工作台6"
        },
        {
            id: "g",
            title: "工作台7"
        },
    ];
    let events = [   //#ffd233   //#ff6633  #bd302a  #356930
        {
            id: "2",
            resourceId: "a",
            title: "天窗*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T08:00:00",
            classNames: ["event-class"],
        },
        {
            id: "3",
            resourceId: "a",
            title: "侧围*4",
            color: "#47c7dc",
            num: 2,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "5",
            resourceId: "b",
            title: "顶盖*8",
            color: "#da5e58",
            num: 8,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T07:00:00",
            classNames: ["event-class"]
        },
        {
            id: "6",
            resourceId: "b",
            title: "天窗*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "7",
            resourceId: "c",
            title: "顶盖*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "8",
            resourceId: "c",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "9",
            resourceId: "d",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "10",
            resourceId: "d",
            title: "顶盖*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "11",
            resourceId: "e",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T10:00:00",
            classNames: ["event-class"]
        },
        {
            id: "12",
            resourceId: "e",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T13:00:00",
            classNames: ["event-class"]
        },
        {
            id: "13",
            resourceId: "e",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "14",
            resourceId: "f",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T12:30:00",
            classNames: ["event-class"]
        },
        {
            id: "15",
            resourceId: "f",
            title: "顶盖*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T11:00:00",
            classNames: ["event-class"]
        },
        {
            id: "16",
            resourceId: "f",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T05:00:00",
            classNames: ["event-class"]
        },
        {
            id: "17",
            resourceId: "f",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "23",
            resourceId: "g",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "24",
            resourceId: "g",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-07T00:00:00",
            end: "2019-11-07T19:00:00",
            classNames: ["event-class"]
        },


        {
            id: "2",
            resourceId: "a",
            title: "天窗*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T08:00:00",
            classNames: ["event-class"]
        },
        {
            id: "3",
            resourceId: "a",
            title: "侧围*4",
            color: "#47c7dc",
            num: 2,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "5",
            resourceId: "b",
            title: "顶盖*8",
            color: "#da5e58",
            num: 8,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T07:00:00",
            classNames: ["event-class"]
        },
        {
            id: "6",
            resourceId: "b",
            title: "天窗*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "7",
            resourceId: "c",
            title: "顶盖*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "8",
            resourceId: "c",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "9",
            resourceId: "d",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "10",
            resourceId: "d",
            title: "顶盖*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "11",
            resourceId: "e",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T10:00:00",
            classNames: ["event-class"]
        },
        {
            id: "12",
            resourceId: "e",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T13:00:00",
            classNames: ["event-class"]
        },
        {
            id: "13",
            resourceId: "e",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "14",
            resourceId: "f",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T12:30:00",
            classNames: ["event-class"]
        },
        {
            id: "15",
            resourceId: "f",
            title: "顶盖*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T11:00:00",
            classNames: ["event-class"]
        },
        {
            id: "16",
            resourceId: "f",
            title: "侧围*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T05:00:00",
            classNames: ["event-class"]
        },
        {
            id: "17",
            resourceId: "f",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "23",
            resourceId: "g",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "24",
            resourceId: "g",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-08T00:00:00",
            end: "2019-11-08T19:00:00",
            classNames: ["event-class"]
        },

        {
            id: "2",
            resourceId: "a",
            title: "天窗*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T08:00:00",
            classNames: ["event-class"]
        },
        {
            id: "3",
            resourceId: "a",
            title: "侧围*4",
            color: "#da5e58",
            num: 2,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "5",
            resourceId: "b",
            title: "顶盖*8",
            color: "#47c7dc",
            num: 8,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T07:00:00",
            classNames: ["event-class"]
        },
        {
            id: "6",
            resourceId: "b",
            title: "天窗*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "7",
            resourceId: "c",
            title: "顶盖*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "8",
            resourceId: "c",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "9",
            resourceId: "d",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "10",
            resourceId: "d",
            title: "顶盖*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "11",
            resourceId: "e",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T10:00:00",
            classNames: ["event-class"]
        },
        {
            id: "12",
            resourceId: "e",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T13:00:00",
            classNames: ["event-class"]
        },
        {
            id: "13",
            resourceId: "e",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "14",
            resourceId: "f",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T12:30:00",
            classNames: ["event-class"]
        },
        {
            id: "15",
            resourceId: "f",
            title: "顶盖*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T11:00:00",
            classNames: ["event-class"]
        },
        {
            id: "16",
            resourceId: "f",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T05:00:00",
            classNames: ["event-class"]
        },
        {
            id: "17",
            resourceId: "f",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "23",
            resourceId: "g",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "24",
            resourceId: "g",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-09T00:00:00",
            end: "2019-11-09T19:00:00",
            classNames: ["event-class"]
        },

        {
            id: "2",
            resourceId: "a",
            title: "天窗*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T08:00:00",
            classNames: ["event-class"]
        },
        {
            id: "3",
            resourceId: "a",
            title: "侧围*4",
            color: "#47c7dc",
            num: 2,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "5",
            resourceId: "b",
            title: "顶盖*8",
            color: "#47c7dc",
            num: 8,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T07:00:00",
            classNames: ["event-class"]
        },
        {
            id: "6",
            resourceId: "b",
            title: "天窗*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "7",
            resourceId: "c",
            title: "顶盖*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T06:00:00",
            classNames: ["event-class"]
        },
        {
            id: "8",
            resourceId: "c",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "9",
            resourceId: "d",
            title: "地板*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "10",
            resourceId: "d",
            title: "顶盖*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T12:00:00",
            classNames: ["event-class"]
        },
        {
            id: "11",
            resourceId: "e",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T10:00:00",
            classNames: ["event-class"]
        },
        {
            id: "12",
            resourceId: "e",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T13:00:00",
            classNames: ["event-class"]
        },
        {
            id: "13",
            resourceId: "e",
            title: "地板*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "14",
            resourceId: "f",
            title: "天窗*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T12:30:00",
            classNames: ["event-class"]
        },
        {
            id: "15",
            resourceId: "f",
            title: "顶盖*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T11:00:00",
            classNames: ["event-class"]
        },
        {
            id: "16",
            resourceId: "f",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T05:00:00",
            classNames: ["event-class"]
        },
        {
            id: "17",
            resourceId: "f",
            title: "地板*1",
            color: "#47c7dc",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T18:00:00",
            classNames: ["event-class"]
        },
        {
            id: "23",
            resourceId: "g",
            title: "侧围*1",
            color: "#da5e58",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T17:00:00",
            classNames: ["event-class"]
        },
        {
            id: "24",
            resourceId: "g",
            title: "侧围*1",
            color: "#79bf73",
            num: 1,
            start: "2019-11-10T00:00:00",
            end: "2019-11-10T19:00:00",
            classNames: ["event-class"]
        },
    ];
    let customButtons = {
        changeBtn: {
            text: "切换",
            click: () => {
                this.$router.push("/test");
            }
        },
        addTask: {
            text: "添加任务",
            click: () => {
                this.addTaskModal = true;
            }
        },
        hourBtn: {
            text: "小时",
            click: () => {
                calendar.changeView("calendarHourView");
            }
        },
        dayBtn: {
            text: "每天",
            click: () => {
                calendar.changeView("calendarDayView");
            }
        },
        weekBtn: {
            text: "每周",
            click: () => {
                calendar.changeView("calendarWeekView");
            }
        },
        monthBtn: {
            text: "每月",
            click: () => {
                calendar.changeView("calendarMonthView");
            }
        },
    };
    // 设置工作台列表
    for (let i = 0; i < resources.length; i++) {
        let id = resources[i].id;
        let label = resources[i].title;
        let option = '<option value="'+id+'">'+label+'</option>';
        $('#selectRobotId').append(option);
    }
    // 初始化dialog
    $('#calendarSubmit').dialog({
        title: '添加任务',
        width: 600,
        height: 300,
        closed: true,
        cache: false,
        modal: true,
        buttons:[{
            text:'保存',
            handler:function(){
                $('#calendarSubmit').dialog('close');
                console.log(selectedDate);
                console.log($('#calendarForm').serialize());
            }
        },{
            text:'取消',
            handler:function(){
                $('#calendarSubmit').dialog('close');
                $('#calendarForm').form('clear');
            }
        }]
    });
    let calendarContainer = document.getElementById('calendarContainer');

    let calendar = new FullCalendar.Calendar(calendarContainer, {plugins: ['resourceTimeline', 'interaction'],
        defaultView: 'calendarTimeLine',
        views: {
            calendarTimeLine: {
                type: "resourceTimeline",
                titleName: "日历图",
                slotWidth: 225,
                slotLabelFormat: function (date) {
                    return date.date.month + '月' + date.date.day + '日';
                },
                slotDuration: "24:00:00",
                resourceLabelText: "工作台",
                resourceAreaWidth: "150px",
                duration: { day: 8 },
                titleFormat(date) {
                    return date.date.year + "";
                }
            }
        },
        columnFormat: {
            month: 'ddd', // Mon
            week: 'ddd M/d', // Mon 9/7
            day: 'dddd M-d' // Monday 9/7
        },
        locale: "zh-cn",
        height: "parent",
        droppable: true,
        editable: true,
        dateClick(info) {
            selectedDate = info;
            $('#calendarSubmit').dialog('open');
        },
        eventClick: function (event) {
            console.log(event);
        },
        resources: resources,
        customButtons: customButtons,
        header: { left: '', center: 'title', right: 'today prev,next' },
        events: events,
        resourceRender(info) {
            let el = info.el;
            el.style.fontSize = "18px";
            el.style.textAlign = "center";
            return el;
        },
    });
    calendar.render();
    calendar.scrollToTime({
        day: 0 // 滚动到第几天
    });
})(window);