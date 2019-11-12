// name: lib 
// project: tianjin-yiqi 
// author: 区区电脑
// user: gys
// e-mail: 1573580882@qq.com
// date: 2019-11-12 21:10
// ...

(function (w) {

    const config = {
        localStorageKeyHeader: 'tianjin_yiqi_', // 数据缓存 key 前缀
        host: 'http://47.244.122.43:8080'
    };

    // 批量设置style 方法
    Element.prototype.setStyles = function (style) {
        for (let key in style) {
            this.style[key] = style[key];
        }
    };
    // 设置动画
    Element.prototype.animationTo = function (style, time, callback) {
        if (!time) {
            time = 300;
        }
        this.style.transition = 'all ' + time + 'ms ease';
        let __this = this;
        setTimeout(function () {
            __this.setStyles(style);
        }, 0);
        setTimeout(function () {
            if (callback) {
                callback()
            }
        }, time)
    };

    /**
     * 获取随机数
     * @returns {string}
     */
    let getRandom = function () {
        return parseInt(String(Math.random() * 1000000000)) + '';
    };

    /**
     * 获取遮罩层
     * @param alpha 透明度 0-1
     * @returns {HTMLDivElement}
     */
    let getCoverLayer = function (alpha) {
        if (!alpha) {
            alpha = 0;
        }
        let coverLayer = document.createElement('div');
        coverLayer.id = 'coverLayer' + getRandom();
        coverLayer.setStyles({
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, ' + alpha + ')',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        });
        return coverLayer;
    };

    let lib = {
        Color: {
            normal: '#3B83FF',
            red: '#E62129',
            white: '#ffffff'
        },
        /**
         * 信息框
         * @param message
         */
        toast: function (message, time) {
            if (!time) {
                time = 1500;
            }
            // 添加遮罩
            let cover = getCoverLayer(0);
            document.body.append(cover);
            // 添加信息框
            let toast = document.createElement('div');
            toast.innerText = message;
            toast.setStyles({
                padding: '6px 15px',
                backgroundColor: 'rgba(0, 0, 0, .7)',
                color: '#ffffff',
                fontSize: '14px',
                transform: 'scale(0)',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, .8)',
                marginTop: '-100px'
            });
            cover.append(toast);

            toast.animationTo({
                transform: 'scale(1)'
            }, 200);

            setTimeout(function () {
                toast.animationTo({
                    transform: 'scale(0)'
                }, 80, function () {
                    cover.remove();
                });
            }, time - 100);
            return toast;
        },
        loading: function (message) {
            // 添加遮罩
            let cover = getCoverLayer(0);
            cover.id = 'loadingAnimation';
            document.body.append(cover);
            // 添加信息框
            let toast = document.createElement('div');
            toast.innerHTML = '<span class="iconfont icon-loading loading" style="font-size: 24px;margin-right: 5px;line-height: 20px;"></span>' + '<span style="line-height: 20px;">' + message + '</span>';
            toast.setStyles({
                padding: '6px 15px',
                backgroundColor: 'rgba(0, 0, 0, .7)',
                color: '#ffffff',
                fontSize: '14px',
                transform: 'scale(0)',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, .8)',
                marginTop: '-100px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            });
            cover.append(toast);

            toast.animationTo({
                transform: 'scale(1)'
            }, 200);

            return toast;
        },
        closeLoading: function () {
            let loading = document.getElementById('loadingAnimation');
            if (loading) {
                loading.remove();
            }
        },
        toastSuccess: function (message, time) {
            if (!time) {
                time = 1500;
            }
            // 添加遮罩
            let cover = getCoverLayer(0);
            document.body.append(cover);
            // 添加信息框
            let toast = document.createElement('div');
            toast.innerHTML = '<span class="iconfont icon-success" style="font-size: 35px;margin-bottom: 20px;"></span><span>' + message + '</span>';
            toast.setStyles({
                padding: '20px 20px 10px 20px',
                backgroundColor: 'rgba(0, 0, 0, .7)',
                color: '#ffffff',
                fontSize: '14px',
                transform: 'scale(0)',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, .8)',
                marginTop: '-100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            });
            cover.append(toast);

            toast.animationTo({
                transform: 'scale(1)'
            }, 200);

            setTimeout(function () {
                toast.animationTo({
                    transform: 'scale(0)'
                }, 80, function () {
                    cover.remove();
                });
            }, time - 100);
            return toast;
        },
        toastError: function (message, time) {
            if (!time) {
                time = 1500;
            }
            // 添加遮罩
            let cover = getCoverLayer(0);
            document.body.append(cover);
            // 添加信息框
            let toast = document.createElement('div');
            toast.innerHTML = '<span class="iconfont icon-shibai" style="font-size: 35px;margin-bottom: 20px;"></span><span>' + message + '</span>';
            toast.setStyles({
                padding: '20px 20px 10px 20px',
                backgroundColor: 'rgba(0, 0, 0, .7)',
                color: '#ffffff',
                fontSize: '14px',
                transform: 'scale(0)',
                borderRadius: '4px',
                border: '1px solid rgba(0, 0, 0, .8)',
                marginTop: '-100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            });
            cover.append(toast);

            toast.animationTo({
                transform: 'scale(1)'
            }, 200);

            setTimeout(function () {
                toast.animationTo({
                    transform: 'scale(0)'
                }, 80, function () {
                    cover.remove();
                });
            }, time - 100);
            return toast;
        },
        confirm: function (title, message, btns) {
            // 添加遮罩
            let cover = getCoverLayer(0.3);
            document.body.append(cover);
            // 添加内容
            let content = document.createElement('div');
            content.id = getRandom();
            content.setStyles({
                width: '260px',
                padding: '20px 20px 10px 20px',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                maxHeight: '400px',
                transform: 'scale(0)'
            });
            cover.append(content);
            content.animationTo({
                transform: 'scale(1)'
            }, 300);
            // 添加标题
            let titleView = document.createElement('div');
            titleView.innerText = title;
            titleView.setStyles({
                textAlign: 'center',
                paddingBottom: '10px',
                fontSize: '16px',
                color: '#000000'
            });
            content.append(titleView);
            // 添加消息
            let messageView = document.createElement('div');
            messageView.innerText = message;
            messageView.setStyles({
                textAlign: 'center',
                padding: '10px 10px 20px 10px',
                fontSize: '14px',
                color: "gray"
            });
            content.append(messageView);
            // 添加按钮组
            let btnGroup = document.createElement('div');
            btnGroup.setStyles({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingTop: '10px'
            });
            content.append(btnGroup);
            // 添加按钮
            for (let i = 0; i < btns.length; i++) {
                let btn = document.createElement('div');
                btn.innerText = btns[i].text;
                btn.setStyles(btns[i].style);
                btn.clickEvent = btns[i].click;
                if (btn.clickEvent) {
                    btn.onclick = function (e) {
                        e.target.clickEvent();
                        cover.remove();
                    }
                } else {
                    btn.onclick = function () {
                        cover.remove();
                    }
                }
                btnGroup.append(btn);
            }
        },
        menu: function (title, btns) {
            // 添加遮罩
            let cover = getCoverLayer(0.3);
            cover.onclick = function () {
                cover.remove();
            };
            document.body.append(cover);
            // 添加内容
            let content = document.createElement('div');
            content.id = getRandom();
            content.setStyles({
                padding: '10px 0',
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                position: 'fixed',
                left: '20px',
                right: '20px',
                bottom: '-100%',
            });
            cover.append(content);
            content.animationTo({
                bottom: '10px',
            }, 300);
            // 添加标题
            let titleView = document.createElement('div');
            titleView.innerText = title;
            titleView.setStyles({
                textAlign: 'center',
                paddingBottom: '10px',
                fontSize: '14px',
                color: 'gray'
            });
            content.append(titleView);

            // 添加按钮组
            let btnGroup = document.createElement('div');
            btnGroup.setStyles({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center',
            });
            content.append(btnGroup);
            // 添加按钮
            for (let i = 0; i < btns.length; i++) {
                let btn = document.createElement('div');
                btn.innerText = btns[i].text;
                btn.setStyles({
                    width: '100%',
                    padding: '15px 0',
                    color: btns[i].color || '#3B83FF',
                    textAlign: 'center'
                });
                btn.clickEvent = btns[i].click;
                if (btn.clickEvent) {
                    btn.onclick = function (e) {
                        e.target.clickEvent();
                        cover.remove();
                    }
                } else {
                    btn.onclick = function () {
                        cover.remove();
                    }
                }
                btnGroup.append(btn);
            }
            let btnCancel = document.createElement('div');
            btnCancel.innerText = '取消';
            btnCancel.setStyles({
                width: '100%',
                padding: '10px 0',
                color: 'gray',
                textAlign: 'center',
                borderTop: '4px solid rgba(0, 0, 0, .01)'
            });
            btnCancel.onclick = function () {
                cover.remove();
            };
            btnGroup.append(btnCancel);
        },
        /**
         * 网络请求
         * @param path
         * @param params
         * @param success
         * @param message
         */
        http: function (path, params, success, type, message) {
            let __this = this;
            if (message) {
                this.loading(message);
            }
            $.ajax({
                url: config.host + path,
                type: type || 'post',
                data: params,
                async: true,
                success: function (res) {
                    if (message) {
                        __this.closeLoading();
                    }
                    if (res) {
                        if (success) {
                            success(res);
                        }
                    }
                    // if (res.code === 0 || res.code === '000') {
                    //     if (success) {
                    //         success(res)
                    //     }
                    // } else {
                    //     success(res);
                    //     __this.toastError(res.msg);
                    // }
                }, error: function () {
                    if (message) {
                        __this.closeLoading();
                    }
                    __this.toastError('请检查当前网络');
                }
            })
        },
        /**
         * 获取url 参数
         * @param key
         * @returns {*}
         */
        getUrlQueryParams: function (key) {
            let tempString = window.location.search.substring(1);
            if (!tempString) {
                return;
            }
            let tempArray = tempString.split('&');
            let params = {};
            for (let i = 0; i < tempArray.length; i++) {
                let tempKey = tempArray[i].split('=')[0];
                let tempValue = tempArray[i].split('=')[1];
                params[tempKey] = tempValue;
            }
            return params[key];
        },
        /**
         * 缓存数据
         * @param key
         * @param value
         */
        localStorageSet: function (key, value) {
            let tempValue;
            if (typeof value === "string") {
                tempValue = value;
            } else {
                tempValue = JSON.stringify(value);
            }
            localStorage.setItem(config.localStorageKeyHeader + key, tempValue);
        },
        /**
         * 从缓存获取数据
         * @param key
         * @returns {string}
         */
        localStorageGet: function (key) {
            let value = localStorage.getItem(config.localStorageKeyHeader + key);
            let tempValue;
            try {
                tempValue = JSON.parse(value);
            } catch (e) {
                tempValue = value;
            }
            return tempValue;
        },
        iOSBack: function () {
            let bg = new JSBridge();
            if (bg.osName() === 'iOS' || bg.osName() === 'iPad') {
                bg.connect((b) => {
                    b.callHandler('iOSBackLastPage');
                    bridge = b;
                });
            } else {
                window.history.back(-1);
            }
        }
    };
    w.$lib = lib;
})(window);