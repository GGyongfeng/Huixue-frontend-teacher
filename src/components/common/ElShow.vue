<template>
  <div class="el-show">
    <!-- 基础表单 -->
    <el-card class="section">
      <template #header>
        <div class="card-header">
          <span>基础表单</span>
        </div>
      </template>
      <el-form :model="form" label-width="120px">
        <el-form-item label="输入框">
          <el-input v-model="form.input" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="选择器">
          <el-select v-model="form.select" placeholder="请选择">
            <el-option label="选项1" value="1" />
            <el-option label="选项2" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="开关">
          <el-switch v-model="form.switch" />
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 数据展示 -->
    <el-card class="section">
      <template #header>
        <div class="card-header">
          <span>数据展示</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 反馈组件 -->
    <el-card class="section">
      <template #header>
        <div class="card-header">
          <span>反馈组件</span>
        </div>
      </template>
      <div class="button-group">
        <el-button @click="showMessage">消息提示</el-button>
        <el-button type="primary" @click="showDialog">打开对话框</el-button>
        <el-button type="warning" @click="showNotification">通知</el-button>
      </div>
    </el-card>

    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" title="对话框" width="30%">
      <span>这是一个对话框的内容</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'

export default defineComponent({
  name: 'ElShow',
  setup() {
    // 表单数据
    const form = reactive({
      input: '',
      select: '',
      switch: false
    })

    // 表格数据
    const tableData = ref([
      { date: '2024-01-01', name: '张三' },
      { date: '2024-01-02', name: '李四' }
    ])

    // 对话框控制
    const dialogVisible = ref(false)

    // 方法
    const handleEdit = (row: any) => {
      ElMessage.success(`编辑: ${row.name}`)
    }

    const handleDelete = (row: any) => {
      ElMessage.warning(`删除: ${row.name}`)
    }

    const showMessage = () => {
      ElMessage({
        message: '这是一条消息提示',
        type: 'success'
      })
    }

    const showDialog = () => {
      dialogVisible.value = true
    }

    const showNotification = () => {
      ElNotification({
        title: '通知',
        message: '这是一条通知消息',
        type: 'warning'
      })
    }

    return {
      form,
      tableData,
      dialogVisible,
      handleEdit,
      handleDelete,
      showMessage,
      showDialog,
      showNotification
    }
  }
})
</script>

<style lang="scss" scoped>
.el-show {
  .section {
    margin-bottom: 20px;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button-group {
    display: flex;
    gap: 10px;
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style> 