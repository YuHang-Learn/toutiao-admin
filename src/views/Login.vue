<template>
  <div class="login">
    <el-form
      ref="form"
      class="login-form"
      :model="user"
      :rules="rules"
    >
      <el-form-item>
        <h1 class="login-title">用户登录页面</h1>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="user.name" placeholder="请输入账号/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree" label="我已阅读并同意用户协议和隐私条款" name="type"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-btn"
          @click="onLogin"
          :loading="btnStatus"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from 'api/user'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        name: '13911111111',
        password: '246810',
        agree: false
      },
      btnStatus: false,
      rules: {
        name: [
          { required: true, message: '请输入账号/手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '账号/手机号格式错误', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '账号/手机号应为数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入账号/手机号', trigger: 'blur' },
          { min: 6, message: '密码不能低于六位', trigger: 'blur' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请勾选用户协议和隐私条款'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onLogin () {
      this.$refs.form.validate(vaild => {
        if (vaild) {
          this.login(this.user)
        }
      })
    },
    login (data) {
      this.btnStatus = true
      userLogin(data).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.btnStatus = false
        this.$router.push({ name: 'home' })
      }).catch(err => {
        this.$message.error('账号或密码不正确')
        console.log(err)
        this.btnStatus = false
      })
    }
  }
}
</script>

<style scoped lang="less">

.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #87ceeb;
  background-size: contain;
  .login-form {
    padding: 80px;
    min-width: 300px;
    background-color: #fff;
    border-radius: 10px;
    .login-btn {
      width:100%;
    }
  }
}

</style>
