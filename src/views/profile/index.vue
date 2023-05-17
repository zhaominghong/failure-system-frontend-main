<template>
  <div class="profile-container">
    <el-card>
      <div class="avatar-wrapper">
        <div class="avatar-container">
          <el-avatar :src="userInfo.avatar" :size="120" fit="cover" />
        </div>
        <el-upload
          class="avatar-upload"
          :action="uploadURL"
          :show-file-list="false"
          name="avatar"
          :headers="headers"
          :on-success="handleAvatarUpload"
        >
          <el-button type="primary">更换头像</el-button>
        </el-upload>
      </div>
      <el-form :model="userInfo" label-position="top" label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="userInfo.phone" />
        </el-form-item>
        <el-form-item label="身份类别">
          <el-input v-model="roleMap[userInfo.role]" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInfo, updateInfo } from '@/api/user'
import { getToken } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        phone: '',
        avatar: '',
        role: ''
      },
      roleMap: {
        1: '巡线人员',
        2: '抢险人员',
        3: '管理员'
      },
      uploadURL: process.env.VUE_APP_BASE_API + '/user/upload',
      headers: {
        'Authorization': getToken()
      }
    }
  },
  mounted() {
    // 在页面加载时获取用户信息
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      const res = await getInfo()
      if (this.$$isResponseSuccess(res)) {
        this.userInfo = res.data.userinfo
      }
    },
    async updateUserInfo() {
      const res = await updateInfo(this.userInfo)
      if (this.$$isResponseSuccess(res)) {
        this.$message.success(res.message)
        await this.getUserInfo()
        this.$store.commit('user/SET_AVATAR', this.userInfo.avatar)
        this.$store.commit('user/SET_NAME', this.userInfo.username)
      } else {
        this.$message.error(res.message)
      }
    },
    async handleAvatarUpload(response) {
      if (this.$$isResponseSuccess(response)) {
        this.$message.success(response.message)
        await this.getUserInfo()
        this.$store.commit('user/SET_AVATAR', this.userInfo.avatar)
        this.$store.commit('user/SET_NAME', this.userInfo.username)
      } else {
        this.$message.error(response.message)
      }
    }
  }
}
</script>

<style>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.avatar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
.avatar-container .el-avatar.el-avatar--circle {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.avatar-upload {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
