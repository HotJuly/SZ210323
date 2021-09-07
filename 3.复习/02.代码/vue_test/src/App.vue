<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/home">ToHome</router-link>
    <router-link to="/about">ToAbout</router-link>
  </div>
</template>

<script>

export default {
  name:"App",
  data(){
    return{
    }
  },
  methods:{
  }
}
</script>

<style>
</style>
