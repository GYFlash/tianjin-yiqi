// name: gunter 
// project: tianjin-yiqi 
// author: 区区电脑
// user: gys
// e-mail: 1573580882@qq.com
// date: 2019-11-13 22:44
// ...


(function (w) {
    let gunter, // 甘特图
        gunterContainer, // 甘特图dom
        customButtons, // 自定义header 按钮组
        getEvents, // 获取事件
        getColor, // 获取颜色
        getAllPlatform, // 获取工作台列表
        initGunter, // 初始化甘特图
        getWeekLabelFormat, // 日历视图标题
        checkDate;

    gunterContainer = document.getElementById('gunterContainer');

    customButtons = {
        changeBtn: {
            text: "切换",
            click: () => {
                $lib.toast('切换')
            }
        },
        addTask: {
            text: "添加任务",
            click: () => {
                $lib.toast('添加任务')
            }
        },
        hourBtn: {
            text: "小时",
            click: () => {
                gunter.changeView("calendarHourView");
            }
        },
        dayBtn: {
            text: "每天",
            click: () => {
                gunter.changeView("calendarDayView");
            }
        },
        weekBtn: {
            text: "每周",
            click: () => {
                gunter.changeView("calendarWeekView");
            }
        },
        monthBtn: {
            text: "每月",
            click: () => {
                gunter.changeView("calendarMonthView");
            }
        },
    };

    /**
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
     * 处理周视图日期标题
     * @param date
     * @returns {string}
     */
    getWeekLabelFormat = function (date) {
        let month = date.date.month + 1;
        let max;
        switch (month) {
            case 1: max = 31; break;
            case 2: max = 28; break;
            case 3: max = 31; break;
            case 4: max = 30; break;
            case 5: max = 31; break;
            case 6: max = 30; break;
            case 7: max = 31; break;
            case 8: max = 31; break;
            case 9: max = 30; break;
            case 10: max = 31; break;
            case 11: max = 30; break;
            case 12: max = 31; break;
        }
        let end = date.date.day + 6;
        if (end > max) {
            end = max + '日';
        } else {
            end += '日';
        }
        return (date.date.month + 1) + '月' + date.date.day + '日~' + end;
    };

    /**
     * 获取工作台列表
     * @param callback
     */
    getAllPlatform = function (callback) {
        $lib.http('/apis/Resource/GetPlatFromTreeList2', {}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    let item = res.Data[i];
                    item['title'] = item['text'];
                    let children = [];
                    for (let j = 0; j < item['children'].length; j++) {
                        let sub = item['children'][j];
                        sub['title'] = sub['text'];
                        children.push(sub);
                    }
                    item['children'] = children;
                    temp.push(item)
                }
            }
            if (callback) {
                callback(temp);
            }
        }, 'get', '查询工作台...')
    };

    /**
     * 判断时间段是否存在重叠部分
     * 当前任务的开始时间 小于 记录任务的结束时间 并且 当前任务的结束时间 大于 记录任务的开始时间 视为存在重叠
     * @param last
     * @param current
     * @returns {boolean} true=存在
     */
    checkDate = function (last, current) {
        return new Date(current.start).getTime() < new Date(last.end).getTime() && new Date(current.end).getTime() > new Date(last.start).getTime();
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
        $lib.http('/apis/inspectorder/GetSubInspectOrderGanttByTime', {start: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(date.startStr)), stop: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(date.endStr))}, function (res) {
            let temp = [];
            if (res.Data) {
                /**
                 * 记录平台/主副臂 记录任务的开始/结束时间
                 * @type {{}}
                 */
                let target = {};
                for (let i = 0; i < res.Data.length; i++) {
                    let resourceId = '';
                    if (res.Data[i]['OrderNo']) {
                        resourceId = res.Data[i]['DeviceId'];
                    } else {
                        resourceId = res.Data[i]['PlatformId'];
                    }
                    let color = '#57c1ff';
                    /**
                     * 查看任务所在 平台/主副臂 是否存在记录
                     * 如果存在记录，判断当前任务与所记录任务时间范围是否存在重叠部分，并进行记录
                     * 当前任务的开始时间 小于 记录任务的结束时间 并且 当前任务的结束时间 大于 记录任务的开始时间 视为存在重叠
                     * 存在重叠修改颜色
                     * 如果没有存在记录使用记录则进行记录
                     */
                    if (target[resourceId]) {
                        for (let j = 0; j < target[resourceId].length; j++) {
                            if (checkDate(target[resourceId][j], {start: res.Data[i]['PlanStartTime'], end: res.Data[i]['PlanEndTime']})) {
                                color = '#da5e58';
                                break;
                            }
                        }

                        target[resourceId].push({
                            start: res.Data[i]['PlanStartTime'],
                            end: res.Data[i]['PlanEndTime']
                        })
                    } else {
                        target[resourceId] = [{
                            start: res.Data[i]['PlanStartTime'],
                            end: res.Data[i]['PlanEndTime']
                        }]
                    }
                    let item = {
                        id: res.Data[i]['DeviceId'],
                        resourceId: resourceId,
                        // title: res.Data[i]['PartName'],
                        title: '',
                        color: color,
                        num: i,
                        start: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['PlanStartTime'])),
                        end: $lib.dateFormat('YYYY-mm-dd HH:MM:SS', new Date(res.Data[i]['PlanEndTime'])),
                        classNames: ["event-class"],
                    };
                    temp.push(item);
                }
            }
            success(temp);

        }, 'get', '加载任务...')
    };

    /**
     * 初始化甘特图
     * @param data
     * @returns {string|HTMLElement}
     */
    initGunter = function (data) {
        gunter = new FullCalendar.Calendar(gunterContainer, {
            plugins: ['resourceTimeline'],
            defaultView: 'calendarHourView',
            views: {
                calendarHourView: {
                    type: "resourceTimeline",
                    slotWidth: 100,
                    slotLabelFormat: {
                        // year: "2-digit",
                        // month: "2-digit",
                        // day: "2-digit",
                        hour: "2-digit",
                        // minute:"2-digit",
                        hour12: false
                    },
                    slotDuration: "01:00:00",
                    resourceLabelText: "工作台",
                    resourceAreaWidth: "150px",
                    duration: { day: 1 },
                    titleFormat(info) {
                        // console.log(date);
                        let date = info.date;
                        return date.year + "年" + (date.month + 1) + "月" + date.day + "日";
                    }
                },
                calendarDayView: {
                    type: "resourceTimeline",
                    slotWidth: 100,
                    slotLabelFormat: function (date) {
                        return (date.date.month + 1) + '月' + date.date.day + '日';
                    },
                    slotDuration: "24:00:00",
                    resourceLabelText: "工作台",
                    resourceAreaWidth: "150px",
                    duration: { days: 7 },
                    titleFormat(info) {
                        let date = info.date;
                        return date.year + "年" + (date.month + 1) + "月";
                    }
                },
                calendarWeekView: {
                    type: "resourceTimeline",
                    slotWidth: 100,
                    slotLabelFormat: getWeekLabelFormat,
                    slotDuration: "168:00:00",
                    resourceLabelText: "工作台",
                    resourceAreaWidth: "150px",
                    duration: { month: 1 },
                    titleFormat(info) {
                        let date = info.date;
                        return date.year + "年" + (date.month + 1) + "月";
                    }
                },
                calendarMonthView: {
                    type: "resourceTimeline",
                    slotWidth: 100,
                    slotLabelFormat: function (date) {
                        return (date.date.month + 1) + '月';
                    },
                    slotDuration: {
                        // years:0,
                        month:1,
                        // milliseconds: 3600 * 1000 * 24 * 7
                    },
                    // slotDuration: "24:00:00",
                    resourceLabelText: "工作台",
                    resourceAreaWidth: "150px",
                    duration: { year: 1 },
                    titleFormat(info) {
                        let date = info.date;
                        return date.year + "年";
                    }
                },
            },
            locale: "zh-cn",
            height: "parent",
            resources: data,
            customButtons: customButtons,
            header: { left: '', center: 'title', right: 'hourBtn,dayBtn,weekBtn,monthBtn today prev,next' },
            events: getEvents,
            eventOrder: '',
            eventAfterRender(data) {
                console.log('-------')
                console.log(data)
            },
            resourceRender(info) {
                let el = info.el;
                el.style.fontSize = "18px";
                el.style.textAlign = "center";
                return el;
            },

        });
        gunter.render();
        gunter.scrollToTime({
            day: 0 // 滚动到第几天
        });
    };

    // 延迟500 毫秒后加载甘特图，防止弹框动画卡顿
    setTimeout(() => {
        getAllPlatform(function (data) {
            initGunter(data);
        })
    }, 500)

})(window);