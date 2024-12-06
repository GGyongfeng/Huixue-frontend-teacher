<template>
    <div class="tutors-toolbar">
        <div class="left">
            <el-autocomplete
                v-model="searchText"
                :fetch-suggestions="querySearchHistory"
                placeholder="搜索订单"
                class="search-input"
                clearable
                @select="handleSelect"
            >
                <template #prefix>
                    <el-icon>
                        <Search />
                    </el-icon>
                </template>
                
                <template #default="{ item }">
                    <div class="search-history-item">
                        <span>{{ item.value }}</span>
                        <el-icon 
                            class="delete-icon" 
                            @click.stop="removeHistory(item.value)"
                        >
                            <Delete />
                        </el-icon>
                    </div>
                </template>
            </el-autocomplete>
        </div>

        <div class="right">
            <el-button type="primary" @click="onSearch" class="search-btn">
                <el-icon>
                    <Search />
                </el-icon>
                <span class="btn-text">搜索</span>
            </el-button>

            <el-button @click="onReset" class="reset-btn">
                <el-icon>
                    <RefreshLeft />
                </el-icon>
                <span class="btn-text">重置</span>
            </el-button>

            <el-button type="primary" @click="showDrawer = true">
                <el-icon>
                    <Filter />
                </el-icon>
                <span class="btn-text">筛选</span>
            </el-button>
        </div>

        <!-- 筛选抽屉 -->
        <el-drawer v-model="showDrawer" title="筛选条件" direction="btt" size="70%">
            <div class="filter-content">
                <!-- 遍历主要分类 -->
                <div v-for="(section, sectionKey) in TUTOR_FILTERS" :key="sectionKey" class="filter-section">
                    <div class="section-title">{{ section.label }}</div>
                    
                    <!-- 遍历子分类 -->
                    <div v-for="(filter, filterKey) in section.children" :key="filterKey" class="filter-group">
                        <div class="filter-label">{{ filter.label }}</div>
                        
                        <!-- 区间选择 -->
                        <template v-if="filter.type === 'range'">
                            <el-radio-group v-model="selectedFilters[filterKey]">
                                <el-radio 
                                    v-for="option in filter.options as RangeOption[]" 
                                    :key="option.label" 
                                    :label="option.value"
                                >
                                    {{ option.label }}
                                </el-radio>
                            </el-radio-group>
                        </template>
                        
                        <!-- 普通多选 -->
                        <template v-else>
                            <el-checkbox-group v-model="selectedFilters[filterKey]">
                                <el-checkbox 
                                    v-for="option in filter.options as string[]" 
                                    :key="option" 
                                    :value="option"
                                >
                                    {{ option }}
                                </el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </div>
                </div>
            </div>

            <template #footer>
                <div class="drawer-footer">
                    <el-button @click="onResetFilters">重置</el-button>
                    <el-button type="primary" @click="onApplyFilters">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { Search, Filter, RefreshLeft, Delete } from '@element-plus/icons-vue'
import { TUTOR_FILTERS } from '@/constants/tutor'
import type { RangeOption } from '@/constants/tutor'
import { useTutorFilterStore } from '@/store/modules/tutorFilter'

const HISTORY_KEY = 'tutor_search_history'
const MAX_HISTORY = 10

interface SelectedFilters {
  [key: string]: string[]
}

