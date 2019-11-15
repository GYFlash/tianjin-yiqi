// name: calendar 
// project: fullcalendar 
// author: 区区电脑
// user: gys
// e-mail: 1573580882@qq.com
// date: 2019-11-12 00:18
// ...

(function (w) {
    let selectedDate, // 当前选中的事件
        calendar, // 日历
        calendarContainer, // 日历dom
        customButtons, // 自定义header 按钮组
        getEvents, // 获取事件
        getColor, // 获取颜色
        getAllPlatform, // 获取工作台列表
        initCalendarDialog, // 初始化dialog
        initCalendar; // 初始化日历
    calendarContainer = document.getElementById('calendarContainer');

    // 自定义header 按钮
    customButtons = {
        showTask: {
            text: '查看任务',
            click() {
                $lib.toast('查看任务');
            }
        },
        showGant: {
            text: '查看甘特图',
            click() {
                // $lib.toast('查看甘特图');
                new Iframe().open('甘特', './gunter.html')
            }
        }
    };

    /**
     * 获取颜色
     * @param value
     * @returns {string}
     */
    getColor = function (value) {
        let colors = [
            '#57c1ff',
            '#79bf73',
            '#da5e58'
        ];
        if (value > (colors.length -1)) {
            value = 0;
        }
        return colors[value];
    };

    /**
     * 设置工作台列表
     * @param callback
     */
    getAllPlatform = function (callback) {
        $lib.http('/apis/resource/GetAllPlatform', {}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    let item = res.Data[i];
                    console.log('+++++++++++++++++ ' + item['ID'])
                    item['id'] = item['ID'];
                    item['title'] = item['Name'];
                    let id = item.id;
                    let label = item.title;
                    let option = '<option value="'+id+'">'+label+'</option>';
                    $('#selectRobotId').append(option);
                    temp.push(item)

                }
            }
            if (callback) {
                callback(temp);
            }
        }, 'get', '查询工作台...')
    };

    /**
     * 获取事件
     * @param date
     * @param success
     * @param error
     */
    getEvents = function(date, success, error){
        console.log(date);
        console.log(date.startStr + ' ----> ' + date.endStr);
        $lib.http('/apis/inspectorder/GetSubInspectOrderDateByTime', {start: date.startStr, stop: date.endStr}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    console.log('***************** ' + res.Data[i]['Platform_id']);
                    let item = {
                        id: res.Data[i]['Device_id'],
                        resourceId: res.Data[i]['Platform_id'],
                        title: res.Data[i]['PartName'],
                        color: getColor(res.Data[i]['Device_id']),
                        num: 1,
                        start: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_Start_Time'])),
                        end: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_End_Time'])),
                        classNames: ["event-class"],
                        parentId: res.Data[i]['Platform_id']
                    };
                    temp.push(item);
                }
            }
            success(temp);
        }, 'get', '加载任务...')
    };
    /**
     * 初始化dialog
     */
    initCalendarDialog = function () {
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
    };

    /**
     * 初始化日历图
     * @param data
     * @returns {string|HTMLElement}
     */
    initCalendar = function (data) {
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
                        return (date.date.month + 1) + '月' + date.date.day + '日';
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
            resources: data,
            customButtons: customButtons,
            header: { left: 'showTask showGant', center: 'title', right: 'today prev,next' },
            events: getEvents,
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
    };

    // start
    getAllPlatform(function (data) {
        initCalendarDialog();
        initCalendar(data);
    })

})(window);