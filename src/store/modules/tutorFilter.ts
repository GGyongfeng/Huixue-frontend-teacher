import { defineStore } from 'pinia'
import { useTutorStore } from './tutor'

const FILTER_STORAGE_KEY = 'tutor_filter_state'

interface TutorFilterState {
  searchText: string
  activeFilters: {
    [key: string]: string[]
  }
}

export const useTutorFilterStore = defineStore('tutorFilter', {
  state: (): TutorFilterState => {
    // 从 localStorage 读取保存的状态
    const savedState = localStorage.getItem(FILTER_STORAGE_KEY)
    
    // 如果有保存的状态，则使用保存的状态
    if (savedState) {
      return JSON.parse(savedState)
    }
    
    // 否则返回默认状态
    return {
      searchText: '',
      activeFilters: {}
    }
  },

  actions: {
    // 设置搜索文本并触发重新获取列表
    async setSearchText(text: string) {
      this.searchText = text
      this.saveToLocalStorage()
      const tutorStore = useTutorStore()
      await tutorStore.fetchTutorsList()
    },

    // 更新筛选条件并触发重新获取列表
    async updateFilters(filters: TutorFilterState['activeFilters']) {
      this.activeFilters = filters
      this.saveToLocalStorage()
      const tutorStore = useTutorStore()
      await tutorStore.fetchTutorsList()
    },

    // 清除特定筛选条件并触发重新获取列表
    async clearFilter(key: string) {
      if (this.activeFilters[key]) {
        this.activeFilters[key] = []
        this.saveToLocalStorage()
        const tutorStore = useTutorStore()
        await tutorStore.fetchTutorsList()
      }
    },

    // 重置所有筛选条件并触发重新获取列表
    async resetFilters() {
      this.searchText = ''
      this.activeFilters = {}
      this.saveToLocalStorage()
      const tutorStore = useTutorStore()
      await tutorStore.fetchTutorsList()
    },

    // 保存状态到 localStorage
    saveToLocalStorage() {
      const state = {
        searchText: this.searchText,
        activeFilters: this.activeFilters
      }
      localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state))
    },

    // 清除本地存储的筛选条件
    clearLocalStorage() {
      localStorage.removeItem(FILTER_STORAGE_KEY)
    }
  }
}) 