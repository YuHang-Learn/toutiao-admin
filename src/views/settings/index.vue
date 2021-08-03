<template>
  <div class="all-container">
    <el-card class="card">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="father">
        <el-form
          class="son1"
          :model="changeForm"
          label-width="80px"
          :rules="rules"
          ref="changeForm"
        >
          <el-form-item label="编号">
            {{ changeForm.id }}
          </el-form-item>
          <el-form-item label="手机">
            {{ changeForm.mobile }}
          </el-form-item>
          <el-form-item label="媒体名称" prop="name">
            <el-input v-model="changeForm.name" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="媒体介绍" prop="intro">
            <el-input type="textarea" v-model="changeForm.intro" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="changeForm.email" size="medium"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
              :loading="infoLoading"
            >保存</el-button>
          </el-form-item>
        </el-form>
        <div class="son2">
          <label for="photo">
            <el-avatar shape="square" :size="200" fit="fill" :src="changeForm.photo"></el-avatar>
            <p>点击更改头像</p>
          </label>
          <input
            id="photo"
            type="file"
            ref="file"
            hidden
            @change="changePhoto"
          >
        </div>
      </div>
    </el-card>
    <el-dialog
      title="头像预览"
      :visible.sync="dialogVisible"
      :modal="false"
      width="30%"
      append-to-body
      @opened="openedDialog"
    >
      <div class="preview-image-container">
        <img :src="previewImage" alt="" class="preview-image" ref="preview-image">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updatePhoto">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInfo, changeInfo, changePhoto } from 'api/settings'
import globalBus from 'utils/global_bus'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'Settings',
  data () {
    return {
      changeForm: {
        id: '',
        mobile: '',
        photo: '',
        name: '',
        intro: '',
        email: ''
      },
      infoLoading: false,
      dialogVisible: false,
      previewImage: '',
      cropper: null,
      rules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在5-20个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created () {
    this.getProfile()
  },
  methods: {
    onSubmit () {
      this.infoLoading = true
      this.$refs.changeForm.validate(valid => {
        if (!valid) {
          this.$message({
            message: '表单信息有误！',
            type: 'warning'
          })
        } else {
          changeInfo({
            name: this.changeForm.name,
            intro: this.changeForm.intro,
            email: this.changeForm.email
          }).then(res => {
            console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.infoLoading = false
            globalBus.$emit('info_update', this.changeForm)
          })
        }
      })
    },
    getProfile () {
      getInfo().then(res => {
        this.changeForm = res.data.data
      })
    },
    changePhoto () {
      const file = this.$refs.file
      const imgData = window.URL.createObjectURL(file.files[0])
      this.previewImage = imgData
      this.dialogVisible = true
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = ''
    },
    openedDialog () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img 必须是可见状态才能正常完成初始化
      //       因为我们这里要在对话框里面初始化裁切器
      //       所以务必要在对话框完全打开的状态去进行初始化。
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']

      // 第1次初始化好以后，如果预览裁切的图片发生了变化，裁切器默认不会更新
      // 如果需要预览图片发生变化更新裁切器：
      //    方式一：裁切器.replace 方法
      //    方式二：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false
      })
    },
    updatePhoto () {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        const fd = new FormData()
        fd.append('photo', blob)
        changePhoto(fd).then(res => {
          this.dialogVisible = false
          this.changeForm.photo = res.data.data.photo
          this.$message({
            message: '修改头像成功！',
            type: 'success'
          })
          globalBus.$emit('info_update', this.changeForm)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.all-container{
  .card {
    .bread {
      padding-bottom: 15px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
    }

    .father {
      display:flex;
      .son1 {
        flex: 8;
      }

      .son2 {
        flex: 5;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow:column;
        .photo {
          width: 30%;
        }
      }
    }
    .preview-image-container {
      .preview-image {
        display: block;

        /* This rule is very important, please don't ignore this */
        max-width: 200%;
        height: 200px;
      }
    }
    /* Ensure the size of the image fit the container perfectly */
  }
}
</style>
