<template>
  <div v-if="hasFilters" class="filter-tags">
    <template v-for="(section, sectionKey) in TUTOR_FILTERS" :key="sectionKey">
      <template v-for="(filter, filterKey) in section.children" :key="filterKey">
        <el-tag
          v-if="activeFilters[filterKey as string]?.length"
          closable
          @close="clearFilter(filterKey as string)"
        >
          {{ filter.label }}: {{ formatFilterValues(activeFilters[filterKey as string]) }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { TUTOR_FILTERS } from '@/constants/tutor'
import { useTutorFilterStore } from '@/store/modules/tutorFilter'

const store = useTutorFilterStore()

// 从 store 获取筛选条件
const activeFilters = computed(() => store.activeFilters)

// 判断是否有筛选条件
const hasFilters = computed(() => {
  return Object.values(store.activeFilters).some(values => values && values.length > 0)
})

// 格式化筛选值的显示
const formatFilterValues = (values: string[]) => {
  return values.join('、')
}

// 清除特定筛选条件
const clearFilter = (key: string) => {
  store.clearFilter(key)
}
</script>

<style lang="scss" scoped>
.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;

  .el-tag {
    display: flex;
    align-items: center;
    
    &:hover {
      cursor: default;
    }

    .el-tag__close {
      margin-left: 4px;
      
      &:hover {
        background-color: var(--el-color-danger);
        color: white;
      }
    }
  }
}
</style> 