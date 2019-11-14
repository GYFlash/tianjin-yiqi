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
        getWeekLabelFormat; // 日历视图标题

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
        // $lib.http('/apis/resource/GetAllPlatform', {}, function (res) {
        //     let temp = [];
        //     if (res.Data) {
        //         for (let i = 0; i < res.Data.length; i++) {
        //             let item = res.Data[i];
        //             item['id'] = item['ID'];
        //             item['title'] = item['Name'];
        //             let id = item.id;
        //             let label = item.title;
        //             let option = '<option value="'+id+'">'+label+'</option>';
        //             $('#selectRobotId').append(option);
        //             temp.push(item)
        //
        //         }
        //     }
        //     if (callback) {
        //         callback(temp);
        //     }
        // }, 'get', '查询工作台...')
        let temp = [
            {
                title: '平台一',
                id: '6d5f8d87-a0af-4ac0-a008-6ed38946d6c5',
                children: [
                    {title: '主臂', id: '4c577eb4-85d1-4c30-ad69-8c5dc03297a1'},
                    {title: '辅臂', id: '4c1bb5de-cc2a-4720-a2e5-4cd7d988bada'}
                ]
            },
            {
                title: '平台二',
                id: 'f4d335f7-5fa9-41a8-8c09-1cf90ee8229e',
                children: [
                    {title: '主臂', id: '93361a75-742a-4b9a-a3ea-c7188ab30f29'},
                    {title: '辅臂', id: 'a6ab62fd-4e42-438f-a2d1-3d4719adc02b'}
                ]
            },
            {
                title: '平台三',
                id: 'c0481acc-3fad-4364-82c5-bb8b17c515bc',
                children: [
                    {title: '主臂', id: '4a30bdd2-3350-49f1-966b-368657135f81'},
                    {title: '辅臂', id: 'e19752e8-26a9-4f41-a273-aa2551367bd9'}
                ]
            },
            {
                title: '平台四',
                id: '2be15b3d-1041-489f-9343-d59a7d1d1b16',
                children: [
                    {title: '主臂', id: '3d3c5ed3-65f3-47a8-be25-8fff01fc8cf3'},
                    {title: '辅臂', id: 'fee3d2b8-1712-498e-a236-9c05163d2949'}
                ]
            }
        ];
        if (callback) {
            callback(temp);
        }
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
        $lib.http('/apis/inspectorder/GetSubInspectOrderGanttByTime', {start: date.startStr, stop: date.endStr}, function (res) {
            let temp = [];
            if (res.Data) {
                for (let i = 0; i < res.Data.length; i++) {
                    let num = 1;
                    if (res.Data[i]['OrderNo']) {
                        num = 2
                    }
                    let item = {
                        id: res.Data[i]['DeviceId'],
                        resourceId: res.Data[i]['PlatformId'],
                        // resourceId: '4c1bb5de-cc2a-4720-a2e5-4cd7d988bada',
                        title: res.Data[i]['PartName'],
                        color: getColor(res.Data[i]['DeviceId']),
                        num: num,
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