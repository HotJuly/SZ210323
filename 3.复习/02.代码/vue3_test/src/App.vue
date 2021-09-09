<template>
  <div id="app">
    <ul>
      <li v-for="item in arr" :key="item">
        {{item}}
      </li>
    </ul>
    <button @click="handleClick">+1</button>
  </div>
</template>

<script>

export default {
  name:"App",
  data(){
    return{
      arr:[1,2,3,4,5]
    }
  },
  methods:{
    handleClick(){
      // this.arr[2] = 4
      // this.arr.splice(2,1,4)
      //虽然Vue2取消了对数组下标的数据劫持,但是他提供了一些操作数组的方法,重写了Array身上的同名方法
      // push,replace,splice
      this.arr[5]=6
      // $set
    }
  }
}
</script>

<style>
</style>
