<template>
  <div>
    <el-form :model="spuForm" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input
          v-model="spuForm.spuName"
          placeholder="请输入SPU名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="spuForm.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <!--  type="textarea" rows="4"  -->
        <el-input
          v-model="spuForm.description"
          placeholder="请输入SPU名称"
          type="textarea"
          rows="4"
        ></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          v-model="spuSaleAttrStr"
          :placeholder="
            unUseSaleAttrList.length
              ? `还有${unUseSaleAttrList.length}个未选中`
              : '没有了'
          "
        >
          <el-option
            v-for="unUseASaleAttr in unUseSaleAttrList"
            :key="unUseASaleAttr.id"
            :label="unUseASaleAttr.name"
            :value="`${unUseASaleAttr.name}:${unUseASaleAttr.id}`"
          >
          </el-option>
        </el-select>

        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addSaleAttr"
          :disabled="!spuSaleAttrStr"
          >添加销售属性</el-button
        >

        <el-table
          :data="spuForm.spuSaleAttrList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="150">
          </el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="(saleAttrValue,index) in row.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                closable
                :disable-transitions="false"
                @close="deleteAttrValue(row,index)"
              >
                {{ saleAttrValue.saleAttrValueName }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              >
              </el-input>
              <!-- 
                @click="showInput" -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="toEdit(row)"
                >+ 添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`你确定要删除${row.saleAttrName}吗？`"
                @onConfirm="deleteAttr($index)"
              >
                <!-- <HintButton @click.prevent="deleteAttr($index)" type="danger" size="mini" icon="el-icon-delete" title="删除"></HintButton> -->
                <HintButton
                  slot="reference"
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  title="删除"
                ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      // 这里初始化的spuForm只是为了给添加spu使用的,如果是修改Spu,这里的数据没用
      spuForm: {
        category3Id: 0, //代表当前spu属于哪个分类,新增和修改都需要
        description: "", //spu的描述文本
        spuName: "", //spu的名称
        tmId: "", //该属性代表spu的品牌ID,新增和修改都需要
        // id: 0,                 //该属性代表的是spu的id,新增不需要,修改需要
        spuImageList: [
          //该属性对应图片列表功能,新增和修改都需要
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          //该属性对应spu的销售属性列表,新增和修改都需要
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      dialogImageUrl: "",
      dialogVisible: false,
      spuSaleAttrStr: "",
      spuImageList: [],
      spuSaleAttrList: [],
      trademarkList: [],
      inputVisible: false,
      inputValue: "",
    };
  },
  props: ["visible", "category3Id"],
  methods: {
    // 以下两个方法用于实现照片墙功能
    handleRemove(file, fileList) {
      // 第一个参数是即将被删除的图片对象
      // 第二个参数是剩余展示的图片组成的数组
      // console.log(file, fileList);

      // 注意:别去修改所有图片的数组,只需要将最新的剩余数组保存如spuForm的spuImageList中即可
      this.spuForm.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      // file是当前的图片文件,本地的文件对象
      console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 如果是新增SPU会执行该函数,请求相关数据
    initAddSpuForm() {
      // 一共需要使用2个接口
      // ​     1.获取所有的销售属性信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/baseSaleAttrList
      // ​     2.获取所有的品牌信息(在**trademark**的api模块中声明)
      // ​     GET /admin/product/baseTrademark/getTrademarkList
      
      this.getBaseSaleAttrList();
      this.getTradeMarks();
    },
    // 如果是修改SPU会执行该函数,请求相关数据
    initUpdateSpuForm(row) {
      // 一共需要使用4个接口
      //1.获取SPU详细信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/getSpuById/{spuId}
      // ​     2.获取SPU所有图片的列表信息(在**sku**的api模块中声明)
      // ​     GET /admin/product/spuImageList/{spuId}
      // ​     3.获取所有的销售属性信息(在**spu**的api模块中声明)
      // ​     GET /admin/product/baseSaleAttrList
      // ​     4.获取所有的品牌信息(在**trademark**的api模块中声明)
      // ​     GET /admin/product/baseTrademark/getTrademarkList
      // console.log('initUpdateSpuForm')

      // async和await的作用范围非常的小,只能影响到当前函数内部
      this.getSpuInfo(row.id);
      this.getSpuImageList(row.id);
      this.getBaseSaleAttrList();
      this.getTradeMarks();
    },

    async getSpuImageList(id) {
      const { data } = await this.$API.sku.getSpuImageList(id);
      // console.log(result)
      // 现在的图片对象结构
      // {
      //   id: 12;
      //   imgName: "7155bba4c363065f.jpg";
      //   imgUrl: "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg";
      //   spuId: 3;
      //   status: "success";
      //   uid: 1625811494042;
      // }

      // 照片墙需要的结构
      // {
      //   id: 12;
      //   imgName: "7155bba4c363065f.jpg";
      //   imgUrl: "http://47.93.148.192:8080/group1/M00/00/02/rBHu8l-rgfWAVRWzAABUiOmA0ic932.jpg";
      //   spuId: 3;
      //   status: "success";
      //   uid: 1625811494042;
      //
      //   name:"xxxx.jpg",
      //   url:"xxxxx"
      // }
      data.forEach((imgObj) => {
        imgObj.name = imgObj.imgName;
        imgObj.url = imgObj.imgUrl;
      });
      this.spuImageList = data;
    },

    async getBaseSaleAttrList() {
      const result = await this.$API.spu.getBaseSaleAttrList();
      // console.log(result)
      this.spuSaleAttrList = result.data;
    },

    async getTradeMarks() {
      const result = await this.$API.trademark.getTradeMarks();
      console.log(result);
      this.trademarkList = result.data;
    },

    async getSpuInfo(id) {
      const result = await this.$API.spu.getSpuInfo(id);
      // console.log(result)
      this.spuForm = result.data;
    },

    // 用于监视图片上传是否成功,成功会执行该回调函数
    handleSuccess(response, file, fileList) {
      // response是当前上传接口返回的相应数据
      //file是当前图片对应的本地文件对象
      //fileList是当前照片墙展示的数组
      // console.log(response, file, fileList)
      this.spuForm.spuImageList = fileList;
    },
    // 用于添加销售属性
    addSaleAttr() {
      // 收集数据
      const { spuSaleAttrStr } = this;
      const [saleAttrName, baseSaleAttrId] = spuSaleAttrStr.split(":");

      //整理数据结构
      // 我们手头只有ID,没有属性的属性名
      // {
      //   baseSaleAttrId: 0,
      //   saleAttrName: "",
      //   spuSaleAttrValueList: [
      //   ],
      // },
      this.spuForm.spuSaleAttrList.push({
        saleAttrName,
        baseSaleAttrId,
        spuSaleAttrValueList: [],
      });

      // 记得清空spuSaleAttrStr的数据,防止显示错误
      this.spuSaleAttrStr = "";
    },
    // 监视用户点击添加属性值按钮,自动进入编辑模式
    toEdit(row) {
      // row.inputVisible = true;
      this.$set(row, "inputVisible", true);

      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 监视输入框失去焦点,自动进入展示模式
    handleInputConfirm(row) {
      const { inputValue } = row;

      // 属性值如果为空,提示用户
      if (!inputValue.trim()) {
        this.$message.info("属性值不能为空,请注意!");
        return;
      }

      //属性值如果重复,也提示用户
      const isRepeat = row.spuSaleAttrValueList.some((item) => {
        return item.saleAttrValueName === inputValue;
      });

      if (isRepeat) {
        this.$message.info("属性值已存在,添加失败!");
        return;
      }

      //能够进入到这里,说明已经经过了toEdit,该属性已经是响应式的,不需要再次添加
      row.inputVisible = false;
      // inputVisible = false;注意:不能这么做

      // 将属性值对象推入对应的属性值列表中,用于动态渲染
      const obj = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.inputValue,
      };

      row.spuSaleAttrValueList.push(obj);

      // 清空row.inputValue数值,防止旧数据残留
      row.inputValue = "";
    },
    // 监视用户点击删除属性值按钮
    deleteAttr($index) {
      this.spuForm.spuSaleAttrList.splice($index, 1);
    },
    // 用于监视用户点击取消按钮操作
    cancel() {
      // 通知父组件隐藏当前的spuForm组件
      this.$emit("update:visible", false);
      this.resetData();
      this.$emit('cancel');
    },
    // 用于重置当前组件状态
    resetData() {
      Object.assign(this.$data, this.$options.data());
    },
    // 用于监视用户点击保存按钮操作
    async save() {
      // {
      //   category3Id: 0, //代表当前spu属于哪个分类,新增和修改都需要
      //   description: "", //spu的描述文本
      //   spuName: "", //spu的名称
      //   tmId: "", //该属性代表spu的品牌ID,新增和修改都需要
      //   // id: 0,                 //该属性代表的是spu的id,新增不需要,修改需要
      //   spuImageList: [
      //     //该属性对应图片列表功能,新增和修改都需要
      //     // {
      //     //   id: 0,
      //     //   imgName: "string",
      //     //   imgUrl: "string",
      //     //   spuId: 0,
      //     // },
      //   ],
      //   spuSaleAttrList: [
      //     //该属性对应spu的销售属性列表,新增和修改都需要
      //     // {
      //     //   baseSaleAttrId: 0,
      //     //   saleAttrName: "string",
      //     //   spuSaleAttrValueList: [
      //     //     {
      //     //       baseSaleAttrId: 0,
      //     //       saleAttrValueName: "string",
      //     //     },
      //     //   ],
      //     // },
      //   ],
      // },
      //1.收集数据
      // 收集三级分类id,还有spuForm,以及之前请求的当前SPU所有图片列表(防止用户没有修改过列表数据)
      const { category3Id, spuForm, spuImageList } = this;

      //2.整理数据
      //2.1 三级分类id
      spuForm.category3Id = category3Id;

      //2.2 图片列表数据处理
      // 图片墙功能,如果用户没有上传或者删除图片操作,那么spuForm.spuImageList是null
      // 如果在上传和删除操作的时候,也把数组放入this.spuImageList属性中,此处可以不进行判断
      spuForm.spuImageList = spuForm.spuImageList || spuImageList;

      // 请求回来的图片对象
      // {
      //   id: 1;
      //   imgName: "2ff0882c9607e57c.jpg";
      //   imgUrl: "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAIpgZAAIvrX6L9fo612.jpg";
      //   name: "2ff0882c9607e57c.jpg";
      //   spuId: 1;
      //   status: "success";
      //   uid: 1625885180103;
      //   url: "http://47.93.148.192:8080/group1/M00/00/01/rBHu8l-rfvmAIpgZAAIvrX6L9fo612.jpg";
      // }

      //上传成功的图片对象
      // {
      //   name: "钉钉的啊.png";
      //   percentage: 100;
      //   raw: File;
      //   response: Object;
      //   size: 124779;
      //   status: "success";
      //   uid: 1625885239094;
      //   url: "blob:http://localhost:9528/2a8535d9-34de-47a4-a0ae-b70b6e8df5b7";
      // }

      // 发送请求需要的图片对象结构
      // {
      //       imgName: "string",
      //       imgUrl: "string",
      // }

      spuForm.spuImageList = spuForm.spuImageList.map((imageObj)=>{
        if(imageObj.imgUrl){
          // 用户之前上传好的图片
          delete imageObj.name;
          delete imageObj.url;
          return imageObj;
        }else{
          return{
            imgName: imageObj.name,
            imgUrl: imageObj.response.data,
          }
        }
      })

      //2.3删除属性对象身上的多余属性(inputVisible和inputValue)
      spuForm.spuSaleAttrList.forEach((item)=>{
        delete item.inputVisible;
        delete item.inputValue;
      })

      try {
      //3.发送请求
        await this.$API.spu.addOrUpdate(spuForm);
      //4.成功做什么
        this.$message.success('保存成功!');
        // 隐藏当前SPUform组件
        this.$emit("update:visible",false);
        // 重置当前组件状态
        this.resetData();
        // 通知父组件,保存成功,可以请求最新列表了
        this.$emit('success')
      } catch (error) {
      //5.失败做什么
      }
    },
    deleteAttrValue(row,$index){
      row.spuSaleAttrValueList.splice($index,1);
    }
  },
  computed: {
    unUseSaleAttrList() {
      // 获取总销售属性列表
      const { spuSaleAttrList: baseSaleAttrList, spuForm } = this;
      // 当前spu拥有的所有销售属性
      const { spuSaleAttrList } = spuForm;

      // 去重,保留两个数组中不重复的部分
      // map(长度与基础数组一样) filter reduce
      // 注意:spuForm.spuSaleAttrList中的对象的id是在baseSaleAttrId属性中
      // baseSaleAttrList数组中对象的id,是存储与id属性
      // 一个数组长度80,一个数组长度100,最终将要遍历80*100=8000
      // const unUseList = baseSaleAttrList.filter((item)=>{
      //   return !(spuSaleAttrList.some((spuSaleAttr)=>{
      //     // console.log(spuSaleAttr.id,item.baseSaleAttrId)
      //     return spuSaleAttr.baseSaleAttrId === item.id;
      //   }))
      // });

      //去重思路:
      // 1.双层for循环
      // 2.对象+数组
      // 注意:
      // 总销售属性中,属性的唯一标识存在id属性中
      // 当前spu拥有的销售属性的唯一标识,存在baseSaleAttrId属性中

      // 通过对象记录是否出现过某些属性的id
      const saleAttrObj = {};

      // 遍历较短的数组,将当前数组中出现的所有的销售属性的id存放到对象中,属性值为true
      spuSaleAttrList.forEach((item) => {
        // obj[1]=true
        saleAttrObj[item.baseSaleAttrId] = true;
      });

      // 遍历较长的数组,通过当前的属性id,去对象中读取数据,查看是否出现过
      const unUseList = baseSaleAttrList.filter((item) => {
        return !saleAttrObj[item.id];
      });

      return unUseList;
    },
  },
  // mounted(){
  //   this.initUpdateSpuForm()
  // }
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>