<!-- @format -->

<template>
  <div id="bg">
    <el-row>
      <!-- xs占100% sm占70% md占50% 总共24个格子-->
      <el-col
          :xs="{ span: 24, offset: 0 }"
          :sm="{ span: 16, offset: 4 }"
          :md="{ span: 6, offset: 9 }"
      >
        <div id="register">
          <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              class="demo-ruleForm"
              size="small"
          >
            <el-form-item prop="userName">
              <el-input
                  v-model.trim="ruleForm.userName"
                  auto-complete="on"
                  placeholder="账号"
              ></el-input>
            </el-form-item>

            <el-form-item prop="pass">
              <el-input type="password" v-model="ruleForm.pass" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
              <el-button
                  type="primary"
                  @click="sendEmailVertify('theEmail')"
                  v-if="timerActive"
                  size="mini"
              >
                发送邮箱验证码
              </el-button>
              <el-button v-else type="success" style="margin-top: 8px">
                {{ timeInfo }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-input
                  type="tel"
                  v-model="ruleForm.emailVertifyCode"
                  placeholder="邮箱验证码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="Class" placeholder="班级"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="realname" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="studyCode" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                  type="primary"
                  @click="submitForm('ruleForm')"
                  :loading="buttonLoding"
              >
                提交
              </el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <div class="pio-container left" style="z-index: 100">
      <div class="pio-action"></div>
      <canvas id="pio" width="180" height="180"></canvas>
    </div>
  </div>
</template>
<script>
import '/public/Pio/static/l2d'//看板娘基础库
import Paul_Pio from '/public/Pio/static/pio'//看板娘资源控制库
import '/public/Pio/static/pio.css'//看板娘资源控制库css样式表
export default {
  name: 'Register',
  mounted() {
    new Paul_Pio({
      "mode": "static",
      "hidden": false,
      "content": {
        "welcome": "欢迎来到保罗的小窝"
      },
      "night": "single.night()",
      "model": ["http://localhost/Pio/models/pio/model.json"],
      "tips": true
    })
  },
  data() {
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!this.rule.pass.test(value)) {
        callback(new Error('密码不能少于8位,且必须有数字字母组合'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.rule.username.test(value)) {
        callback(new Error('前后不允许有空格 可以中文、英文、空格、数字组成'))
      } else {
        callback()
      }
    }
    let validateEmail = (rule, value, callback) => {
      //验证邮箱正则，以下以此类推
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (!this.rule.email.test(value)) {
        callback(new Error('邮箱不合法'))
      } else {
        callback()
      }
    }
    return {
      buttonLoding: false,
      timeInfo: 300,
      timerActive: true,
      ruleForm: {
        userName: '',
        pass: '',
        checkPass: '',
        email: '',
        emailVertifyCode: '',
      },
      rule: {
        pass: /^(?=.*?[0-9])(?=.*?[a-z])[0-9a-z]{8,}$/,
        username: /^\S[a-zA-Z\s\d\u4e00-\u9fa5]+\S$/,
        email:
          /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        userName: [{ validator: validateUserName, trigger: 'blur' }],
      },
      phone: '',
      Class: '',
      realname: '',
      studyCode: '',
    }
  },
  methods: {
    sendEmailVertify() {
      if (
        this.ruleForm.email !== '' &&
        this.rule.email.test(this.ruleForm.email)
      ) {
        this.axios
          .get('http://localhost/api/SendEmailCode', {
            params: { email: this.ruleForm.email },
          })
          .then(res => {
            if (res.data.err == 0) {
              this.timerActive = false
              let refreshIntervalId = setInterval(() => {
                if (this.timeInfo < 1) {
                  this.timerActive = true
                  this.timeInfo = 300
                  clearInterval(refreshIntervalId)
                } else {
                  this.timeInfo--
                }
              }, 1000)
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(e => {
            this.$message.error(e) //这里报错客户端问题
          })
      } else {
        this.$message.warning('邮箱不正确')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.buttonLoding = true
          this.axios
            .post(
              'http://localhost/api/register', //验证表单接口
              {
                username: this.ruleForm.userName,
                password: this.ruleForm.pass,
                email: this.ruleForm.email,
                emailVertifyCode: this.ruleForm.emailVertifyCode,
                phone: this.phone,
                class: this.Class,
                realname: this.realname,
                studyCode: this.studyCode,
              }
            )
            .then(res => {
              if (res.data.err == 0) {
                this.$router.push({
                  name: 'HelloComing',
                  params: {
                    message: res.data.msg,
                    username: this.ruleForm.userName,
                  },
                })
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(e => {
              this.$message.error(e)
            })
            .finally(() => {
              this.buttonLoding = false
            })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style scoped>
#register >>> .el-input__inner{
  color: darkred;
  background-color: rgba(255,255,255,0.5);
  border-radius: 12vh;
}
#register >>> .el-input__inner::placeholder{
color: darkred;
}
#bg::before{
  z-index: -4;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("./../assets/img/acg_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  left: 0;
  top: 0;
}
</style>
