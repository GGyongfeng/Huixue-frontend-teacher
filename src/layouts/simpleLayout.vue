<template>
  <el-container class="simple-layout">
    <!-- 主内容区域 -->
    <el-main class="main-content">
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.simple-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;  // 确保垂直布局

  .main-content {
    flex: 1;
    background-color: #f5f7fa;
    
    :deep(.el-main) {
      padding: 10px;
    }
    
    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }
}
</style>
