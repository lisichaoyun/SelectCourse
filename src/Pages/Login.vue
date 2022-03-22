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
              placeholder="用户名"
              id="username"
              class="login-form-input"
            ></el-input>
          </el-form-item>

          <el-form-item prop="pass" size="small">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              placeholder="密码"
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
    <div class="video-box" id="can"></div>
  </div>
</template>

<script>
import video_bg from 'vidbg.js'
export default {
  mounted() {
    new video_bg(
        ".video-box",
        {
          mp4: "video/video.mp4", // url或相对地址
          webm: "video/video.webm", // url或相对地址
          poster: "video/poster.jpg", // url或相对地址
          overlay: true,
          overlayColor: "#000",
          overlayAlpha: 0.1,
        },
        {
          autoplay: true,
          controls: false,
          loop: true,
          muted: true,
          playsInline: true,
        }
    )
    let canvas=document.getElementById('can').style
    canvas.position='absolute'
    canvas.zIndex='-2'
    canvas.top='0'
    canvas.left='0'
    canvas.width='100%'
    canvas.height='100%'
  },
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
@import url("../assets/css/vidbg.css");/*这里打包压缩成功*/
.video-box .vidbg-container {
  background-image: url('../../public/video/poster.jpg');
}
.login-form-input >>> .el-input__inner {
  background-color: rgba(221, 218, 215, 0.4);
  border: none;
}
.login-form-input >>> .el-input__inner::placeholder{
  color: lightgreen;
}
</style>
