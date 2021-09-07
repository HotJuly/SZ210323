function Compile(el, vm) {
    // el=>"#app" vm
    // this=>complie实例对象
    this.$vm = vm;
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);

    if (this.$el) {
        // 此处只做了一件事,将页面上app元素中所有的节点全部转移到文档碎片中
        // app元素被抄家了
        this.$fragment = this.node2Fragment(this.$el);

        // 此处是beforeMount的执行时机

        this.init();
        // Vue1.0和2.0的区别
        // Vue1.0中,会将所有的节点解析完之后插入到页面的app节点内部
        // Vue2.0中,会将所有的节点解析完成之后,替换掉页面上的app节点
        this.$el.appendChild(this.$fragment);

        // 此处是mounted的执行时机
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        // el->app元素节点
        var fragment = document.createDocumentFragment(),
            child;

        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        // el=>文档碎片对象
        // childNodes = [text节点,p节点,text节点](这是个伪数组)
        var childNodes = el.childNodes,
            me = this;

        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;

            if (me.isElementNode(node)) {
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }

            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });

        
        // [text节点,p节点,text节点].forEach(function(node) {
        //     var text = node.textContent; text=>"{{msg}}"
        //     var reg = /\{\{(.*)\}\}/;

        //     if (co.isElementNode(node)) {
        //         co.compile(p节点);

        //     } else if (me.isTextNode(node) && reg.test(text)) {
        //         co.compileText(text节点, "msg");
        //     }

        //     if (node.childNodes && node.childNodes.length) {
        //         me.compileElement(p标签);
        //     }
        // });
    },

    compile: function(node) {
        // node=>p节点
        var nodeAttrs = node.attributes,
            me = this;

            // console.log(123,nodeAttrs);
        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (me.isDirective(attrName)) {
                var exp = attr.value;
                var dir = attrName.substring(2);
                // 事件指令
                if (me.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        // text节点, "msg"
        compileUtil.text(node, this.$vm, exp);
        // compileUtil.text(text节点, vm, "msg");
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        // text节点, vm, "msg"
        this.bind(node, vm, exp, 'text');
        // this.bind(text节点, vm, "msg", 'text');
    },

    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        this.bind(node, vm, exp, 'model');

        var me = this,
            val = this._getVMVal(vm, exp);
        node.addEventListener('input', function(e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }

            me._setVMVal(vm, exp, newValue);
            val = newValue;
        });
    },

    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        // 每有一个插值语法或者一个Vue指令就会执行一次bind
        // 执行一次bind会生成一个watcher实例
        // 总结:每个插值语法或者指令都会生成一个对应的watcher实例
        // text节点, vm, "msg", 'text'
        var updaterFn = updater[dir + 'Updater'];
        // var updaterFn = updater['textUpdater'];

        updaterFn && updaterFn(node, this._getVMVal(vm, exp));
        // updaterFn && updaterFn(text节点, "hello mvvm");

        new Watcher(vm, exp, function(value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        });
        
        // new Watcher(vm, "msg", function(value, oldValue) {
        //     textUpdater && textUpdater(text节点, value, oldValue);
        // });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        var eventType = dir.split(':')[1],
            fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        // vm, "msg"
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};


var updater = {
    textUpdater: function(node, value) {
        // text节点, "hello mvvm"
        node.textContent = typeof value == 'undefined' ? '' : value;
    },

    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },

    classUpdater: function(node, value, oldValue) {
        var className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        var space = className && String(value) ? ' ' : '';

        node.className = className + space + value;
    },

    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};