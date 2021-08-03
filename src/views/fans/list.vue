<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>粉丝列表</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>你的粉丝总数为：{{total_count}}</h3>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :row-style="{height: '100px'}"
    >
      <el-table-column
        prop="id"
        label="粉丝id"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="粉丝用户名"
      >
      </el-table-column>
      <el-table-column
        label="用户头像">
        <template slot-scope="scope">
          <img v-if="scope.row.photo" :src="scope.row.photo" class="image" alt="">
          <div class="block" v-else>
            <span class="demonstration">默认</span>
            <el-image></el-image>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :disabled="pageLoading"
      style="margin-top: 3px"
      @current-change="handleCurrentChange"
      :current-page="page"
      layout="prev, pager, next"
      :total="total_count"
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { getFansData } from 'api/fans'

export default {
  name: 'index',
  data () {
    return {
      tableData: [],
      total_count: 0,
      page: 1,
      per_page: 10,
      pageLoading: false
    }
  },
  created () {
    this.getFans(1)
  },
  methods: {
    getFans (page) {
      getFansData().then(res => {
        this.tableData = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    },
    handleCurrentChange (page) {
      this.pageLoading = true
      getFansData({
        page
      }).then(res => {
        this.tableData = res.data.data.results
        this.pageLoading = false
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
  .image {
    width: 100px;
  }
}
</style>
