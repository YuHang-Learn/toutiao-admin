<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      ref="publish"
      :model="publishForm"
      :rules="rules"
      label-width="60px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="publishForm.title" style="width:300px;"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content" class="content">
        <editor
          @updateContent="updateContent"
          v-model="publishForm.content"
          class="editor-box"
        ></editor>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="publishForm.cover.type">
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <template
          v-if="publishForm.cover.type > 0"
        >
          <cover-upload
            ref="coverUpload"
            v-for="(item,index) in publishForm.cover.type"
            :key="item"
            @click.native="coverUpload(index)"
          >
          </cover-upload>
        </template>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="publishForm.channel_id" placeholder="请选择频道">
          <el-option
            :label="channel.name"
            :value="channel.id"
            v-for="(channel, index) in channels"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onPublish(false)"
        >发表</el-button>
        <el-button @click="onPublish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <img-list
            ref="imgList"
            :isShowBread="false"
            :isShowOperation="false"
            :isShowUpload="false"
            :isCanSelected="true"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second" class="img-upload">
          <el-upload
          class="upload-demo drag"
          drag
          action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
          multiple
          name="image"
          :headers="headers"
          :on-success="upLoadSuccess"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmUpload">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getArticleChannel, createArticle, updateArticle, getArticle } from 'api/article'
import Editor from 'components/Editor/Editor.vue'
import CoverUpload from 'views/publish/components/coverUpLoad'
import imgList from 'components/img/imgList'
export default {
  name: 'Publish',
  components: {
    Editor,
    CoverUpload,
    imgList
  },
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      headers: {
        Authorization: `Bearer ${user.token}`
      },
      dialogVisible: false,
      activeName: 'first',
      channels: [],
      index: 0,
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5-30个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择所属频道', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    // 获取频道列表
    loadChannels () {
      getArticleChannel().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 获取文章
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.publishForm = res.data.data
        this.$nextTick(() => {
          for (let i = 0; i < this.publishForm.cover.type; i++) {
            this.$refs.coverUpload[i].$el.lastChild.src = this.publishForm.cover.images[i]
          }
        })
      })
    },
    // 发表或修改
    onPublish (draft) {
      this.$refs.publish.validate(valid => {
        if (!valid) {
          return -1
        }
      })
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.publishForm, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '修改'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        createArticle(this.publishForm, draft).then(res => {
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    updateContent (data) {
      this.publishForm.content = data
    },
    coverUpload (index) {
      this.index = index
      this.dialogVisible = true
    },
    upLoadSuccess (res, file, fileList) {
      this.publishForm.cover.images[this.index] = res.data.url
    },
    confirmUpload () {
      // console.log(this.index)
      if (this.activeName === 'second') {
        this.$refs.coverUpload[this.index].$el.lastChild.src = this.publishForm.cover.images[this.index]
      } else {
        const imgUrl = this.$refs.imgList.images[this.$refs.imgList.isSelectedIndex].url
        this.$refs.coverUpload[this.index].$el.lastChild.src = imgUrl
        this.publishForm.cover.images[this.index] = imgUrl
      }
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="less">
.bread {
  height: 30px;
  margin-bottom: 10px;
  border-bottom: solid 1px #eee;
}
.content {
  height: 500px;
  .editor-box {
    height: 450px;
  }
}
.img-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  .drag {
    margin-top:30px;
  }
}

// ql-editor 与 element-ui css 冲突解决样式
//.ql-editor-class {
//  -webkit-box-sizing: border-box;
//  box-sizing: border-box;
//  line-height: 1.42;
//  height: 100%;
//  outline: none;
//  padding: 0 !important;
//  tab-size: 4;
//  -moz-tab-size: 4;
//  text-align: left;
//  word-wrap: break-word;
//}
</style>
