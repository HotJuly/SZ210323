<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector
        @changeCategory="changeCategory"
        :isShowList="isShowList"
        ><!-- 插槽 --></CategorySelector
      >
    </el-card>
    <el-card>
      <div v-show="isShowList">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="showSpuForm"
          :disabled="!category3Id"
          >添加SPU</el-button
        >
        <el-table :data="spuList" style="width: 100%" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称"> </el-table-column>
          <el-table-column prop="description" label="SPU描述">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <HintButton
                type="success"
                size="mini"
                icon="el-icon-plus"
                title="添加SKU"
                @click="showSkuForm(row)"
              ></HintButton>
              <HintButton
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showSpuForm(row)"
                title="修改SPU"
              ></HintButton>
              <HintButton
                type="info"
                size="mini"
                icon="el-icon-info"
                title="查看SKU列表"
                @click="showSkuList(row)"
              ></HintButton>
              <el-popconfirm 
                :title="`你确定要删除${row.spuName}？`"
                @onConfirm="deleteASpu(row.id)"
              >
                <HintButton
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除SPU"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="text-align: center"
          :current-page="page"
          :page-sizes="[2, 5, 10]"
          :page-size="limit"
          layout="prev, pager, next, jumper,->,sizes,total"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- Vue中,响应式更新视图的最小单位是组件,最小的渲染单位是标签
            but:并不是说组件拆的越多越好,因为每个组件都会生成一个组件实例对象,很消耗性能
            标准:一般工作中以功能进行拆分,其次考虑性能(尽量避免一个组件状态和结构过多)
       -->
      <SpuForm
        ref="spuForm"
        @success="successSpuForm"
        @cancel="cancelSpuForm"
        :category3Id="category3Id"
        v-show="isShowSpuForm"
        :visible.sync="isShowSpuForm"
      ></SpuForm>
      
      <!-- <SpuForm
        ref="spuForm"
        @success="successSpuForm"
        :category3Id="category3Id"
        v-show="isShowSpuForm"

        :visible="isShowSpuForm"
        @update:visible = "(value)=>{ isShowSpuForm=value}"
      ></SpuForm> -->

      <SkuForm 
        ref="skuForm"
        v-show="isShowSkuForm"
        :visible.sync="isShowSkuForm"
      ></SkuForm>
    </el-card>

  <el-dialog :title="`${spu.spuName}=>SKU列表`" :visible.sync="dialogTableVisible">
    <el-table :data="skuList" border v-loading="!skuList.length">
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="重量(千克)" prop="weight"></el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px" srcset="">
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  </div>
</template>

<script>
import SpuForm from "./components/SpuForm.vue";
import SkuForm from "./components/SkuForm.vue";
export default {
  name: "SPU",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // isShowList: true,

      page: 1,
      limit: 5,
      total: 20,
      spuList: [],
      isShowSpuForm: false,
      isShowSkuForm: false,
      dialogTableVisible:false,
      spu:{},
      skuList:[]
    };
  },
  methods: {
    changeCategory({ id, level }) {
      // console.log(value)
      if (level === 1) {
        this.category1Id = id;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = id;
        this.category3Id = "";
      } else if (level === 3) {
        this.category3Id = id;
        // 发送请求
        this.getSpuList();
      }
    },

    async getSpuList(page) {
      // console.log('发送请求中');
      const {
        data: { total, records },
      } = await this.$API.spu.getSpuList(
        page?page:this.page,
        this.limit,
        this.category3Id
      );
      // console.log(result)
      this.total = total;
      this.spuList = records;
      if(page){
        this.page=page;
      }
    },

    // 以下两个函数与分页器有关
    handleSizeChange(value) {
      // value为当前修改之后的条数
      this.limit = value;
      this.getSpuList();
    },
    handleCurrentChange(value) {
      // value为当前修改之后的页数
      this.page = value;
      this.getSpuList();
    },
    // 用于显示SpuForm模块
    showSpuForm(row) {
      this.isShowSpuForm = true;
      // 之后会显示出该组件
      //  间接请求数据(命令spuForm组件请求数据)
      // console.log(this.$refs.spuForm.spuForm)
      if (row.id) {
        // 添加标识来区分是修改SPU还是添加SPU
        this.flag=true;
        this.$refs.spuForm.initUpdateSpuForm(row);
      } else {
        this.$refs.spuForm.initAddSpuForm();
      }
    },
    // 用于显示SkuForm模块
    showSkuForm(row) {
      this.isShowSkuForm = true;

      const {category1Id,category2Id,category3Id} = this;
      this.$refs.skuForm.initAddSkuForm(row,category1Id,category2Id,category3Id);
    },
    // 用于观察spuform组件是否保存成功
    successSpuForm() {
      // 如果用户是添加SPU,就应该请求第一页
      // 如果用户是修改SPU,就应该请求当前页
      if(this.flag){
        this.getSpuList();
      }else{
        this.getSpuList(1);
      }
      this.flag=null;
    },
    cancelSpuForm(){
      this.flag=null;
    },
    // 用于监视用户点击列表的删除SPU才做
    async deleteASpu(id){
      try {
        await this.$API.spu.deleteSpu(id);
        this.$message.success('删除成功');
        this.getSpuList();
      } catch (error) {
        this.$message.success('删除失败');
      }
    },
    // 用于监听用户点击查看SKU列表操作,展示dialog
    async showSkuList(row){
      this.dialogTableVisible = true;
      this.spu = row;
      const {data} = await this.$API.sku.getSkuList(row.id);
      // console.log(result)
      this.skuList = data;
    }
  },
  computed: {
    isShowList() {
      // 计算属性性能优于watch
      // 只要该计算属性,依赖的数据没有发生变化,该计算属性的结果不会重新计算(计算属性会缓存上一次的结果直接使用)
      // 依赖的数据(此处说的数据,必须是响应式数据)发生变化,计算属性就会重新计算(不一定)
      const { isShowSpuForm, isShowSkuForm } = this;
      return !isShowSpuForm && !isShowSkuForm;
    },
  },
  components: {
    SpuForm,
    SkuForm,
  },
};
</script>

<style>
</style>