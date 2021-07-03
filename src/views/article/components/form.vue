<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/article' }">内容管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :model="form">
      <el-form-item label="状态：">
        <el-radio-group v-model="form.status">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="form.channel" placeholder="请选择频道">
          <el-option label="全部" :value="null"></el-option>
          <el-option
            v-for="(channel, index) in channels"
            :key="index"
            :label="channel.name"
            :value="channel.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="form.date1"
          type="daterange"
          range-separator="至"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getArticleChannel } from 'api/article'

export default {
  name: 'Form',
  created () {
    this.loadChannels()
  },
  data () {
    return {
      form: {
        date1: '',
        status: '全部',
        channel: null
      },
      channels: []
    }
  },
  methods: {
    onSubmit () {
      this.$emit('formParams', this.form)
    },
    loadChannels () {
      getArticleChannel().then((res) => {
        this.channels = res.data.data.channels
      })
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
