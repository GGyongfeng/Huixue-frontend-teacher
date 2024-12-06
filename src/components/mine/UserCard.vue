<template>
  <div class="user-card">
    <el-avatar :src="userInfo.avatar" :size="50" />
    <div class="user-info">
      <div class="name">{{ userInfo.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { UserInfo } from '@/types'

export default defineComponent({
  name: 'UserCard',
  props: {
    userInfo: {
      type: Object as () => UserInfo,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  
  .user-info {
    margin-left: 16px;
    
    .name {
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style> 