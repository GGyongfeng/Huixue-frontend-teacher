<template>
  <div class="menu-list">
    <div v-for="item in menuItems" :key="item.title" class="menu-item">
      <el-icon><component :is="item.icon" /></el-icon>
      <span>{{ item.title }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { MenuItem } from '@/types'

export default defineComponent({
  name: 'MenuList',
  props: {
    menuItems: {
      type: Array as () => MenuItem[],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.menu-list {
  margin-top: 16px;
  background: #fff;
  border-radius: 8px;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f5f5f5;
    
    .el-icon {
      margin-right: 8px;
    }
  }
}
</style> 