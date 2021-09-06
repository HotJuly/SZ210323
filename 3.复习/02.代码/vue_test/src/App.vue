<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <input type="text" v-model="msg"/> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"/> -->
    <h1>App-msg:{{msg}}</h1>
    <HelloWorld class="A" v-model="msg" msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name:"App",
  components: {
    HelloWorld
  },
  a:1,
  mounted(){
    // console.log('mounted',this.$options.a)
    console.log('App mounted')
  },
  // mixins: [mixin]
  provide:{
    msg1:"hello everybody"
  },
  data(){
    return{
      msg:"666"
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
