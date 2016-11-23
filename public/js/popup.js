/**
 * popup 组件
 * author wz
 */
(function(window, jQuery) {
    var htmls = {
        ovl: '<div class="J_WinpopMask winpop-mask" id="J_WinpopMask"></div>' + '<div class="J_WinpopBox winpop-box" id="J_WinpopBox">' + '<div class="J_WinpopMain winpop-main"></div>' + '<div class="J_WinpopBtns winpop-btns"></div>' + '</div>',
        alert: '<input type="button" class="J_AltBtn pop-btn alert-button" value="确定">',
        confirm: '<input type="button" class="J_CfmFalse pop-btn confirm-false" value="取消">' + '<input type="button" class="J_CfmTrue pop-btn confirm-true" value="确定">'
    };
    //构造函数
    function PopUp() {
        var config = {};
        this.set = function(n, v) {
            config[n] = v;
        };
        this.get = function(n) {
            return config[n];
        };
        console.log(this);
        this.init();
    }
    PopUp.prototype = {
        init: function() {
            this.createDom();
            this.bindEvent();
        },
        createDom: function() {
            var body = $('body'),
                ovl = $('.J_WinpopBox');
            if (!ovl.length) {
                body.append(htmls.ovl);
            }
            this.set('ovl', $('.J_WinpopBox'));
            this.set('mask', $('.J_WinpopMask'));
        },
        bindEvent: function() {
            var _this = this,
                ovl = this.get('ovl'),
                mask = this.get('mask');
            ovl.on('click','.J_AltBtn',function () {
                _this.hide();
            });
            ovl.on('click','.J_CfmFalse',function () {
                var cb = _this.get('confirmCallback');
                _this.hide();
                cb(false);
            });
            ovl.on('click','.J_CfmTrue',function () {
                var cb = _this.get('confirmCallback');
                _this.hide();
                cb(true);
            });
            mask.on('click', function() {
                _this.hide();
            });
            $(document).on('keyup',function(e) {
                var keycode = e.keyCode,
                    cb = _this.get('confirmCallback');
                if(keycode == 27) {
                    _this.hide();//esc 消失
                }else if (keycode == 13) {
                    if(_this.get('type') === 'confirm'){
                        cb(true);
                    }
                }

            });
        },
        alert: function(str, btnstr) {
            var _str = typeof str === "string" ? str : str.toString(),
                ovl = this.get('ovl');
            ovl.find('.J_WinpopMain').html(str);
            this.set('type','alert');
            if (btnstr) {
                ovl.find('.J_WinpopBtns').html(btnstr);
            } else {
                ovl.find('.J_WinpopBtns').html(htmls.alert);
            }
            this.show();

        },
        confirm: function(str, callback) {
            var _str = typeof str === "string" ? str : str.toString(),
                ovl = this.get('ovl');
            this.set('type','confirm');
            ovl.find('.J_WinpopMain').html(str);
            ovl.find('.J_WinpopBtns').html(htmls.confirm);
            this.set('confirmCallback',(callback || function(){}));
            this.show();
        },
        show: function() {
            this.get('ovl').show();
            this.get('mask').show();
        },
        hide: function() {
            this.get('ovl').hide();
            this.get('mask').hide();
        },
        destory: function() {
            this.get('ovl').remove();
            this.get('mask').remove();
            delete window.showAlert;
            delete window.showConfirm;
        }
    };
    var popUp = new PopUp();
    window.showAlert = function(str) {
        popUp.alert.call(popUp, str);
    };
    window.showConfirm = function(str, cb) {
        popUp.confirm.call(popUp, str, cb);
    };

})(window, jQuery);
