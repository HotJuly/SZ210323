function Observer(data) {
  // data就是我们传过来的data
  // 在Observer实例化对象身上先保存data 地址是一样的
    this.data = data;
    this.walk(data);//走起
}

Observer.prototype = {
    walk: function(data) {
        var me = this; //保存Observer实例化对象，因为下面要用
        Object.keys(data).forEach(function(key) {
            //遍历data当中所有的属性，每个属性都会调用convert方法
            //这个方法内部又去调用了defineReactive方法
            me.convert(key, data[key]); //msg  'zhaoliying'
        });
    },
    convert: function(key, val) { //msg  'zhaoliying'
        this.defineReactive(this.data, key, val);  //整体的data  msg  'zhaoliying'
    },

    defineReactive: function(data, key, val) { //整体的data  msg  'zhaoliying'
        var dep = new Dep();  //根据遍历的每个属性都会创建一个特定的dep对象与相应的data属性进行关联
        var childObj = observe(val); //递归调用，目的是为了看属性的值是不是又是对象，如果是递归给每个属性也创建dep对象
        
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define

            //对data当中所有的属性都添加 get和set方法让其成为响应式的属性
            //为了监视这些数据的变化，如果发生变化，那么将会通知去修改页面上的效果
            get: function() {
              
                //让属性和页面上的表达式 进行绑定
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};


//首先判断传过来的data也就是这个value是不是一个对象，如果是才去监视
// {msg:'zhaoliying'}
function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    // 如果传过来的data是对象，那么就开始监视
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;