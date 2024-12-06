<template>
  <el-container class="mobile-layout">
    <!-- 主要内容区域 -->
    <el-main>
      <router-view></router-view>
    </el-main>

    <!-- 底部导航栏 -->
    <el-footer class="bottom-nav" height="60px">
      <el-menu mode="horizontal" :default-active="activeTab" @select="handleSelect">
        <el-menu-item index="home">
          <el-icon><House /></el-icon>
        </el-menu-item>

        <el-menu-item index="mine">
          <el-icon><User /></el-icon>
        </el-menu-item>
      </el-menu>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { House, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MobileLayout',
  components: {
    House,
    User
  },
  setup() {
    const router = useRouter()
    const activeTab = ref('home')

    const handleSelect = (key: string) => {
      router.push(key === 'home' ? '/' : `/${key}`)
    }

    return {
      activeTab,
      handleSelect
    }
  }
})
</script>

<style lang="scss" scoped>
.mobile-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .el-main {
    flex: 1;
    padding: 0 0 40px 0 !important;  // 只设置底部内边距，其他方向为0
    background: #f5f7f9;
  }

  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0;
    height: 50px;
    background: #fff;
    border-top: 1px solid #f0f0f0;

    :deep(.el-menu) {
      display: flex;
      justify-content: space-around;
      border-bottom: none;
    }

    :deep(.el-menu-item) {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 50px;

      .el-icon {
        margin-right: 0;
        margin-bottom: 1px;
      }

      span {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style> 