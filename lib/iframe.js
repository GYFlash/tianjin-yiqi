// FileName: iframe
// ProjectName: iframe
// 作者: 区区电脑
// e-mail: 1573580882@qq.com
// CreateTime: 2019/11/14

(function (w) {
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
    const getRandom = function () {
        return parseInt(String(Math.random() * 1000000000)) + '';
    };
    const Iframe = function () {

        this.container = document.createElement('div');
        this.header = document.createElement('div');
        this.content = document.createElement('div');
        this.iframe = document.createElement('iframe');
        this.closeButton = document.createElement('div');
        this.title = document.createElement('div');
        this.closeButton.innerHTML = '关闭';

        this.title.setStyles({
            position: 'absolute',
            left: '80px',
            top: '0',
            right: '80px',
            height: '49px',
            display: 'block',
            backgroundColor: '#ffffff',
            color: '#000000',
            lineHeight: '50px',
            textAlign: 'center',
            padding: '0 10px',
            fontSize: '24px',
            fontWeight: '600'
        });
        this.closeButton.setStyles({
            position: 'absolute',
            right: '0',
            top: '0',
            height: '49px',
            display: 'block',
            backgroundColor: '#ff0000',
            color: '#ffffff',
            lineHeight: '49px',
            textAlign: 'center',
            width: '80px',
            cursor: 'pointer'
        });
        this.container.setStyles({
            border: '1px solid gainsboro',
            position: 'fixed',
            left: '200px',
            right: '200px',
            top: '200px',
            bottom: '200px',
            display: 'block',
            backgroundColor: '#ffffff',
            zIndex: '10'
        });
        this.header.setStyles({
            position: 'absolute',
            left: '0',
            right: '0',
            top: '0',
            height: '50px',
            display: 'block',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid gainsboro',
            userSelect: 'none',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, .3)',
            zIndex: 2
        });
        this.content.setStyles({
            position: 'absolute',
            left: '0',
            right: '0',
            top: '51px',
            bottom: '0',
            display: 'block',
            backgroundColor: '#ffffff',
            zIndex: 1
        });
        this.iframe.setStyles({
            border: 'none',
            width: '100%',
            height: '100%',
            display: 'block',
            backgroundColor: '#ffffff',
        });
        let __this = this;
        this.closeButton.onclick = function () {
            __this.close();
        };
        this.header.append(this.title);
        this.header.append(this.closeButton);
        this.content.append(this.iframe);
        this.container.append(this.header);
        this.container.append(this.content);
    };
    Iframe.prototype.open = function (title, src) {
      this.iframe.src = src;
      this.title.innerHTML = title;
      document.body.append(this.container);
      this.container.animationTo({
          left: '0',
          right: '0',
          top: '0',
          bottom: '0',
      }, 300);
    };
    Iframe.prototype.close = function () {
        let __this = this;
        this.container.animationTo({
            left: '200px',
            right: '200px',
            top: '200px',
            bottom: '200px',
            opacity: 0
        }, 100, function () {
            __this.iframe.src = null;
            __this.container.remove();
            __this.container = null;
        });
    };
    w.Iframe = Iframe;

})(window);
