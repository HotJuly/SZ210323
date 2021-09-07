<template>
  <div id="app">
    <router-view></router-view>
    <router-link to="/home">ToHome</router-link>
    <router-link to="/about" tag="h2">ToAbout</router-link>
    <button @click="toHome">toHome2</button>
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
    toHome(){
      this.$router.push('/home')
    }
  }
}
</script>

<style>
</style>
