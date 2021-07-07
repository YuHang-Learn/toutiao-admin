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
      <el-form-item label="内容" prop="content">
        <el-input v-model="publishForm.content"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="publishForm.cover.type">
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
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
  </el-card>
</template>

<script>
import { getArticleChannel, createArticle, updateArticle, getArticle } from 'api/article'
export default {
  name: 'Publish',
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  data () {
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
      channels: [],
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5-30个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择所属频道', trigger: 'channge' }
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
        console.log(res)
        this.publishForm = res.data.data
      })
    },
    // 发表或修改
    onPublish (draft) {
      this.$refs.publish.validate(vaild => {
        if (!vaild) {
          return -1
        }
      })
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.publishForm, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '修改'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        createArticle(this.publishForm, draft).then(res => {
          console.log(res)
          this.$message({
            message: `${draft ? '存入草稿' : '发布'}成功`,
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
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
</style>
