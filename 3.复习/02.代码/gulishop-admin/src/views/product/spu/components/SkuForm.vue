<template>
  <el-form :model="skuForm" label-width="80px">
    <!-- SPU名称 -->
    <el-form-item label="SPU名称">
      <span>{{spuForm.spuName}}</span>
    </el-form-item>

    <!-- SKU名称 -->
    <el-form-item label="SKU名称">
      <el-input v-model="skuForm.skuName" placeholder="请输入SKU名称"></el-input>
    </el-form-item>

    <!-- 价格 -->
    <el-form-item label="价格(元)">
      <el-input v-model="skuForm.price" type="number" placeholder="请输入价格"></el-input>
    </el-form-item>

    <!-- 重量 -->
    <el-form-item label="重量(千克)">
      <el-input v-model="skuForm.weight" type="number" placeholder="请输入重量"></el-input>
    </el-form-item>

    <!-- 规格描述 -->
    <el-form-item label="规格描述">
      <el-input v-model="skuForm.skuDesc" type="textarea" rows="4" placeholder="请输入规格描述"></el-input>
    </el-form-item>

    <!-- 平台属性 -->
    <el-form-item label="平台属性">
      <el-form label-width="80px" :inline="true">
        <el-form-item :label="attr.attrName" v-for="attr in attrList" :key="attr.id">
          <el-select v-model="attr.attrIdValueId" placeholder="请选择">
            <el-option 
            v-for="attrValue in attr.attrValueList"
            :key="attrValue.id"
            :label="attrValue.valueName" 
            :value="`${attr.id}:${attrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>

    <!-- 销售属性 -->
    <el-form-item label="销售属性">
      <el-form label-width="80px" :inline="true">

        <el-form-item :label="spuSaleAttr.saleAttrName" v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.baseSaleAttrId">
          <el-select v-model="spuSaleAttr.attrIdValueId" placeholder="请选择">
            <el-option 
            v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
            :key="spuSaleAttrValue.id"
            :label="spuSaleAttrValue.saleAttrValueName" 
            :value="`${spuSaleAttr.baseSaleAttrId}:${spuSaleAttrValue.id}`"
            ></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </el-form-item>

    <el-form-item>
      <el-table @selection-change="selectImage" :data="spuImageList" style="width: 100%" border>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="图片">
          <template slot-scope="{row}">
            <img :src="row.imgUrl" style="width:100px;height:100px" alt="" srcset="">
          </template>
        </el-table-column>
        <el-table-column
          prop="imgName"
          label="名称">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" @click="changeDefault(row)" v-if="row.isDefault==='0'">设为默认值</el-button>
            <el-tag :disable-transitions="true" type="success" v-else>默认</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      skuForm: {
        //通过父组件传递下来,不需要我们收集
        spuId:"",
        tmId:"",
        category3Id: 0,

        //写静态样式通过v-model自动收集好了
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        
        // 需要手动收集
        skuAttrValueList:[],
        skuDefaultImg:"",
        skuImageList:[],
        skuSaleAttrValueList:[],

        
        // category3Id: 0,
        // createTime: "2021-07-10T00:35:19.960Z",
        // id: 0,
        // isSale: 0,
        // skuAttrValueList: [
        //   {
        //     attrId: 0,           需要
        //     attrName: "string",  不需要
        //     id: 0,               不需要
        //     skuId: 0,            不需要
        //     valueId: 0,          需要
        //     valueName: "string", 不需要
        //   },
        // ],
        // skuDefaultImg: "string",
        // skuImageList: [
        //   {
        //     id: 0,               需要
        //     imgName: "string",   需要
        //     imgUrl: "string",    需要
        //     isDefault: "string", 需要(如果不是默认图片,可以不传,默认图片为1,非默认为0)
        //     skuId: 0,            不需要
        //     spuImgId: 0,         需要
        //   },
        // ],
        // skuSaleAttrValueList: [
        //   {
        //     id: 0,                       不需要
        //     saleAttrId: 0,               需要
        //     saleAttrName: "string",      不需要
        //     saleAttrValueId: 0,          需要
        //     saleAttrValueName: "string", 不需要
        //     skuId: 0,                    不需要
        //     spuId: 0,                    不需要
        //   },
        // ],
        // spuId: 0,
        // tmId: 0,
      },
      spuForm:{},
      category1Id:"",
      category2Id:"",
      category3Id:"",
      attrList:[],
      spuSaleAttrList:[],
      spuImageList:[],
      selectedImageList:[]
    };
  },
  methods:{
    async initAddSkuForm(spu,category1Id,category2Id,category3Id){
      // 总结:需要的数据,三级分类id,spu的id
      // 1.根据当前的三级分类id,请求对应的平台属性列表(该api查找attr模块)
      // http://localhost:9529/dev-api/admin/product/attrInfoList/2/13/61

      // 2.根据当前的spuid,请求当前spu拥有的所有销售属性(该api在sku模块)
      // http://localhost:9529/dev-api/admin/product/spuSaleAttrList/3

      // 3.根据当前的spuid,请求当前spu拥有的所有图片列表(该api在sku模块)
      // http://localhost:9529/dev-api/admin/product/spuImageList/3

      this.spuForm = spu;
      this.category1Id = category1Id;
      this.category2Id = category2Id;
      this.category3Id = category3Id;

      const promise1 = this.$API.attr.getAttrList(category1Id,category2Id,category3Id);

      const promise2 = this.$API.sku.getSpuSaleAttrList(spu.id);

      const promise3 = this.$API.sku.getSpuImageList(spu.id);

      const result = await Promise.all([promise1,promise2,promise3]);

      this.attrList = result[0].data;
      this.spuSaleAttrList = result[1].data;
      const imgList = result[2].data;
      imgList.forEach((item,index)=>{
        // 此处不需要使用$set,因为当前这个对象在变成响应式对象之前,就已经添加了isDefault属性
        if(index===0){
          item.isDefault = "1"
        }else{
          item.isDefault = "0"
        }
      })
      this.spuImageList = imgList;
      // .then(()=>{
      //   // 更新三个数据
      // })
      // .catch(()=>{})
    },
    // 用于监视用户对图片列表的选择
    selectImage(value){
      // console.log('selectImage',value)
      this.selectedImageList = value;
    },
    // 用于设置默认图片
    changeDefault(row){
      this.spuImageList.forEach((item)=>{
        item.isDefault = "0"
      })
      row.isDefault="1";

      // 将当前选中的图片的url交给skuForm作为sku的默认图
      this.skuForm.skuDefaultImg = row.imgUrl;
    },
    // 用于监视用户点击保存操作
    async save(){
      //1.收集数据
      const {skuForm , spuForm , category3Id , attrList , spuSaleAttrList , selectedImageList} = this;

      //2.整理数据格式
      // 2.1父组件传下来的数据,进行传入
      skuForm.spuId = spuForm.id;
      skuForm.tmId = spuForm.tmId;
      skuForm.category3Id = category3Id;

      //2.2 平台属性收集(用户有进行选择的平台属性才进行收集)
      // reduce如果有第二个参数作为默认值,那么第一次循环的pre就是默认值
      // reduce如果没有第二个参数作为默认值,那么第一次循环的pre就是数组中的第一项,而item就是第二项
      skuForm.skuAttrValueList = attrList.reduce((pre,item)=>{
        // 如果该数据有值,就说明用户选择过该属性
        const attrIdValueId = item.attrIdValueId;
        if(attrIdValueId){
          const [attrId,valueId] = attrIdValueId.split(':');
          const obj = {
            attrId,
            valueId
          }
          pre.push(obj);
        }
        return pre;
      },[])

      //2.3 销售属性收集(用户有进行选择的销售属性才进行收集)
      skuForm.skuSaleAttrValueList = spuSaleAttrList.reduce((pre,item)=>{
        // 如果该数据有值,就说明用户选择过该属性
        const attrIdValueId = item.attrIdValueId;
        if(attrIdValueId){
          const [saleAttrId,saleAttrValueId] = attrIdValueId.split(':');
          const obj = {
            saleAttrId,
            saleAttrValueId
          }
          pre.push(obj);
        }
        return pre;
      },[])

      //2.4 图片列表收集(用户选中的图片才进行收集)
      skuForm.skuImageList = selectedImageList.map((item)=>{
        return {        
            imgName: item.imgName,   
            imgUrl: item.imgUrl,    
            isDefault: item.isDefault,
            spuImgId: item.id,  //此处注意,item中具有两个id,此处需要的是当前图片id,而不是spuId       
        }
      })

      try {
      //3.发送请求
      await this.$API.sku.addOrUpdate(skuForm);
      //4.成功做什么
      this.$message.success('添加SKU成功!!!');
      this.$emit('update:visible',false);
      // 此处不需要刷新spu的列表数据
      this.resetData();

      } catch (error) {
      //5.失败做什么
      this.$message.success('添加SKU失败!!!');
      }
    },
    resetData(){
      Object.assign(this.$data,this.$options.data());
    },
    cancel(){
      this.$emit('update:visible',false);
      this.resetData();
    }
  }
};
</script>

<style>
</style>