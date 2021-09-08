<template>
  <!-- <el-tooltip
    class="item"
    effect="dark"
    :content="title"
    placement="top-start"
  > -->
  <!-- 
      $listeners会收集当前组件的所有自定义事件
        $attrs会收集当前组件没有通过props接收的标签属性
   -->
    <!-- <el-button v-on="$listeners" v-bind="$attrs"></el-button>
  </el-tooltip> -->

  <a href="javascript:;" :title="title">
    <el-button v-on="$listeners" v-bind="$attrs"></el-button>
  </a>
</template>

<script>
export default {
  name: "HintButton",
  props: ["title"],
};
</script>

<style>
</style>