<template>
  <el-container class="basic-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '0px' : '120px'">
      <el-menu
        class="sidebar"
        :collapse="isCollapse"
        default-active="home"
        router
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/mine">
          <el-icon><User /></el-icon>
          <span>我的</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部导航栏 -->
      <el-header class="header">
        <el-button type="text" @click="toggleSidebar">
          <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
        </el-button>
        <span>汇学家教</span>
      </el-header>

      <!-- 主要内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { House, User, Fold, Expand } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    House,
    User,
    Fold,
    Expand
  },
  setup() {
    const isCollapse = ref(false)

    const toggleSidebar = () => {
      isCollapse.value = !isCollapse.value
    }

    return {
      isCollapse,
      toggleSidebar
    }
  }
})
</script>

<style lang="scss" scoped>
.basic-layout {
  height: 100vh;

  .sidebar {
    height: 100%;
    border-right: solid 1px #e6e6e6;
  }

  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
    padding: 0 20px;

    .el-button {
      font-size: 20px;
      margin-right: 20px;
    }
  }

  .el-main {
    background: #f5f7f9;
    padding: 0;
  }

  // 设置侧边栏样式
  :deep(.el-aside) {
    background: #fff;
    transition: width 0.3s;
    overflow: hidden;
  }

  // 设置菜单样式
  :deep(.el-menu) {
    border-right: none;
  }
}
</style> 