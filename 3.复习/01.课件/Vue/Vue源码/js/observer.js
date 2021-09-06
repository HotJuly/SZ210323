function Observer(data) {
  // data就是我们传过来的data,vm._data
//   this=>ob对象
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

        // ["msg"].forEach(function(key) {
        //     ob.convert("msg", "hello mvvm"); 
        // });
    },
    convert: function(key, val) { //msg  'zhaoliying'
        // "msg", "hello mvvm"
        this.defineReactive(this.data, key, val);  //整体的data  msg  'zhaoliying'
        // this.defineReactive(vm._data, "msg", "hello mvvm");
    },

    defineReactive: function(data, key, val) { //整体的data  msg  'zhaoliying'
        // vm._data, "msg", "hello mvvm"
        var dep = new Dep();  //根据遍历的每个属性都会创建一个特定的dep对象与相应的data属性进行关联

        // 此处在递归进行数据劫持,对data中的所有属性进行深度递归
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

        // 此处正在做数据劫持操作,正在重写_data身上的所有属性
        // 将属性的value值替换成get和set方法
        // 虽然Vue将所有属性都改成了get和set方法,会丢失value值,但是他通过闭包的方式缓存了当前的最新结果
        // Object.defineProperty(vm._data, "msg", {
        //     enumerable: true, // 可枚举
        //     configurable: false, // 不能再define

        //     //对data当中所有的属性都添加 get和set方法让其成为响应式的属性
        //     //为了监视这些数据的变化，如果发生变化，那么将会通知去修改页面上的效果
        //     get: function() {
              
        //         //让属性和页面上的表达式 进行绑定
        //         if (Dep.target) {
        //             dep.depend();
        //         }
        //         return val;
        //     },
        //     set: function(newVal) {
            // 总结:如果旧值和新值完全相同,Vue不会更新视图
        //         if (newVal === val) {
        //             return;
        //         }
        //         val = newVal;
        //         // 新的值是object的话，进行监听
        //          Vue创建响应式属性的两个时机,一是初始化组件的data时候,二是当响应式属性的值发生变化,会重新劫持最新数值
        //         childObj = observe(newVal);
        //         // 通知订阅者
        //         dep.notify();
        //     }
        // });
    }
};


//首先判断传过来的data也就是这个value是不是一个对象，如果是才去监视
// {msg:'zhaoliying'}
function observe(value, vm) {
    // data, vm
    // 此处在判断value值是否是对象,如果不是对象就停止执行
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