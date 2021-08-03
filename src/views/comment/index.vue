<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :row-style="{height: '70px'}"
    >
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      >
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        prop="comment_status"
        label="评论状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.comment_status">
            正常
          </span>
          <span v-else>
            关闭
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="switchStatus"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :disabled="pageLoading"
      style="margin-top: 3px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_count"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getArticleData } from 'api/article'

export default {
  name: 'Comment',
  data () {
    return {
      tableData: [],
      total_count: 0,
      page: 1,
      pageLoading: false
    }
  },
  created () {
    this.localArticle()
  },
  methods: {
    localArticle () {
      getArticleData({
        response_type: 'comment',
        page: 1
      }).then(res => {
        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    handleCurrentChange (page) {
      this.pageLoading = true
      getArticleData({
        response_type: 'comment',
        page
      }).then(res => {
        this.tableData = res.data.data.results
        this.pageLoading = false
      })
    },
    handleSizeChange (size) {
      getArticleData({
        response_type: 'comment',
        page: 1,
        per_page: size
      }).then(res => {
        this.tableData = res.data.data.results
      })
    },
    switchStatus (status) {
      this.$message({
        message: `${status ? '开启' : '关闭'}文章评论状态成功`,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="less">
.card {
  .bread {
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
