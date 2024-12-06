<template>
  <div class="mine-page">
    <!-- 用户信息卡片 -->
    <user-card :user-info="userInfo" />
    
    <!-- 菜单列表 -->
    <menu-list :menu-items="menuItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserCard from '@/components/mine/UserCard.vue'
import MenuList from '@/components/mine/MenuList.vue'
import type { UserInfo, MenuItem } from '@/types'

export default defineComponent({
  name: 'MinePage',
  components: {
    UserCard,
    MenuList
  },
  setup() {
    // 用户信息
    const userInfo = ref<UserInfo>({
      name: '张三',
      avatar: 'https://placeholder.co/100'
    })

    // 菜单项
    const menuItems = ref<MenuItem[]>([
      { icon: 'Setting', title: '设置' },
      { icon: 'Message', title: '消息' }
    ])

    return {
      userInfo,
      menuItems
    }
  }
})
</script>

<style lang="scss" scoped>
.mine-page {
  padding: 16px;
}
</style>
