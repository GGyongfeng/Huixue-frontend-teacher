# 汇学家教-教师端

基于 Vue 3 + TypeScript + Vite 构建的家教教师端移动应用，订单展示。

## 技术栈

- Vue 3
- TypeScript
- Vite
- Pinia
- Vue Router
- Element Plus
- Axios
- SCSS

## 开发环境

- Node.js >= 16
- pnpm >= 8

## 项目结构

src 目录结构如下：
src/
├── api/ # API 接口
├── assets/ # 静态资源
├── components/ # 公共组件
├── constants/ # 常量定义
├── layouts/ # 布局组件
├── middleware/ # 中间件
├── router/ # 路由配置
├── store/ # 状态管理
├── styles/ # 全局样式
├── types/ # TypeScript 类型
└── views/ # 页面组件

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
# 预览生产构建
pnpm preview
```


## 环境变量

- `.env`: 默认环境变量
- `.env.development`: 开发环境变量
- `.env.production`: 生产环境变量

## 代码规范

- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 遵循 Vue 3 组合式 API 风格指南

## 部署

1. 执行构建命令：`pnpm build`
2. 将 `dist` 目录下的文件部署到服务器
3. 确保服务器配置了正确的基础路径：`/teacher/`

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 作者信息

- 作者：古永丰
- 联系方式：15369998659
- GitHub：[https://github.com/GGyongfeng](https://github.com/guyongfeng)
- 📮邮箱：yonggenggu@tju.edu.cn

## 许可证

版权所有 © 2024 古永丰

本项目采用非商业许可证。未经授权，禁止将本项目用于商业目的。保留所有权利。

1. 允许：
   - 个人学习和研究使用
   - 修改源代码
   - 分享源代码

2. 禁止：
   - 商业用途
   - 销售本项目或其衍生作品
   - 在未经授权的情况下分发本项目

3. 要求：
   - 保留原作者信息
   - 说明修改内容
   - 使用相同的许可证