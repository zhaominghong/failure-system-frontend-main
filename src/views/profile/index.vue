<template>
  <div class="profile-container">
    <el-card>
      <div class="avatar-wrapper">
        <el-avatar :src="userInfo.actor_url" :size="120" />
        <el-upload
          class="avatar-upload"
          action="/upload"
          :show-file-list="false"
          :on-success="handleAvatarUpload">
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
        <el-form-item>
          <el-button type="primary" @click="updateUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        username: '',
        email: '',
        phone: '',
        actor_url: ''
      }
    }
  },
  mounted() {
    // 在页面加载时获取用户信息
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      // 从后端 API 获取用户信息，填充到 this.userInfo
      // 可以使用 axios 或其他库发送请求
      // 示例代码：
      // axios.get('/api/user/info').then(response => {
      //   this.userInfo = response.data;
      // }).catch(error => {
      //   console.error(error);
      // });
    },
    updateUserInfo() {
      // 提交更新后的用户信息到后端 API
      // 示例代码：
      // axios.post('/api/user/update', this.userInfo).then(response => {
      //   console.log('User info updated successfully');
      // }).catch(error => {
      //   console.error(error);
      // });
    },
    handleAvatarUpload(response) {
      // 头像上传成功后的回调函数
      // 更新 this.userInfo.actor_url
      // 示例代码：
      // this.userInfo.actor_url = response.data.url;
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

.avatar-upload {
  margin-top: 10px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
