<template>
  <div class="tutors-list">

 

    <!-- 加载状态 -->
    <el-skeleton :loading="loading" animated :count="4" v-if="loading">
      <template #template>
        <div class="list-content">
          <div v-for="i in 4" :key="i" class="skeleton-item">
            <el-skeleton-item variant="p" style="width: 100%; height: 240px;" />
          </div>
        </div>
      </template>
    </el-skeleton>

    <!-- 错误提示 -->
    <el-alert
      v-if="error"
      :title="error"
      type="error"
      show-icon
      :closable="false"
      style="margin-bottom: 16px;"
    />

    <!-- 列表内容 -->
    <div v-else class="list-content">
      <tutors-order-card
        v-for="order in filteredOrders"
        :key="order.id"
        :order="order"
      />
    </div>

    <!-- 空状态 -->
    <el-empty 
      v-if="!loading && !error && filteredOrders.length === 0"
      description="暂无符合条件的订单"
    />

    <!-- 简化的分页组件 -->
    <div class="pagination-wrapper" v-if="!loading && !error && total > 0">
      <el-pagination
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
        :page-size="20"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed} from 'vue'
import TutorsOrderCard from './TutorsOrderCard'
import { useTutorStore } from '@/store/modules/tutor'

const tutorStore = useTutorStore()

// 从 store 获取状态
const loading = computed(() => tutorStore.loading)
const error = computed(() => tutorStore.error)
const filteredOrders = computed(() => tutorStore.tutorsList)
const total = computed(() => tutorStore.total)

// 分页相关
const currentPage = computed({
  get: () => tutorStore.page,
  set: (val) => tutorStore.setPage(val)
})

// 分页事件处理
const handleCurrentChange = (val: number) => {
  tutorStore.setPage(val)
}

// 组件挂载时获取数据
onMounted(async () => {
  await tutorStore.fetchTutorsList()
})
</script>

<style lang="scss" scoped>
.tutors-list {
  padding: 0px;

  .list-content {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 12px;  // 减小底部间距
  }

  .skeleton-item {
    border-radius: 4px;
    overflow: hidden;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: center;
    padding-bottom: 10px;  // 减小内边距
    position: sticky;
    bottom: 0;
  }
}
</style>
