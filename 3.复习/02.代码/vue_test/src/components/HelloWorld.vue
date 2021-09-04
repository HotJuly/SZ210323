<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  a:2,
  data(){
    return{
      name:"xiaoming"
    }
  },
  mounted(){
    // console.log('mounted',this.$options.a)
    // console.log(c)


    // nextTick的实现原理是通过.then实现的
    console.log(1)

    this.name="xiaohong";
    // 是不是具有一个看不见的nextTick

    Promise.resolve().then(()=>{
      console.log('Promise1')
    })

    this.$nextTick(()=>{
      console.log('$nextTick1')
    })

    this.$nextTick(()=>{
      console.log('$nextTick2')
    })

    Promise.resolve().then(()=>{
      console.log('Promise2')
    })

    console.log(2)
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
