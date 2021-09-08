<template>
  <div :class="className" :style="{ height, width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons");
export default {
  name: "LineChart",
  data() {
    return {
      chart: null,
    };
  },
  props:{
    width:{
      type:String,
      default:"100%"
    },
    height:{
      type:String,
      default:"350px"
    },
    chartData:{
      type:Object,
      required:true
    },
    yTitle:{
      type:String,
      required:true
    }
  },
  mounted() {
    // 初始化只需要做一次,后续只需要使用之前的实例对象即可
    this.chart = echarts.init(this.$el,'macarons');
    this.setOption();
  },
  methods:{
    setOption({expectedData,actualData}){
      var option = {
        title: {
        },
        // 控制数据显示
        tooltip: {
           axisPointer:{
             type:"cross"
           },
           trigger:"axis"
        },
        // 控制内容显示开关
        legend: {
            data:['预期','实际']
        },
        grid:{
          left:40,
          right:40,
          top:40,
          bottom:40
        },
        // x轴配置
        xAxis: {
            data: ["周一","周二","周三","周四","周五","周六","周日"],
            boundaryGap:false
        },
        // y轴配置
        yAxis: {
          name:this.yTitle
        },
        // 
        series: [{
            name: '预期',
            type: 'line',
            smooth:true,
            data: expectedData?expectedData:[0,0,0,0,0,0,0],
            lineStyle:{
              color:"hotpink"
            },
            areaStyle:{
              color:"#ccc"
            }
        },
        {
            name: '实际',
            type: 'line',
            smooth:true,
            data: actualData?actualData:[0,0,0,0,0,0,0],
            lineStyle:{
              color:"skyblue"
            }
        }]
      };
      this.chart.setOption(option);
    }
  },
  watch:{
    chartData:{
      deep:true,
      handler(newVal){
        // console.log(newVal)
        this.setOption(newVal)
      }
    }
  }
};
</script>
