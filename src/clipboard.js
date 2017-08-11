function ClipboardJs(){
    this.eventList = {};
    this.symbols = [];
}

/**
 * 判断是否为ie浏览器
 * @returns {boolean}
 */
ClipboardJs.prototype. isIE = function() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
};

/**
 *  获取元素的事件列表
 * @param element {Element} 获取此元素的事件列表
 * @returns {Number} 当前元素索引
 */
ClipboardJs.prototype.getElementEvents = function(element){
    var i, res, len;
    len = this.symbols.length;
    for(i = 0; i < len; i++){
        if(this.symbols[i][1] == element){
            res = this.symbols[i];
            break;
        }
    }
    return i;
};

/**
 * 给dom元素绑定事件
 * @param element {Element} 绑定事件的dom元素
 * @param obj {Object} 需要绑定的事件
 */
ClipboardJs.prototype.addEventListener = function(element, obj){
    var i, _this = this;
    this.clearEventListener(element);
    var symbol;
    if(typeof Symbol === 'function'){
        symbol = Symbol();
    } else {
        symbol = element.outerHTML;
    }
    this.symbols.push([symbol, element]);

    this.eventList[this.getElementEvents(element)] = obj;
    for(i in obj){
        (function(index){
            element.addEventListener(i, function(e){
                obj[index](function(){
                    if(_this[index]){
                        _this[index](e);
                    }
                }, e);
            });
        })(i);
    }

    if(this.isIE()){
        element.addEventListener('keydown', function(e){
            e = e || event;
            if(e.ctrlKey){
                if(e.keyCode === 67){
                    // 复制
                    if(obj.copy){
                        obj.copy(function(){
                            _this['copy'](e);
                        });
                    }

                }

                if(e.keyCode === 88){
                    // 剪切
                    if(obj.cut){
                        obj.cut(function(){
                            _this['cut'](e);
                        });
                    }
                }

                if(e.keyCode === 86){
                    // 粘贴
                    if(obj.paste){
                        obj.paste(function(){
                            _this['paste'](e);
                        });
                    }
                }
            }


            // console.log(e.keyCode);
        });
    }

    return element;
};

/**
 * dom元素解绑事件
 * @param element {Element} 需要清除事件的dom元素
 * @param obj ? {Object} 清除指定事件或清除所有事件并且在记录中清除它们
 */
ClipboardJs.prototype.clearEventListener = function(element, obj){
    var i;
    var eventAll = this.eventList[this.getElementEvents(element)];
    if(!obj){
        obj = eventAll;
        this.symbols.pop();
    }
    if(obj){
        for(i in obj){
            element.removeEventListener(i, eventAll[i]);
            element.removeEventListener(i, obj[i]);
        }
    }
};

/**
 * 清除所有事件
 */
ClipboardJs.prototype.clearEvents = function(){
    var _this = this;
    this.symbols.forEach(function(item){
        _this.clearEventListener(item[1]);
    });
    _this.symbols = [];
};

/**
 * 获取浏览器Clipboard对象
 * @param e {ClipboardEvent} event 对象
 * @returns {ClipboardData|DataTransfer}
 */
ClipboardJs.prototype.getClipboardData = function(e){
    e = e || event;
    if(!e){
        e = {};
    }
    return e.clipboardData || window.clipboardData;
};

/**
 * 设置 复制的内容
 * @param value {String}
 */
ClipboardJs.prototype.setCopyValue = function(value){
    this.copyValue = value;
};

/**
 * 获取复制的你内容
 * @returns {String|*}
 */
ClipboardJs.prototype.getCopyValue = function(){
    return  this.copyValue;
};

/**
 * 复制
 * @param e? {Event}
 * @param text? {String} 需要复制的字符串
 */
ClipboardJs.prototype.copy = function(e, text){
    if(typeof e === 'string'){
        this.setCopyValue(e);
        if(text && text && typeof text.focus === 'function'){
            text.focus();
            document.execCommand('copy');
        }

        return;
    }

    var clipboardData = this.getClipboardData(e);
    clipboardData.setData('Text', text || this.getCopyValue());
    // clipboardData.setData('Text', 'sss');

    if(e){
        e.preventDefault();
    }

};

/**
 * 剪切
 * @param e? {Event}
 * @param text? {String} 需要剪切的字符串
 */
ClipboardJs.prototype.cut = function(e, text){
    if(typeof e === 'string'){
        this.setCopyValue(e);
        if(text && text && typeof text.focus === 'function'){
            text.focus();
            document.execCommand('cut');
        }
        return;
    }
    var clipboardData = this.getClipboardData(e);
    clipboardData.setData('Text', text || this.getCopyValue());
    document.execCommand("Delete");
    e.preventDefault();
};

/**
 * 获取粘贴的内容
 * @param e? {ClipboardEvent}
 * @returns {string} 粘贴的内容
 */
ClipboardJs.prototype.getPaste = function(e){
    var clipboardData = this.getClipboardData(e);
    return clipboardData.getData('Text');
};

/**
 * 粘贴
 * @param e {ClipboardEvent}
 */
ClipboardJs.prototype.paste = function(e){
    // if(element){
    //     element.focus();
    // }
    //
    // document.execCommand("Paste");
};

/**
 * 清除实例
 */
ClipboardJs.prototype.destroy = function(){
    this.clearEvents();
};
