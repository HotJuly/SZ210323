<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <input type="text" v-model="msg"/> -->
    <!-- <input type="text" :value="msg" @input="event=>msg=event.target.value"/> -->
    <h1>App-msg:{{msg}}</h1>
    <!-- <HelloWorld class="A" v-model="msg" msg="Welcome to Your Vue.js App"/> -->

    <!-- <HelloWorld class="A" :msg12.sync="msg" msg="Welcome to Your Vue.js App"/> -->
    <HelloWorld class="A" :msg12="msg" @update:msg12="value=>msg=value" msg="Welcome to Your Vue.js App">
      <template v-slot:default>
        <h1>我是默认插槽</h1>
      </template>
      <template v-slot:header>
        <h1>我是header插槽</h1>
      </template>
      <template v-slot:footer="{row}">
        <h1>我是{{row}}插槽</h1>
      </template>
    </HelloWorld>
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
    console.log('App mounted',this.$children)
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
