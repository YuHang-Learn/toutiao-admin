<template>
  <el-card class="box-card">
    <div class="title">
      根据筛选结果共查询到{{ totalCount }}条结果:
    </div>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      :data="tableData"
      stripe
      class="article-table"
      >
      <el-table-column
        prop="cover"
        label="封面">
        <template slot-scope="scope">
          <el-image
            style="width: 50px;height: 50px"
            v-if="scope.row.cover.images[0]"
            :src="scope.row.cover.images[0]"
            fit="fill"
            alt="" />
          <el-image v-else>
            <div
              slot="error"
              class="image-slot"
              style="width: 50px;height: 50px;line-height: 50px"
            >
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <el-tag
            :type="statusText[scope.row.status].sta"
          >
            {{statusText[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="日期"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        v-if="tableData.length"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="updateArticle(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="delArticle(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next, jumper"
        @current-change="vertically"
        class="page"
        :disabled="loading"
        :total="totalCount"
      >
      </el-pagination>
    </div>
  </el-card>
</template>

<script>
import { getArticleData, deleteArticle } from 'api/article'

export default {
  name: 'Table',
  created () {
    this.loadArticle()
  },
  props: {
    formParams: {
      type: Object,
      default: () => {}
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableData: [],
      totalCount: 0,
      statusText: [
        { id: 0, sta: '', text: '草稿' },
        { id: 1, sta: 'warning', text: '待审核' },
        { id: 2, sta: 'success', text: '审核通过' },
        { id: 3, sta: 'danger', text: '审核失败' },
        { id: 4, sta: 'info', text: '已删除' }],
      params: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      loading: true
    }
  },
  watch: {
    flag: {
      handler () {
        if (this.formParams.status === '全部') {
          this.params.status = null
        }
        for (const x of this.statusText) {
          if (x.text === this.formParams.status) {
            this.params.status = x.id
            break
          }
        }
        this.params.begin_pubdate = this.formParams.date1[0]
        this.params.end_pubdate = this.formParams.date1[1]
        this.params.channel_id = this.formParams.channel
        this.loadArticle()
      }
    }
  },
  methods: {
    loadArticle () {
      this.loading = true
      getArticleData(this.params).then((res) => {
        console.log(res)
        this.tableData = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.loading = false
      })
    },
    vertically (page) {
      this.params.page = page
      this.loadArticle()
    },
    delArticle (articleId) {
      this.$confirm('确定删除文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(articleId).then(res => {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.loadArticle()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateArticle (articleId) {
      this.$router.push(`/publish?id=${articleId}`)
    }
  }
}
</script>

<style scoped lang="less">

.box-card {
  margin-top: 40px;
  .title {
    border-bottom: solid 1px #eee;
    padding-bottom: 20px;
  }
  .article-table {
    margin-bottom: 20px;
  }
  .page {
    display: flex;
    justify-content: center;
  }
}

</style>
