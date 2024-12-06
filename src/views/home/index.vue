<template>
  <el-container class="home-page">
      <el-header class="header">
        <!-- 工具栏 -->
        <tutors-toolbar />
      </el-header>

      <el-main>
        <!-- 筛选标签 -->
        <tutors-filter-tags />
        <!-- 列表 -->
        <tutors-list />
      </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TutorsList from '@/components/tutors/TutorsList.vue'
import TutorsToolbar from '@/components/tutors/tutorsToolbar'
import TutorsFilterTags from '@/components/tutors/TutorsFilterTags.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    TutorsList,
    TutorsToolbar,
    TutorsFilterTags
  }
})
</script>

<style lang="scss" scoped>
.home-page {
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    height: 64px;
    line-height: 64px;
    padding: 0 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    margin: 20px 5%;
    border-radius: 10px;
    
    
    // 移动端适配
    @media screen and (max-width: 768px) {
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid #eee;
      height: 56px;
      line-height: 56px;
      padding: 0 12px;
      position: fixed;
      left: 0;
      right: 0;
      margin: 2px 1%;
      border-radius: 0px;
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
      margin: 0;
    }
  }

  .el-main {
    flex: 1;
    overflow-y: auto;
    
    @media screen and (max-width: 768px) {
      margin-top: 56px;
    }
  }
}
</style>
