function Clipboard(){
    this.eventList = {};
    this.symbols = [];
}

/**
 *  获取元素的事件列表
 * @param element {Element} 获取此元素的事件列表
 * @returns {Number} 当前元素索引
 */
Clipboard.prototype.getElementEvents = function(element){
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
Clipboard.prototype.addEventListener = function(element, obj){
    var i;
    this.clearEventListener(element);
    this.symbols.push([Symbol(), element]);

    this.eventList[this.getElementEvents(element)] = obj;
    for(i in obj){
        element.addEventListener(i, obj[i]);
    }
};

/**
 * dom元素解绑事件
 * @param element {Element} 需要清除事件的dom元素
 * @param obj ? {Object} 清除指定事件或清除所有事件并且在记录中清除它们
 */
Clipboard.prototype.clearEventListener = function(element, obj){
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
Clipboard.prototype.clearEvents = function(){
    var _this = this;
    this.symbols.forEach(function(item){
        _this.clearEventListener(item[1]);
    });
    _this.symbols = [];
};

/**
 * 获取浏览器Clipboard对象
 * @param e {Event} event 对象
 * @returns {ClipboardData|DataTransfer}
 */
Clipboard.prototype.getClipboardData = function(e){
    e = e || event;
    return e.clipboardData || window.clipboardData;
};

/**
 * 复制
 * @param e {Event}
 * @param text {String} 需要复制的字符串
 */
Clipboard.prototype.copy = function(e, text){
    var clipboardData = this.getClipboardData(e);
    clipboardData.setData('Text', text);
    e.preventDefault();
};

/**
 * 剪切
 * @param e {Event}
 * @param text {String} 需要剪切的字符串
 */
Clipboard.prototype.cut = function(e, text){
    var clipboardData = this.getClipboardData(e);
    clipboardData.setData('Text', text);
    e.preventDefault();
};

/**
 * 获取粘贴的内容
 * @param e {Event}
 * @returns {string} 粘贴的内容
 */
Clipboard.prototype.getPaste = function(e){
    var clipboardData = this.getClipboardData(e);
    return clipboardData.getData('Text');
};


