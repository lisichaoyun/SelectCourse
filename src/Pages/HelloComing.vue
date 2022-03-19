<!-- @format -->

<template>
  <div class="hello">
    <el-row :gutter="0">
      <el-col
        :xs="{ span: 24, offset: 0 }"
        :sm="{ span: 16, offset: 4 }"
        :md="{ span: 8, offset: 8 }"
        class="content"
      >
        <el-progress
          type="circle"
          :percentage="percent"
          :format="format"
        ></el-progress>
        <el-result
          icon="success"
          :title="username + msg"
          subTitle="一万年太久，只等朝夕"
        >
          <template slot="extra">
            <el-button type="primary" size="medium" @click="jump">
              立刻前往
            </el-button>
          </template>
        </el-result>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloComing',
  data() {
    return {
      msg: '登录成功欢迎来到此系统',
      Second: 10, //倒计时
      percent: 100, //圆框显示百分比
    }
  },
  computed: {
    username() {
      return this.$store.state.userInfo.realName
    },
  },
  methods: {
    format(percentage) {
      return percentage === 0 ? '即将自动跳转' : `${this.Second}秒` //此处为飘号可以把里面表达式转换为字符串
    },
    jump() {
      this.$router.replace({
        name: 'Home',
      })
    },
  },
  mounted() {
    document.getElementsByTagName('canvas')[0].style.zIndex = '-5'
    let less_times = 100 / this.Second //每次加多少
    let refreshIntervalId = setInterval(() => {
      if (this.Second < 2) {
        this.Second--
        this.percent = 0
        clearInterval(refreshIntervalId)
        this.jump()
      } else {
        this.Second--
        this.percent -= less_times
      }
    }, 1000)
  },
  beforeMount() {
    this.axios('http://localhost:8080/api/studentInfo').then(res => {
      if (res.data.err == 0) {
        let msg = res.data.msg[0]
        this.$store.dispatch('setUserInfo', {
          RealName: msg.realname,
          Phone: msg.phone,
          Class: msg.class,
          StudyCode: msg.studyCode,
          CourseName: msg.selectedCourse,
        })
      } else {
        this.$message.error(res.data.msg)
      }
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #e6eaeb;
  background-size: cover;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
}
.content {
  background-color: #ffffff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  box-shadow: 10px 10px 10px 10px #888888;
}
@media screen and (max-width: 620px) {
  .content {
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    box-shadow: 6px 6px 6px 6px #888888;
  }
}
@media screen and (max-width: 465px) {
  .content {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    box-shadow: 4px 4px 4px 4px #888888;
  }
}
@media screen and (max-width: 320px) {
  .content {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    box-shadow: 2px 2px 2px 2px #888888;
  }
}
</style>
