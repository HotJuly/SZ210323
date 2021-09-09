import Vue from 'vue';
export default {
    name:"RouterLink",
    functional:true,
    props:{
        tag:{
            default:"a",
            type:String
        },
        to:{
            required:true,
            type:String
        }
    },
    render:(_,{parent,children,data,props})=>{
        //获取创建虚拟DOM的函数
        const createElement = parent.$createElement;

        /* 
            1.生成a标签
            2.阻止a标签的默认行为,防止页面跳转
            3.根据to属性实现路由切换
            4.将当前组件的children渲染出来
        */

        data.on={
            click(event){
                event.preventDefault();
                Vue.prototype.$router.push(props.to);
            }
        }

        data.attrs.href=props.to;

        return createElement(props.tag,data,children);
    }
}