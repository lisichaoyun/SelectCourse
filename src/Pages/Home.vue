<!-- @format -->

<template>
  <div id="home">
    <div id="header">
      <component :is="CustomHeader"></component>
    </div>
    <el-row type="flex">
      <el-col
        :xs="{ span: 6, offset: 0 }"
        :sm="{ span: 6, offset: 0 }"
        :md="{ span: 4, offset: 0 }"
      >
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          align="left"
          @select="ControlPage"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-home hidden-xs-only"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-data hidden-xs-only"></i>
              <span slot="title">学生系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-s-check hidden-xs-only"></i>
                <span>选课</span>
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-s-data hidden-xs-only"></i>
                <span>信息</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-coffee-cup hidden-xs-only"></i>
              <span slot="title" id="admin">教师管理系统</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-notebook-1 hidden-xs-only"></i>
                <span id="adminCo">添加课程信息</span>
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-view hidden-xs-only"></i>
                <span style="font-size: 1vh" id="preview">
                  预览学生已选课程导图
                </span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="4">
            <i class="el-icon-key hidden-xs-only"></i>
            <span slot="title">修改密码</span>
          </el-menu-item>
          <el-menu-item @click="dialogVisible = true">
            <i class="el-icon-close hidden-xs-only"></i>
            <span slot="title">退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col
        :xs="{ span: 18, offset: 0 }"
        :sm="{ span: 18, offset: 0 }"
        :md="{ span: 20, offset: 0 }"
      >
        <component :is="content"></component>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
          <span>您确认要安全退出吗</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              确 定
            </el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CustomHeader from '../components/CustomHeader'
import AdministratorAccount from '../components/AdministratorAccount'
import StudentSystem from '../components/StudentSystem'
import StudentInfo from '../components/StudentInfo'
import Main from '../components/Main'
import AdministratorPreview from '../components/AdministratorPreview'
import ChangePassword from '../components/ChangePassword'
export default {
  components: {
    StudentSystem,
    StudentInfo,
    AdministratorAccount,
    Main,
    AdministratorPreview,
    ChangePassword,
    CustomHeader,
  },
  name: 'Home',
  data() {
    return {
      username: this.$store.state.userInfo.realName,
      content: '',
      CustomHeader: CustomHeader,
      pages: {
        1: 'Main',
        '2-1': 'StudentSystem',
        '2-2': 'StudentInfo',
        '3-1': 'AdministratorAccount',
        '3-2': 'AdministratorPreview',
        4: 'ChangePassword',
      },
      dialogVisible: false,
    }
  },
  methods: {
    ControlPage(index) {
      //此方法可以设置多级菜单
      this.content = this.pages[index]
    },
  },
}
</script>

<style scoped>
.el-menu-vertical-demo {
  z-index: 0;
  overflow: hidden;
}
@media screen and (max-height: 512px) {
  #home::before {
    display: none;
  }
}
@media screen and (max-width: 512px) {
  /*为少数屏幕更小的设计*/
  span {
    font-size: small;
  }
  #admin {
    position: relative;
    left: -20%;
  }
  #preview {
    position: relative;
    left: -35%;
  }
  #adminCo {
    position: relative;
    left: -25%;
  }
}
@media screen and (max-width: 300px) {
  /*为少数屏幕更小的设计*/
  span {
    writing-mode: vertical-rl;
    font-size: xx-small;
    margin-left: -50%;
  }
}
#home::before {
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 100%;
  height: 100%;
  background-image: url('../assets/img/earth.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: -10;
}
#header {
  width: 100%;
  height: 32px;
}
</style>
