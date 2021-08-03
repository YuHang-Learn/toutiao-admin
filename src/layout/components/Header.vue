<template>
<div class="header-nav">
  <div @click="isOnOrOff">
    <i :class="{
      'el-icon-s-fold':!isCollapse,
      'el-icon-s-unfold':isCollapse
    }"
       class="btn"
    ></i>
    <span>收缩/展开侧边栏</span>
  </div>
  <div>
    <el-dropdown :hide-on-click="false">
  <span class="el-dropdown-link">
    <img :src="user.photo" alt="" class="user-img">
    {{ user.name }}
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
import { getUserInfo } from 'api/user'
import globalBus from 'utils/global_bus'

export default {
  name: 'Header',
  data () {
    return {
      user: {}
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  created () {
    getUserInfo().then(res => {
      this.user = res.data.data
    })
    globalBus.$on('info_update', (data) => {
      this.user.name = data.name
      this.user.photo = data.photo
    })
  },
  methods: {
    onLogout () {
      window.localStorage.removeItem('user')
      this.$router.push({ name: 'login' })
    },
    isOnOrOff () {
      this.$emit('isOnOrOff')
    }
  }
}
</script>

<style scoped lang="less">
.header-nav {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .btn {
    margin-right: 5px;
  }
  .user-img {
    width: 40px;
    height: 40px;
    vertical-align: middle;
  }
}
</style>
