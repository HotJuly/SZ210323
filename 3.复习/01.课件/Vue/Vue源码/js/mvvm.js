function MVVM(options) {
  /*
    options =>
      {
        el: "#app",
        data: {
          msg: "hello mvvm",
          person:{
            name:"xiaoming",
            msg:"123"
          },
        }
      }

      this是谁? => vm实例对象
  */

   //把配置对象保存给vm一份
    this.$options = options;
    //把配置对象的data保存到vm的_data 地址一样
    var data = this._data = this.$options.data;
    // 将data对象的地址值保存在三个地方
    // var data = (this._data = this.$options.data);


    var me = this; //保存vm给me

    // 1.数据代理
    // 实现 vm.xxx -> vm._data.xxx
    /*
      数据代理
      目的:方便开发者读取$data身上的属性,可以减少一层属性书写(this.$data.msg,可以写作this.msg)
      总结:数据代理只会代理data中的直系属性,不会深度代理
      他并不属于响应式原理的一部分,有他没他都一样
    */
    Object.keys(data).forEach(function(key) {
      // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
        me._proxy(key);
    });

    
    // ["msg"].forEach(function(key) {
    //   // 遍历data当中的所有属性，每个属性都会调用下面的_proxy方法
    //     vm._proxy("msg");
    // });


    //数据监视劫持（原始data当中的所有属性数据进行监视）
    /*
      什么是响应式?
        当data中的属性值发生修改,页面会重新进行渲染
        拆解:
          1.如何知道data中的属性值发生变化
            其实和数据代理原理相同
            Vue可以通过Object.defineProperty中的set方法,可以监视到开发者对data中属性值的修改操作
            此部分通过数据劫持实现

          2.如何导致页面重新渲染

      2.数据劫持
        数据劫持是在重写$data对象身上的所有的属性,将他从value改为get/set方法
        data对象身上具有多少个属性,就会被数据劫持多少次
        注意:所谓的数据劫持,劫持的是属性名,不是属性值

    */
    observe(data, this);
    
    // observe(data, vm);

    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },

    _proxy: function(key) {
      // key=>"msg" this=>vm对象
      // 保存vm以方便下面的函数中也可以找到vm
        var me = this;

        //正儿八经的数据代理
        //在vm身上添加一个和data当中同名的属性
        Object.defineProperty(me, key, {
            configurable: false, //不能重复定义
            enumerable: true, //可以遍历
            get: function proxyGetter() {
              //当访问vm身上的属性值的时候，会去返回data的同名属性值
                return me._data[key];
            },
            set: function proxySetter(newVal) {
              //当设置vm身上的属性值的时候，会去设置data的同名属性值
                me._data[key] = newVal;
            }
        });

        // 定义访问描述符(value值和get/set方法无法共存)
      //   Object.defineProperty(vm, "msg", {
      //     configurable: false, //不能重复定义
      //     enumerable: true, //可以遍历
      //     get: function proxyGetter() {
      //       //当访问vm身上的属性值的时候，会去返回data的同名属性值
      //         return vm._data["msg"];
      //     },
      //     set: function proxySetter(newVal) {
      //       //当设置vm身上的属性值的时候，会去设置data的同名属性值
      //         vm._data["msg"] = newVal;
      //     }
      // });
    }
};