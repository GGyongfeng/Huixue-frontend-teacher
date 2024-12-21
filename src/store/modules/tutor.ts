import { defineStore } from 'pinia'
import type { TutorOrder } from '@/types/tutorOrder'
import { getTutorsList } from '@/api/tutorsList'
import { useTutorFilterStore } from './tutorFilter'

interface TutorState {
  tutorsList: TutorOrder[]
  loading: boolean
  error: string | null
  total: number
  page: number
  pageSize: number
}

export const useTutorStore = defineStore('tutor', {
  state: (): TutorState => ({
    tutorsList: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pageSize: 20
  }),

  actions: {
    // 获取家教列表
    async fetchTutorsList() {
      this.loading = true
      this.error = null
      
      try {
        const filterStore = useTutorFilterStore()
        
        // 构建所有可能的参数
        const params: Record<string, any> = {
          page: this.page,
          pageSize: this.pageSize
        }

        // 只有当搜索关键词不为空时才添加
        const keyword = filterStore.searchText.trim()
        if (keyword) {
          params.keyword = keyword
        }

        // 处理筛选条件
        Object.entries(filterStore.activeFilters).forEach(([key, values]) => {
          if (values && values.length > 0) {
            // 所有筛选条件都保持数组格式
            params[key] = values
          }
        })

        
        const response = await getTutorsList(params)

        // 修改这里的数据处理逻辑
        const { list, total } = response
        console.log('解析数据:', {
          列表长度: list.length,
          总数: total,
          当前页码: this.page, 
          每页条数: this.pageSize 
        })
        
        this.tutorsList = list
        this.total = total

      } catch (err) {
        console.error('捕获错误:', err)
        this.error = err instanceof Error ? err.message : '获取列表失败'
        console.error('获取家教列表失败:', this.error)
      } finally {
        this.loading = false
      }
    },

    // 设置分页
    setPage(page: number) {
      this.page = page
      this.fetchTutorsList()
    },

    setPageSize(pageSize: number) {
      this.pageSize = pageSize
      this.page = 1  // 切换每页条数时重置到第一页
      this.fetchTutorsList()
    },

    // 重置状态
    resetState() {
      this.tutorsList = []
      this.loading = false
      this.error = null
      this.total = 0
      this.page = 1
      this.pageSize = 20
    }
  }
}) 