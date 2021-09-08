<template>
  <div>
    <el-form :inline="true" :model="cForm" class="demo-form-inline" :disabled="!isShowList">
      <el-form-item label="一级分类">
        <el-select 
          v-model="cForm.category1Id"  
          placeholder="请选择"
          @change="c1Change"
        >
        <!-- label属性用于控制显示的文本内容,value属性用于控制保存的内容是什么 -->
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1List"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select 
          v-model="cForm.category2Id"  
          placeholder="请选择"
          @change="c2Change"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2List"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select 
          v-model="cForm.category3Id"  
          @change="c3Change"
          placeholder="请选择"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3List"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelector",
  data() {
    return {
      cForm: {
        category1Id:"",
        category2Id:"",
        category3Id:""
      },
      category1List: [],
      category2List: [],
      category3List: [],
    };
  },
  props:{
    isShowList:Boolean
  },
  mounted() {
    this.getCategory1();
  },
  methods: {
    async getCategory1() {
      const { data } = await this.$API.category.getCategory1();
      // console.log(result)
      this.category1List = data;
    },
    async getCategory2() {
      const { data } = await this.$API.category.getCategory2(this.cForm.category1Id);
      // console.log(result)
      this.category2List = data;
    },
    async getCategory3() {
      const { data } = await this.$API.category.getCategory3(this.cForm.category2Id);
      // console.log(result)
      this.category3List = data;
    },
    // 当用户选中一级分类时候触发
    c1Change(){
      this.getCategory2();
      this.cForm.category2Id = "";
      this.cForm.category3Id = "";
      this.category2List = [];
      this.category3List = [];
      this.$emit('changeCategory',{id:this.cForm.category1Id,level:1});
    },
    // 当用户选中二级分类时候触发
    c2Change(){
      this.getCategory3();
      this.cForm.category3Id = "";
      this.category3List = [];
      this.$emit('changeCategory',{id:this.cForm.category2Id,level:2});
    },
    // 当用户选中三级分类时候触发
    c3Change(){
      // 通知父组件发送请求,并且将当前的三级分类id发送给父组件
      this.$emit('changeCategory',{id:this.cForm.category3Id,level:3});
      // this.$emit('changeCategory',{
      //   category1Id:this.cForm.category1Id,
      //   category2Id:this.cForm.category2Id,
      //   category3Id:this.cForm.category3Id
      // });
    }
  },
};
</script>

<style>
</style>