<template>
    <el-card class="tutor-order-card">
      <div class="order-header">
        <div class="code-wrapper">
          <span class="order-code">订单编号：{{ order.tutor_code }}</span>
          <el-button
            class="copy-btn"
            type="primary"
            link
            :icon="CopyDocument"
            @click="handleCopy"
          />
        </div>
        <div class="tags-container">
          <!-- 订单标签，如果存在则显示，可能有多个标签 -->
          <template v-if="order.order_tags">
            <el-tag 
            v-for="tag in orderTags" 
            :key="tag"
            type="warning" 
            class="mr-2"
            >
            {{ tag }}
          </el-tag>
        </template>
      </div>
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
          <span class="label">年级</span>
          <span class="colon">:</span>
          <span>{{ order.student_grade }}</span>
        </div>
  
        <div class="info-item">
          <span class="label">科目</span>
          <span class="colon">:</span>
          <span>{{ order.subjects }}</span>
        </div>
  
        
        <template v-if="hasStudentCondition">
          <div class="info-item">
            <span class="label">学生情况</span>
            <span class="colon">:</span>
            <span>{{ studentCondition }}</span>
          </div>
        </template>
  
        <div class="info-item">
          <span class="label">地址</span>
          <span class="colon">:</span>
          <span class="address" @click="handleCopyAddress">
            {{ order.city }}{{ order.district }}{{ order.address }}
          </span>
        </div>
  
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
  
        <template v-if="hasTeacherRequirements">
          <div class="info-item">
            <span class="label">教师要求</span>
            <span class="colon">:</span>
            <span>{{ teacherRequirements }}</span>
          </div>
        </template>
  
        <div class="info-item">
          <span class="label">其他要求</span>
          <span class="colon">:</span>
          <span>{{ order.requirement_desc }}</span>
        </div>
      </div>
    </el-card>
  </template>
  
  <script lang="ts" setup>
  import { computed } from 'vue'
  import { CopyDocument } from '@element-plus/icons-vue'
  import { ElMessage } from 'element-plus'
  import type { TutorOrder } from '@/types/tutorOrder'
  
  const props = defineProps<{
    order: TutorOrder
  }>()
  
  // 将order_tags字符串转换为数组
  const orderTags = computed(() => {
    if (!props.order.order_tags) return []
    return props.order.order_tags.split(',').map(tag => tag.trim())
  })
  
  // 计算教师要求
  const teacherRequirements = computed(() => {
    const requirements = []
    if (props.order.teaching_type) {
      requirements.push(`${props.order.teaching_type}`)
    }
    if (props.order.teacher_type) {
      requirements.push(`${props.order.teacher_type}`)
    }
    if (props.order.teacher_gender) {
      requirements.push(`${props.order.teacher_gender}`)
    }
    return requirements.join('，')
  })
  
  // 是否有教师要求
  const hasTeacherRequirements = computed(() => {
    return !!(
      props.order.teaching_type || 
      props.order.teacher_type || 
      (props.order.teacher_gender && props.order.teacher_gender !== 'null')
    )
  })
  
  // 计算学生情况
  const studentCondition = computed(() => {
    const condition = []
    if (props.order.grade_score) {
      condition.push(`成绩 ${props.order.grade_score}`)
    }
    if (props.order.student_level) {
      condition.push(`${props.order.student_level}`)
    }
    return condition.join('，')
  })
  
  // 是否有学生情况
  const hasStudentCondition = computed(() => {
    return !!(props.order.grade_score || props.order.student_level)
  })
  
  // 复制功能
  const handleCopy = () => {
    // 创建临时 input 元素并设置样式
    const tempInput = document.createElement('input')
    tempInput.value = props.order.tutor_code
    tempInput.style.position = 'fixed'
    tempInput.style.opacity = '0'
    tempInput.style.top = '0'
    tempInput.style.left = '0'
    document.body.appendChild(tempInput)
    
    try {
      // 选中文本
      tempInput.focus()
      tempInput.select()
      
      // 对于iOS设备特殊处理
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
  
      // 执行复制
      const successful = document.execCommand('copy')
      if (successful) {
        ElMessage({
          message: '订单编号已复制',
          type: 'success',
          duration: 2000
        })
      } else {
        throw new Error('复制失败')
      }
    } catch (err) {
      // 如果execCommand失败，尝试使用clipboard API
      navigator.clipboard?.writeText(props.order.tutor_code)
        .then(() => {
          ElMessage({
            message: '订单编号已复制',
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
      // 清理临时元素
      document.body.removeChild(tempInput)
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
  
  .address {
    cursor: pointer;
    color: #409eff;
    
    &:hover {
      text-decoration: underline;
    }
  }
  </style>
  