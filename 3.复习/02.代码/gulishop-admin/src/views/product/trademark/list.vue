<template>
  <div>
    <el-button
      style="margin-top: 20px"
      type="primary"
      icon="el-icon-plus"
      @click="showDialog"
      v-has-permission="`Trademark.add1`"
      >添加</el-button
    >
    <!-- 
      border->用于让整个table表格添加边框
      el-table组件用于生成整个表格
      el-table-column组件用于生成表格中的每一列
        label用于确认表头标题
        width用于指定当前列宽度,如果没有写,就会将剩余宽度与其他没写的column进行平分
        align用于将当前列中的内容居中
     -->
    <!-- 
       通过给el-table属性添加标签属性data,可以将需要遍历的数组交给el-table组件
       el-table会将当前data的数组交给每一个el-table-column组件,组件内部会自动进行v-for遍历
       给每个el-table-column组件添加prop标签属性,声明当前列需要展示遍历对象中的哪个属性结果
       注意:prop执行的内容,在elementUI中会默认作为文本显示
       如果想要自定义列显示内容,需要使用到作用域插槽,给column组件内部传入template结构

      -->
    <el-table :data="trademarkList" border style="width: 100%; margin: 20px 0">
      <el-table-column label="序号" type="index" width="80" align="center">
      </el-table-column>
      <el-table-column label="品牌名称" prop="tmName"> </el-table-column>
      <el-table-column label="品牌LOGO">
        <template slot-scope="{ row }">
          <img
            :src="row.logoUrl"
            style="width: 100px; height: 80px"
            alt=""
            srcset=""
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-edit"
            @click="showDialog(row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="deleteAttr(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      current-page->指定当前所在页数
      page-sizes->用来指定页面显示数量下拉框的选项
      page-size->指定当前页面显示条数
      layout->用来控制当前分页器组件内的组成结构和顺序
      total->用来指定当前总条数
      -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[2, 3, 10]"
      :page-size="limit"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    >
    </el-pagination>

    <!-- 
      标签属性:
      :visible.sync="dialogFormVisible"->用于控制当前dialog组件的显示隐藏
      :model="form" -> 将用来收集表单内部数据的对象交给form表单
      label-width="100px" ->用于控制表单的label的宽度(注意:必须带上px单位)

      组件用处:
        el-dialog->用于显示遮罩层,同时显示对话框
        el-form->主要功能,用于收集用户输入的表单数据
        el-form-item->每一个form-item代表form表单中的一行

      注意:尽量把tmForm的内部结构处理成接口所需要的结构
     -->
    <el-dialog
      :title="tmForm.id ? '修改品牌' : '添加品牌'"
      style="width: 80%"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tmForm" :rules="rules" ref="addForm">
        <el-form-item label="品牌名称" prop="tmName" label-width="100px">
          <el-input v-model="tmForm.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl" label-width="100px">
          <!-- 此处的action需要填写图片上传的网络路径,但是记得加上前缀/dev-api -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 3,
      total: 15,
      trademarkList: [],
      dialogFormVisible: false,
      tmForm: {
        tmName: "",
        logoUrl: "",
      },
      rules: {
        // 当前对象中的属性名,必须跟el-form-item组件中的prop对象
        // 属性值(Object[])就是给对应prop的item组件使用的校验规则
        // 数组中每一个对象,就是一条校验规则
        // trigger代表校验时机,在form表单校验中,一共有三个校验时机:
        // 1.失去焦点(blur事件) 2.内容改变(change) 3.主动校验(通过调用API来实现校验)
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 3 到 5 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择LOGO图片", trigger: "blur" },
        ],
      },
      imageUrl: "", //不管用不用,先复制过来
    };
  },
  mounted() {
    // this.getTradeMarkList  =>  Vue.prototype.getTradeMarkList找不到
    this.getTradeMarkList();
  },
  methods: {
    async getTradeMarkList(page) {
      const {
        data: { total, records },
      } = await this.$API.trademark.getTradeMarkList(
        page ? page : this.page,
        this.limit
      );
      //以上解构赋值相当于:const total = result.data.total;
      this.total = total;
      if (page) {
        this.page = page;
      }
      this.trademarkList = records;
    },
    handleCurrentChange(value) {
      // 通过当前事件,可以知道用户点击了哪个页数
      // console.log('handleCurrentChange',value)
      this.page = value;

      //发送请求,获取对应页面的数据
      this.getTradeMarkList();
    },
    handleSizeChange(value) {
      // 通过当前事件,可以知道用户点击了哪个条数选择器项
      // console.log('handleSizeChange',value)
      this.limit = value;

      //发送请求,获取对应页面的数据
      this.getTradeMarkList();
    },
    handleAvatarSuccess(res, file) {
      //由于用户通过input标签选中图片之后,该图片就存储于浏览器内存中
      //以下代码是将内存中的图片,生成本地链接地址,用来展示
      // this.imageUrl = URL.createObjectURL(file.raw);
      // console.log('handleAvatarSuccess',res, file)
      this.tmForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const types = ["image/jpeg", "image/jpg", "image/png"];
      // 用来判断图片的文件类型
      // const isJPG = file.type === 'image/jpeg';
      const isJPG = types.includes(file.type);
      // 用来判断图片的大小是否超过2MB
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    showDialog(row) {
      // 该函数添加属性和编辑属性都会调用
      // 编辑属性的时候会传入row(当前行的数据对象)
      // 通过id属性判断当前回调函数的触发来源(因为id属性只有经过了服务器的品牌对象才会拥有)
      if (row.id) {
        // 只有编辑品牌才能进入该区域
        // 此处是引用值传递
        // ...是浅拷贝,将当前row对象中的所有属性以及他们的值复制一份到tmForm中
        this.tmForm = {
          ...row,
        };
        // 注意:此方法不可行,因为你只是改变了row变量的内容,template中还是显示数组中的对象,tmForm也指向那个对象
        // this.tmForm = row;
        // row={};
      }
      console.log("row", row);
      this.dialogFormVisible = true;
    },
    save() {
      //首先:先校验数据的合法性,数据没问题在发送请求
      // console.log(this.$refs.addForm)
      this.$refs.addForm.validate(async (valid) => {
        // valid代表当前表单中所有的校验的最终结果
        // console.log(valid)
        if (valid) {
          // 1.收集请求所需要的数据
          //       已经整理在tmForm中,不需要二次收集

          try {
            //2.发送请求
            await this.$API.trademark.addOrUpdate(this.tmForm);

            //3.成功之后做什么
            // 3.1请求最新的品牌列表,由于添加功能,无法知道当前有几页,所以统一请求第一页
            this.getTradeMarkList();

            // 3.2弹窗提示用户保存成功
            this.$message({
              message: "保存成功!!!",
              type: "success",
            });

            // 3.3将添加品牌dialog隐藏
            this.dialogFormVisible = false;

            //3.4清空当前dialog的显示数据
            this.tmForm = {
              tmName: "",
              logoUrl: "",
            };
          } catch (error) {
            // 弹窗提示用户保存失败
            this.$message("保存失败!!!");
          }

          // 4.失败之后做什么
        } else {
          this.$message.info("保存失败!!!");
          return false;
        }
      });
    },
    cancel() {
      this.dialogFormVisible = false;
      this.tmForm = {
        tmName: "",
        logoUrl: "",
      };
    },
    // 监听用户点击删除操作
    deleteAttr(row) {
      this.$confirm(`此操作将永久删除${row.tmName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 如果用户点击确定按钮,会执行.then内部的代码
          try {
            //1.发送请求删除该品牌
            await this.$API.trademark.deleteTradeMark(row.id);

            //2.弹窗提示用户删除成功
            this.$message({
              type: "success",
              message: "删除成功!",
            });

            //3.请求最新列表,并展示
            //3.1如果当前页面删除了该数据,还有数据需要展示,就请求当前页面
            //3.2如果当前页面删除了该数据,就没有数据了,就请求上一页
            // console.log(1,this.page)
            this.getTradeMarkList(
              this.trademarkList.length > 1 ? this.page : this.page - 1
            );
          } catch (error) {
            // console.log(error)
            //2.弹窗提示用户删除失败
            this.$message({
              type: "info",
              message: "删除失败!",
            });
          }
        })
        .catch(() => {
          // 如果用户点击取消按钮,会执行.catch内部的代码
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>