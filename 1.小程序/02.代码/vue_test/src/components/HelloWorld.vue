<template>
  <div class="hello">
    <h1 @click="handleClick">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      msg:"我是初始化的数据"
    }
  },
  methods:{
    handleClick(){
      this.msg="我是修改之后的数据";
      console.log('msg',this.msg)
      debugger
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
