<template>
  <el-card class="tutor-order-card">
    <div class="order-header">
      <div class="code-wrapper">
        <div class="left-section">
          <span class="order-code">订单编号：{{ order.tutor_code }}</span>
        </div>
        <div class="right-section" @click="handleCopy">
          {{ order.created_by_name }}
          <el-button class="copy-btn" type="primary" link :icon="CopyDocument" />
        </div>
      </div>

      <!-- 订单标签，如果存在则显示，可能有多个标签 -->
      <!-- <div class="tags-container">
        <template v-if="order.order_tags">
          <el-tag v-for="tag in orderTags" :key="tag" type="warning" class="mr-2">
            {{ tag }}
          </el-tag>
        </template>
      </div> -->
    </div>

    <div class="order-content">
      <template v-if="order.student_gender">
        <div class="info-item">
          <span class="label">学生性别</span>
          <span class="colon">:</span>
          <span>{{ order.student_gender }}</span>
        </div>
      </template>

      <div class="info-item">
        <span class="label">学生年级</span>
        <span class="colon">:</span>
        <span>{{ order.student_grade }}</span>
      </div>

      <div class="info-item">
        <span class="label">补习科目</span>
        <span class="colon">:</span>
        <span>{{ order.subjects_desc }}</span>
      </div>

      <template v-if="order.grade_score">
        <div class="info-item">
          <span class="label">现阶段成绩</span>
          <span class="colon">:</span>
          <span>{{ order.grade_score }}</span>
        </div>
      </template>

      <div class="info-item">
        <span class="label">教学时间</span>
        <span class="colon">:</span>
        <span>{{ order.tutoring_time }}</span>
      </div>

      <div class="info-item">
        <span class="label">课时费用</span>
        <span class="colon">:</span>
        <span>{{ order.salary }}</span>
      </div>

      <div class="info-item">
        <span class="label">地址</span>
        <span class="colon">:</span>
        <span class="address" @click="handleCopyAddress">
          {{ order.city }}{{ order.district }}{{ order.address }}
        </span>
      </div>

      <div class="info-item">
        <span class="label">对老师要求</span>
        <span class="colon">:</span>
        <span>{{ order.requirement_desc }}</span>
      </div>

      <!-- <div class="info-item">
        <span class="label">创建人</span>
        <span class="colon">:</span>
        <span>{{ order.created_by_name }}</span>
      </div> -->

      <!-- <div class="info-item right-section" @click="handleCopy">
        {{ order.created_by_name }}
        <el-button class="copy-btn" type="primary" link :icon="CopyDocument" />
      </div> -->
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { TutorOrder } from '@/types/tutorOrder'

const props = defineProps<{
  order: TutorOrder
}>()

// ----这部分是关于标签的渲染的---
// import { computed } from 'vue'
// // 将order_tags字符串转换为数组
// const orderTags = computed(() => {
//   if (!props.order.order_tags) return []
//   return props.order.order_tags.split(',').map(tag => tag.trim())
// })
// ============================

// 复制功能
const handleCopy = () => {
  const orderText = `${props.order.tutor_code}号家教
【学生性别】：${props.order.student_gender || '未指定'}
【学生年级】：${props.order.student_grade}
【补习科目】：${props.order.subjects_desc}
【补习时间】：${props.order.tutoring_time}
【报价】：${props.order.salary}
【地址】：${props.order.district}${props.order.address}
【对老师要求】：${props.order.requirement_desc}`

  // 使用 textarea 代替 input
  const tempTextArea = document.createElement('textarea')
  tempTextArea.value = orderText
  tempTextArea.style.position = 'fixed'
  tempTextArea.style.opacity = '0'
  tempTextArea.style.top = '0'
  tempTextArea.style.left = '0'
  document.body.appendChild(tempTextArea)

  try {
    tempTextArea.focus()
    tempTextArea.select()

    // 对于iOS设备特殊处理
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange()
      range.selectNodeContents(tempTextArea)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
      tempTextArea.setSelectionRange(0, 999999)
    }

    // 执行复制
    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage({
        message: '订单信息已复制',
        type: 'success',
        duration: 2000
      })
    } else {
      throw new Error('复制失败')
    }
  } catch (err) {
    navigator.clipboard?.writeText(orderText)
      .then(() => {
        ElMessage({
          message: '订单信息已复制',
          type: 'success',
          duration: 2000
        })
      })
      .catch(() => {
        ElMessage({
          message: '复制失败，请手动复制',
          type: 'error',
          duration: 2000
        })
      })
  } finally {
    document.body.removeChild(tempTextArea)
  }
}

// 添加地址复制功能
const handleCopyAddress = () => {
  const address = `${props.order.city}${props.order.district}${props.order.address}`

  // 创建临时 input 元素并设置样式
  const tempInput = document.createElement('input')
  tempInput.value = address
  tempInput.style.position = 'fixed'
  tempInput.style.opacity = '0'
  tempInput.style.top = '0'
  tempInput.style.left = '0'
  document.body.appendChild(tempInput)

  try {
    tempInput.focus()
    tempInput.select()

    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange()
      range.selectNodeContents(tempInput)
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(range)
      }
      tempInput.setSelectionRange(0, 999999)
    }

    const successful = document.execCommand('copy')
    if (successful) {
      ElMessage({
        message: '地址已复制',
        type: 'success',
        duration: 2000
      })
    } else {
      throw new Error('复制失败')
    }
  } catch (err) {
    navigator.clipboard?.writeText(address)
      .then(() => {
        ElMessage({
          message: '地址已复制',
          type: 'success',
          duration: 2000
        })
      })
      .catch(() => {
        ElMessage({
          message: '复制失败，请手动复制',
          type: 'error',
          duration: 2000
        })
      })
  } finally {
    document.body.removeChild(tempInput)
  }
}

</script>

<style lang="scss" scoped>
@use './style.scss';
</style>