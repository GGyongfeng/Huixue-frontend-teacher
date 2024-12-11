<template>
  <div class="tutors-notice">
    <el-alert
      :title="notice.title"
      :description="notice.description"
      type="info"
      show-icon
      :closable="false"
    >
      <template #icon>
        <el-icon><Bell /></el-icon>
      </template>
    </el-alert>
  </div>
</template>

<script setup lang="ts">
import { Bell } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getTutorNotice } from '@/api/tutorNotice'
import type { TutorNotice } from '@/api/tutorNotice'

const notice = ref<TutorNotice>({
  title: '',
  description: ''
})

const fetchNotice = async () => {
  try {
    const res = await getTutorNotice()
    notice.value = res
  } catch (error) {
    console.error('获取通知失败:', error)
  }
}

onMounted(() => {
  fetchNotice()
})
</script>

<style scoped>
.tutors-notice {
  margin-bottom: 16px;
}

:deep(.el-alert__title) {
  font-size: 14px;
  font-weight: bold;
}

:deep(.el-alert__description) {
  margin: 8px 0 0;
  font-size: 13px;
  white-space: pre-line;
  line-height: 1.6;
}
</style> 