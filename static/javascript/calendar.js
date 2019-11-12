// name: calendar 
// project: fullcalendar 
// author: 区区电脑
// user: gys
// e-mail: 1573580882@qq.com
// date: 2019-11-12 00:18
// ...

(function (w) {
    let selectedDate,
        calendarContainer,
        calendar;
    calendarContainer = document.getElementById('calendarContainer');
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
        // {
        //     id: "2",
        //     resourceId: "a",
        //     title: "天窗*1",
        //     color: "#da5e58",
        //     num: 1,
        //     start: "2019-11-07T00:00:00",
        //     end: "2019-11-07T08:00:00",
        //     classNames: ["event-class"],
        // },
        // {
        //     id: "3",
        //     resourceId: "a",
        //     title: "侧围*4",
        //     color: "#47c7dc",
        //     num: 2,
        //     start: "2019-11-07T00:00:00",
        //     end: "2019-11-07T06:00:00",
        //     classNames: ["event-class"]
        // }
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

    /**
     * @param value
     * @returns {string}
     */
    function getColor(value) {

        let colors = [
            '#57c1ff',
            '#79bf73',
            '#da5e58'
        ];
        if (value > (colors.length -1)) {
            value = 0;
        }
        return colors[value];
    }

    /**
     * 设置工作台列表
     */
    function getAllPlatform(callback) {
        $lib.http('/apis/resource/GetAllPlatform', {}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    let item = res.Data[i];
                    item['id'] = item['ID'];
                    item['title'] = item['Name'];
                    let id = item.id;
                    let label = item.title;
                    let option = '<option value="'+id+'">'+label+'</option>';
                    $('#selectRobotId').append(option);
                    temp.push(item)

                }
            }
            resources = temp;
            if (callback) {
                callback();
            }
        }, 'get', '查询工作台...')
    }

    /**
     * 初始化dialog
     */
    function initCalendarDialog() {
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
    }

    /**
     * 初始化日历图
     * @returns {string|HTMLElement}
     */
    function initCalendar() {

        calendar = new FullCalendar.Calendar(calendarContainer, {plugins: ['resourceTimeline', 'interaction'],
            defaultView: 'calendarTimeLine',
            defaultDate: new Date(),
            nowIndicator: true,
            views: {
                calendarTimeLine: {
                    type: "resourceTimeline",
                    titleName: "日历图",
                    slotWidth: 225,
                    slotLabelFormat: function (date) {
                        return date.date.month + 1 + '月' + date.date.day + '日';
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
            // locale: "zh-cn",
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
            events: function(date, callback1, callback2){
                console.log(date);
                console.log(date.startStr + ' ----> ' + date.endStr);
                $lib.http('/apis/inspectorder/GetSubInspectOrderDateByTime', {start: date.startStr, stop: date.endStr}, function (res) {
                    let temp = [];
                    for (let i = 0; i < res.Data.length; i++) {
                        let item = {
                            id: res.Data[i]['Device_id'],
                            resourceId: res.Data[i]['Platform_id'],
                            title: res.Data[i]['PartName'],
                            color: getColor(res.Data[i]['Device_id']),
                            num: 1,
                            start: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_Start_Time'])),
                            end: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_End_Time'])),
                            classNames: ["event-class"],
                        };
                        temp.push(item);
                    }
                    callback1(temp);
                }, 'get', '加载任务...')
            },
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
    }
    getAllPlatform(function () {
        initCalendarDialog();
        initCalendar();
    })

})(window);