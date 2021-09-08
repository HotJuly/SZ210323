<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelector @changeCategory="changeCategory" :isShowList="isShowList"></CategorySelector>
    </el-card>
    <el-card>
      <!-- 第一个div用于显示属性列表,第二个div用于显示添加/修改属性模块 -->
      <!-- 
        v-if和v-show的区别
        v-if如果条件为false,它将不会解析内部的代码,也就是说从js层面干掉内部节点
        v-show如果条件为false,它将会解析内部的代码,将从css层面干掉内部节点(display:none)
        v-show至始至终只解析一次结构,v-if需要显示几次,就需要解析几次
        template无法与v-show同时使用
        性能对比:
            v-if的首次渲染性能优于v-show
            v-show频繁切换的性能优于v-if
       -->
      <div v-show="isShowList">
        <el-button type="primary" icon="el-icon-plus" @click="showAttrForm"
          >添加属性</el-button
        >
        <el-table :data="attrList" style="width: 100%; margin-top: 20px" border>
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row }">
              <el-tag
                style="margin-right: 10px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
                >{{ attrValue.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="{ row }">
              <HintButton
                size="mini"
                type="primary"
                icon="el-icon-edit"
                title="编辑"
                @click="showAttrForm(row)"
              ></HintButton>

              <el-popconfirm 
              :title="`你确定要删除${row.attrName}吗?`" 
                    @onConfirm="deleteAttr(row.id)"
                    >
                  <HintButton
                    slot="reference"
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    title="删除"
                  ></HintButton>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowList">
        <el-form style="width: 30%" :model="attrForm" label-width="60px">
          <el-form-item label="属性名">
            <el-input
              v-model="attrForm.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrForm.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="cancel">取消</el-button>

        <el-table
          style="width: 100%; margin: 20px 0"
          :data="attrForm.attrValueList"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称">
            <template slot-scope="{ row }">
              <el-input
                v-if="row.isEdit"
                ref="editInput"
                v-model="row.valueName"
                placeholder="请输入属性值"
                @blur="toLook(row)"
              ></el-input>
              <div @click="toEdit(row)" v-else>{{ row.valueName }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row, $index }">
              <el-popconfirm
                :title="`你确定要删除${row.valueName}？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <HintButton
                  slot="reference"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  title="删除"
                ></HintButton>
                <!-- <el-button slot="reference">删除</el-button> -->
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" @click="save">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
// 该方法可以生成一个全新的attrForm对象
const resetAttrForm = () => ({
  attrName: "",
  attrValueList: [
    // {
    //   attrId: 0, 这是属性的唯一表示,如果是添加肯定没有,修改肯定有
    //   id: 0, 这是属性值的唯一标识,如果是添加肯定没有,修改可能有
    //   valueName: "string",
    // },
  ],
  categoryId: 0, //声明当前属性属于哪个分类id
  categoryLevel: 3, //声明categoryId是几级分类的
  // id: 0, 新增属性不可能有id,只有修改的时候才会有
});
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [],
      isShowList: true,
      attrForm: resetAttrForm(),
    };
  },
  methods: {
    changeCategory({ id, level }) {
      // console.log('changeCategory',id)
      if (level === 1) {
        this.category1Id = id;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = id;
        this.category3Id = "";
      } else if (level === 3) {
        this.category3Id = id;
        //发送请求
        this.getAttrList();
      }
    },
    async getAttrList() {
      const { category1Id, category2Id, category3Id } = this;
      const { data } = await this.$API.attr.getAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      // console.log(result)
      this.attrList = data;
    },
    test() {
      console.log(111);
    },
    // 用于监视用户点击添加属性值按钮
    addAttrValue() {
      // 通过给attrValueList插入一个对象,可以让table表格多显示一行,实现添加属性值功能
      // 给每个新增的属性值对象添加一个标识isEdit,用于控制编辑模式/展示模式的切换
      this.attrForm.attrValueList.push({
        attrId: this.attrForm.id, //其实在添加功能中不需要这行,这行代码是为了兼容修改功能
        valueName: "",
        isEdit: true,
      });
    },
    // 用于监视用户点击添加或者修改按钮时候触发
    showAttrForm(row) {
      this.isShowList = false;
      // 如果当前是通过点击编辑按钮进入添加属性界面,需要将当前属性对象row赋值给attrForm
      if (row.id) {
        // 此处由于row内部结构过于复杂,不能使用...对其进行浅拷贝,否则会出现问题
        // 需要对row对象进行深拷贝处理
        // this.attrForm={...row};
        this.attrForm = cloneDeep(row);

        // 由于新增了编辑/展示模式切换功能,所以attrForm.attrValueList中的所有对象,必须具有isEdit属性
        this.attrForm.attrValueList.forEach((item) => {
          // 如果修改数据中的一个属性值,页面会重新渲染,说明该属性是响应式属性
          // 首先,如果后续新增的属性就不是响应式属性
          // 响应式属性产生的时间点:
          // 1.数据劫持(数据劫持就是在创建响应式属性)
          // 2.属性值更新的时候(由于更新响应式属性会触发set方法,内部会对新的属性值进行深度数据劫持)
          // item.isEdit = false;错误写法
          // 通过vm.$set或者Vue.set都可以新增响应式属性
          this.$set(item, "isEdit", false);
        });
      }
    },
    // 用于监视用户点击添加属性模块中的取消按钮
    cancel() {
      this.isShowList = true;
    },
    // 用于将属性值名称切换为展示模式
    toLook(row) {
      // 如果用户没有输入数据,不允许进入展示模式
      // 如果用户输入的数据已经存在(返回值应该是布尔值类型),不允许进入展示模式
      const valueName = row.valueName;
      const isRepeat = this.attrForm.attrValueList.some((item) => {
        // 由于添加属性值功能是直接往内部添加新对象,所以很可能出现匹配到自己的情况
        if (item !== row) {
          return item.valueName === valueName;
        }
        // return false;
      });

      if (isRepeat) {
        this.$message.info("属性值名称已存在,请重新输入!!!");
        return;
      }

      if (valueName) {
        row.isEdit = false;
        return;
      }
      // this.$message({
      //   type:"info",
      //   message:"属性值名称不能为空!!!"
      // })
      this.$message.info("属性值名称不能为空!!!");
    },
    // 用于将属性值名称切换为编辑模式
    toEdit(row) {
      row.isEdit = true;
      // Promise.then(更新视图,显示input)
      // console.log(row.isEdit)
      // 进入编辑模式之后,立马让input框自动获取焦点,
      // 防止用户点击两次,同时可以防止input失去焦点事件失效
      // 如果实现了自动获取焦点功能,那么页面上永远最多只会存在一个input标签

      // 注意:
      // 数据更新:同步更新状态数据
      // 视图更新:Vue 在更新 DOM 时是异步执行的
      // 通过$nextTick的回调函数,一定可以得到当前的最新DOM
      // $nextTick的回调函数会在.then中执行
      this.$nextTick(() => {
        this.$refs.editInput.focus();
      });
    },
    deleteAttrValue($index) {
      // console.log('deleteAttrValue');
      this.attrForm.attrValueList.splice($index, 1);
    },
    // 用于监视用户点击添加属性模块中的保存按钮
    async save() {
      //1.收集数据
      // 获取到三级分类id,以及attrForm
      const { category3Id, attrForm } = this;

      //2.整理数据结构(满足结构需要)
      // {
      //   "attrName": "string",新增要
      //   "attrValueList": [   新增要
      //     {
      //       "attrId": 0,
      //       "id": 0,
      //       "valueName": "string"新增要
      //     }
      //   ],
      //   "categoryId": 0,     新增要
      //   "categoryLevel": 0,     新增要
      //   "id": 0
      // }
      //2.1 将三级分类id存入attrForm中
      attrForm.categoryId = category3Id;

      //2.2 如果没有属性名称,也不发送请求
      if (!attrForm.attrName) {
        this.$message.info("属性名称不能为空,保存失败!!!");
        return;
      }

      //2.3 如果没有属性值,也不发送请求
      if (attrForm.attrValueList.length === 0) {
        this.$message.info("至少需要一个属性值,保存失败!!!");
        return;
      }

      //2.4 清除属性值对象身上的多余属性isEdit
      attrForm.attrValueList.forEach((item) => {
        delete item.isEdit;
      });

      try {
        //3.发送请求
        await this.$API.attr.addOrUpdate(attrForm);
        //4.成功做什么

        //4.1 返回列表页
        this.isShowList = true;
        this.$message.success("保存成功!!!");

        //4.2 请求最新的列表页并展示
        this.getAttrList();

        //4.3 清空添加属性模块的数据,防止再次进入的时候,数据残留
        // this.attrForm = resetAttrForm();
      } catch (error) {
        //5.失败做什么
        this.$message.info("保存失败!!!");
      }
    },
    // 用于监视用户点击属性列表中的删除按钮
    async deleteAttr(id){
      try {
        await this.$API.attr.deleteAttr(id);
        this.$message.success('删除成功!!!');
        this.getAttrList();
      } catch (error) {
        this.$message.success('删除失败!!!');
      }
    }
  },
  watch:{
    isShowList(newValue){
      if(newValue){
        this.attrForm = resetAttrForm();
      }
    }
  }
};
</script>

<style>
</style>