<!-- @format -->

<template>
  <div style="opacity: 0.9">
    <el-descriptions
      title="学生信息"
      style="background-color: rgb(255, 255, 255)"
    >
      <el-descriptions-item label="姓名">
        {{ userInfo.realName }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        {{ userInfo.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="班级">
        {{ userInfo.Class }}
      </el-descriptions-item>
      <el-descriptions-item label="班级">
        {{ userInfo.studyCode }}
      </el-descriptions-item>
      <el-descriptions-item label="已选课程">
        <template v-for="course in userInfo.courseName">
          <el-tag size="medium">{{ course }}</el-tag>
        </template>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: 'StudentInfo',
  data() {
    return {}
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
}
</script>

<style scoped></style>
