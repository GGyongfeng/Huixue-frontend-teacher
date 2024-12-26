<template>
  <div class="tutors-toolbar">
    <div class="filter-section">
      <!-- 年级选择 -->
      <el-select
        v-model="filterValues.student_grade"
        :placeholder="TUTOR_FILTERS.student.children.student_grade.label"
        :clearable="false"
        multiple
        collapse-tags
        collapse-tags-tooltip
        class="filter-item"
        @change="handleFilterChange"
      >
        <el-option
          v-for="option in TUTOR_FILTERS.student.children.student_grade.options"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>

      <!-- 科目选择 -->
      <el-select
        v-model="filterValues.subjects"
        :placeholder="TUTOR_FILTERS.student.children.subjects.label"
        :clearable="false"
        multiple
        collapse-tags
        collapse-tags-tooltip
        class="filter-item"
        @change="handleFilterChange"
      >
        <el-option
          v-for="option in TUTOR_FILTERS.student.children.subjects.options"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>

      <!-- 区域选择 -->
      <el-select
        v-model="filterValues.district"
        :placeholder="TUTOR_FILTERS.student.children.district.label"
        :clearable="false"
        multiple
        collapse-tags
        collapse-tags-tooltip
        class="filter-item"
        @change="handleFilterChange"
      >
        <el-option
          v-for="option in TUTOR_FILTERS.student.children.district.options"
          :key="option"
          :label="option"
          :value="option"
        />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { TUTOR_FILTERS } from '@/constants/tutor'
import { useTutorFilterStore } from '@/store/modules/tutorFilter'

const store = useTutorFilterStore()

// 定义筛选值对象的类型
interface FilterValues {
  student_grade: string[]
  subjects: string[]
  district: string[]
  [key: string]: string[] // 添加索引签名
}

// 筛选值对象初始化
const filterValues = reactive<FilterValues>({
  student_grade: [],
  subjects: [],
  district: []
})

// 处理筛选变化
const handleFilterChange = () => {
  const filters: { [key: string]: string[] } = { // 明确指定类型
    student_grade: filterValues.student_grade,
    subjects: filterValues.subjects,
    district: filterValues.district
  }

  // 过滤掉空数组
  Object.entries(filters).forEach(([key, value]) => {
    if (!value || value.length === 0) {
      delete filters[key]
    }
  })

  // 更新 store
  store.updateFilters(filters)
}

// 添加 watch 来监听筛选值的变化
watch(
  filterValues,
  (newValues) => {
    const filters: { [key: string]: string[] } = {
      student_grade: newValues.student_grade,
      subjects: newValues.subjects,
      district: newValues.district
    }

    // 过滤掉空数组
    Object.entries(filters).forEach(([key, value]) => {
      if (!value || value.length === 0) {
        delete filters[key]
      }
    })

    // 更新 store 并打印日志
    store.updateFilters(filters)
    console.log('筛选条件已更新:', filters)
  },
  { deep: true } // 深度监听对象变化
)
</script>

<style lang="scss" scoped>
.tutors-toolbar {
  border-radius: 4px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  
  .filter-section {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      width: 100%;
      display: flex;
      justify-content: space-between;

    .filter-item {
      width: 30%;
    }
  }
}
</style> 