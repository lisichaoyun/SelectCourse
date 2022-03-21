<!-- @format -->

<template>
  <div class="cover">
    <el-row>
      <el-col
        :xs="{ span: 8, offset: 8 }"
        :sm="{ span: 8, offset: 8 }"
        :md="{ span: 4, offset: 10 }"
      >
        <el-form
          :model="ruleForm"
          status-icon
          ref="ruleForm"
          class="demo-ruleForm"
          style="margin-top: 50%"
        >
          <label for="username" style="-webkit-text-stroke: 1px greenyellow">
            登录
          </label>

          <el-form-item prop="username" size="small" style="margin-top: 5vh">
            <el-input
              v-model="ruleForm.username"
              autocomplete="on"
              placeholder="Username"
              id="username"
              class="login-form-input"
            ></el-input>
          </el-form-item>

          <el-form-item prop="pass" size="small">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="Password"
              class="login-form-input"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="plain"
              @click="submitForm"
              style="width: 100%; color: #58bb92; font-weight: bold"
            >
              提交
            </el-button>
          </el-form-item>
        </el-form>
        <router-link to="/register" style="color: darkred;font-family: 华文琥珀">还没有注册？</router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        pass: '',
        username: '',
      },
    }
  },
  methods: {
    submitForm() {
      this.axios
        .post('http://localhost/api/login', {
          username: this.ruleForm.username,
          password: this.ruleForm.pass,
        })
        .then(res => {
          if (res.data.err == 0) {
            this.$router.replace({
              name: 'HelloComing',
            })
          } else {
            this.$message.error(res.data.msg)
          }
        }).catch(e=>{
        this.$message.error(e)
      })
    },
  },
}
</script>

<style scoped>
.cover::before {
  content: '';
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/bg.jpg');
  background-size: cover;
  position: absolute;
  z-index: -2;
  background-repeat: no-repeat;
  filter: blur(4px);
  top: 0;
  left: 0;
}
.login-form-input >>> .el-input__inner {
  background-color: rgba(221, 218, 215, 0.4);
  border: none;
  -webkit-text-stroke: 1px darkslategrey;
}
</style>