export default defineComponent({
    name: 'TutorsToolbar',
    components: {
        Search,
        Filter,
        RefreshLeft,
        Delete
    },
    setup() {
        const searchText = ref('')
        const searchHistory = ref<string[]>([])
        const showDrawer = ref(false)
        const selectedFilters = reactive<SelectedFilters>({})
        const store = useTutorFilterStore()

        // 初始化选中的筛选条件
        Object.keys(TUTOR_FILTERS).forEach(section => {
            Object.keys(TUTOR_FILTERS[section].children).forEach(key => {
                selectedFilters[key] = []
            })
        })

        // 初始化搜索历史
        onMounted(() => {
            const history = localStorage.getItem(HISTORY_KEY)
            if (history) {
                searchHistory.value = JSON.parse(history)
            }
        })

        // 保存搜索历史
        const saveSearchHistory = (text: string) => {
            if (!text.trim()) return
            
            const history = searchHistory.value
            // 删除已存在的相同搜索词
            const index = history.indexOf(text)
            if (index > -1) {
                history.splice(index, 1)
            }
            // 添加到开头
            history.unshift(text)
            // 限制数量
            if (history.length > MAX_HISTORY) {
                history.pop()
            }
            
            searchHistory.value = history
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
        }

        // 查询搜索历史
        const querySearchHistory = (
            queryString: string, 
            cb: (arg: Array<{ value: string }>) => void
        ) => {
            const results = queryString
                ? searchHistory.value.filter(history => 
                    history.toLowerCase().includes(queryString.toLowerCase())
                )
                : searchHistory.value
            
            cb(results.map(item => ({ value: item })))
        }

        // 选择历史记录
        const handleSelect = (item: { value: string }) => {
            searchText.value = item.value
            onSearch()
        }

        // 删除历史记录
        const removeHistory = (value: string) => {
            const index = searchHistory.value.indexOf(value)
            if (index > -1) {
                searchHistory.value.splice(index, 1)
                localStorage.setItem(HISTORY_KEY, JSON.stringify(searchHistory.value))
            }
        }

        // 修改搜索方法
        const onSearch = () => {
            if (searchText.value.trim()) {
                saveSearchHistory(searchText.value)
            }
            store.setSearchText(searchText.value)
        }

        const onReset = () => {
            // 重置搜索文本
            searchText.value = ''
            
            // 重置筛选条件
            Object.keys(TUTOR_FILTERS).forEach(section => {
                Object.keys(TUTOR_FILTERS[section].children).forEach(key => {
                    selectedFilters[key] = []
                })
            })

            // 更新 store
            store.resetFilters()  // 这会重置 store 中的 searchText 和 activeFilters
            
            console.log('重置所有条件:', {
                searchText: searchText.value,
                filters: JSON.parse(JSON.stringify(selectedFilters))
            })
        }

        const onResetFilters = () => {
            // 只重置筛选条件，不重置搜索文本
            Object.keys(TUTOR_FILTERS).forEach(section => {
                Object.keys(TUTOR_FILTERS[section].children).forEach(key => {
                    selectedFilters[key] = []
                })
            })
            console.log('重置筛选条件:', selectedFilters)
            store.updateFilters(selectedFilters)
        }

        const onApplyFilters = () => {
            showDrawer.value = false
            console.log('应用筛选条件:', {
                section: '当前选中的所有筛选条件',
                filters: JSON.parse(JSON.stringify(selectedFilters))
            })
            
            // 打印每个分类的选中情况
            Object.keys(TUTOR_FILTERS).forEach(section => {
                const sectionFilters: Record<string, string[]> = {}
                Object.keys(TUTOR_FILTERS[section].children).forEach(key => {
                    const filterValue = selectedFilters[key]
                    if (filterValue && filterValue.length > 0) {
                        sectionFilters[key] = filterValue
                    }
                })
                if (Object.keys(sectionFilters).length > 0) {
                    console.log(`${TUTOR_FILTERS[section].label}筛选:`, sectionFilters)
                }
            })

            // 只在点击确定时更新 store
            store.updateFilters(JSON.parse(JSON.stringify(selectedFilters)))
        }

        // 监听抽屉显示状态
        watch(showDrawer, (newVal) => {
            console.log('筛选抽屉状态:', newVal ? '打开' : '关闭')
            if (newVal) {
                // 打开抽屉时，从 store 同步状态到本地
                const storeFilters = store.activeFilters
                Object.keys(TUTOR_FILTERS).forEach(section => {
                    Object.keys(TUTOR_FILTERS[section].children).forEach(key => {
                        selectedFilters[key] = [...(storeFilters[key] || [])]
                    })
                })
                console.log('打开时的筛选条件:', JSON.parse(JSON.stringify(selectedFilters)))
            }
        })

        return {
            searchText,
            searchHistory,
            showDrawer,
            selectedFilters,
            TUTOR_FILTERS,
            querySearchHistory,
            handleSelect,
            removeHistory,
            onSearch,
            onReset,
            onResetFilters,
            onApplyFilters
        }
    }
})
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>