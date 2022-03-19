<!-- @format -->

<template>
  <div id="CustomHeader">
    <span>Logo</span>
    <span class="tou">
      <el-image
        src="https://oss.tool.lu/cache/202203/14/2140181jzq5uc5151ozx9f.jpg.icon.png"
        style="height: 100%; width: 100%; border: 1vh; border-radius: 6vh"
      ></el-image>
    </span>
    <span>选课系统</span>
    <span>状态</span>
    <span class="userinfo">用户名:{{ userrealname }}</span>
    <span>退出</span>
  </div>
</template>

<script>
export default {
  name: 'CustomHeader',
  data() {
    return {}
  },
  computed: {
    userrealname() {
      return this.$store.state.userInfo.realName
    },
  },
}
</script>

<style scoped>
#CustomHeader {
  width: 100%;
  height: 100%;
  background-color: rgba(124, 124, 124, 0.8);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
}
.tou {
  height: 32px;
  width: 32px;
}
span {
  color: greenyellow;
}
</style>
