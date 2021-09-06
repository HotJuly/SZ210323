<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{name}}</h2>
    <input type="text" :value="data111" @input="handleInput"/>
    <!-- <h2>age:{{user.age | timeFilter}}</h2> -->
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    value:String,
    data111:String
  },
  // props:["msg"],
  a:2,
  data(){
    return{
      name:"xiaoming",
      user:{
        sex:"nan",
        age:18
      },
      _aabb:3
    }
  },
  inject:["msg1"],
  mounted(){
    // console.log('mounted',this.$options.a)
    // console.log(c)
    // console.log(this.$data.name)
    // console.log(this.$data._aabb)
    console.log('inject',this.msg1)


    // nextTick的实现原理是通过.then实现的
    // console.log(1)

    // this.name="xiaohong";
    // // 是不是具有一个看不见的nextTick

    // Promise.resolve().then(()=>{
    //   console.log('Promise1')
    // })

    // this.$nextTick(()=>{
    //   console.log('$nextTick1')
    // })

    // this.$nextTick(()=>{
    //   console.log('$nextTick2')
    // })

    // Promise.resolve().then(()=>{
    //   console.log('Promise2')
    // })

    // console.log(2)

    // delete this.user.age;
    // this.$delete(this.user,"age");
    // console.log(this.user)
  },
  methods:{
    handleInput(event){
      // console.log('handleInput')
      const value = event.target.value;
      // this.value=value;
      this.$emit('abc',value)
    }
  },
  model: {
    prop: 'data111',
    event: 'abc'
  },
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
