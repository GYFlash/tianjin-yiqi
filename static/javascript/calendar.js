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
        initCalendar, // 初始化日历
        dayClick, // 点击空白天
        eventClick, // 点击任务
        getWeekDay,
        getWeekNum,
        setCurrentHeaderStyle
    ;
    /**
     * 设置当前天的列头样式
     */
    setCurrentHeaderStyle = function () {
        let date = new Date();
        let str = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' +  date.getDate();
        setTimeout(() => {
            $('.fc-widget-header').each((i, e) => {
                if (new Date(str).getTime() == new Date($(e).attr('data-date')).getTime()) {
                    $(e).css({
                        backgroundColor: '#BCF3F3',
                        // color: '#ffffff'
                    })
                }

            })
        }, 100)
    };
    /**
     * 获取周
     * @param date
     * @returns {string}
     */
    getWeekDay = function (date) {
        let weekArray = ["日", "一", "二", "三", "四", "五", "六"];
        let currentString = date.year + '/' + (date.month + 1) + '/' + date.day;
        return '周' + weekArray[new Date(currentString).getDay()];
    };
    /**
     * 获取当前周数
     * @param date
     * @returns {number}
     */
    getWeekNum = function (date) {
        let currentString = date.year + '/' + (date.month + 1) + '/' + date.day;
        var date2=new Date(new Date(currentString).getFullYear(), 0, 1);
        var day1=new Date(currentString).getDay();
        if(day1==0) day1=7;
        var day2=date2.getDay();
        if(day2==0) day2=7;
        d = Math.round((new Date(currentString).getTime() - date2.getTime()+(day2-day1)*(24*60*60*1000)) / 86400000);
        return Math.ceil(d /7)+1;
    };

    /**
     * 点击空白天
     * @param info
     */
    dayClick = function (info) {
        console.log(info);
        selectedDate = info;
        // $('#calendarSubmit').dialog('open');
    };

    /**
     * 点击任务 eventClick
     * @param info
     */
    eventClick = function (info) {

        // 任务扩展参数 info.event.extendedProps.other
        console.log(info.event.extendedProps.other);

        $('#detail').dialog('open');
        $('#tabs').tabs({
            border:false,
            onSelect:function(title){
                // alert(title+' is selected');
            }
        });
    };

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
                $lib.toast('查看甘特图');
                window.open('./gunter.html')
                // new Iframe().open('甘特', './gunter.html')
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
            '#CC766A'
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
     * 获取事件 getEvents
     * @param date
     * @param success
     * @param error
     */
    getEvents = function(date, success, error){
        setCurrentHeaderStyle();
        $lib.http('/apis/inspectorder/GetSubInspectOrderDateByTime', {start: date.startStr, stop: date.endStr}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    let item = {
                        id: res.Data[i]['Device_id'],
                        resourceId: res.Data[i]['Platform_id'],
                        title: res.Data[i]['PartName'],
                        color: getColor(res.Data[i]['Device_id']),
                        num: 1,
                        start: $lib.dateFormat('YYYY-mm-dd', new Date(res.Data[i]['Plan_Start_Time'])) + ' 00:00:00',
                        end: $lib.dateFormat('YYYY-mm-dd', new Date(res.Data[i]['Plan_End_Time'])) + ' 23:59:59',
                        classNames: ["event-class"],
                        parentId: res.Data[i]['Platform_id'],

                        // other 为扩展参数,可随意往other 里面增加参数
                        other: {
                            mainOrderId: res.Data[i]['Main_Order_Id'],
                            start: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_Start_Time'])),
                            end: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['Plan_End_Time'])),
                        }
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
        // $('#calendarSubmit').dialog({
        //     title: '添加任务',
        //     width: 600,
        //     height: 300,
        //     closed: true,
        //     cache: false,
        //     modal: true,
        //     buttons:[{
        //         text:'保存',
        //         handler:function(){
        //             $('#calendarSubmit').dialog('close');
        //             console.log(selectedDate);
        //             console.log($('#calendarForm').serialize());
        //         }
        //     },{
        //         text:'取消',
        //         handler:function(){
        //             $('#calendarSubmit').dialog('close');
        //             $('#calendarForm').form('clear');
        //         }
        //     }]
        // });
        $('#detail').dialog({
            title: '任务详情',
            width: 500,
            height: 500,
            closed: true,
            cache: false,
            modal: true,
            buttons:[{
                text:'确定',
                handler:function(){

                }
            },{
                text:'取消',
                handler:function(){

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
            // nowIndicator: true,
            views: {
                calendarTimeLine: {
                    type: "resourceTimeline",
                    titleName: "日历图",
                    // slotWidth: 200,
                    slotLabelFormat: function (date) {

                        return getWeekDay(date.date) + '\n' + (date.date.month + 1) + '月' + date.date.day + '日 ';
                    },
                    slotDuration: "24:00:00",
                    resourceLabelText: "工作台",
                    resourceAreaWidth: "150px",

                    duration: { week: 1},
                    titleFormat(date, e) {
                        return date.date.year + '年 （第' + getWeekNum(date.date) + '周)';
                    }
                }
            },
            firstDay: 1,
            locale: "zh-cn",
            height: "parent",
            droppable: true,
            editable: true,
            dateClick(info) {
                dayClick(info);
            },
            eventClick: function (info) {
                eventClick(info);
            },
            resources: data,
            customButtons: customButtons,
            header: { left: 'prev,next today showTask showGant', center: 'title', right: ' ' },
            events: getEvents,
            eventRender (e) {
            },
            resourceRender(info) {

                let el = info.el;
                el.style.fontSize = "16px";
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
        setTimeout(() => {
            setCurrentHeaderStyle();
        }, 500);
        initCalendarDialog();
        initCalendar(data);
    })

})(window);