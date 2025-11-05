# 贡献指南

感谢你考虑为 Glimpse 做出贡献！我们欢迎所有形式的贡献。

## 🚀 快速开始

### 准备环境

1. Fork 本仓库
2. 克隆你的 Fork：
   ```bash
   git clone https://github.com/your-username/Glimpse.git
   cd Glimpse
   ```

3. 创建新分支：
   ```bash
   git checkout -b feature/your-feature-name
   ```

### 开发流程

1. **安装插件进行测试**
   - 打开 Chrome 浏览器
   - 访问 `chrome://extensions/`
   - 启用"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目目录

2. **修改代码**
   - `content.js` - 主要功能逻辑
   - `styles.css` - 样式定义
   - `manifest.json` - 扩展配置

3. **测试修改**
   - 在 ChatGPT 或 Claude 中测试功能
   - 打开浏览器控制台查看日志
   - 确保在两个平台都正常工作

4. **提交修改**
   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 前往 GitHub 仓库页面
   - 点击 "New Pull Request"
   - 填写 PR 描述
   - 等待审核

## 📝 代码规范

### JavaScript 规范
- 使用 ES6+ 语法
- 使用有意义的变量名
- 添加必要的注释
- 保持函数简洁（单一职责）

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**类型 (type):**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响功能）
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例:**
```
feat: 添加 JPEG 格式导出功能

- 实现 JPEG 格式转换
- 添加质量选项设置
- 更新文档说明

Closes #123
```

## 🐛 报告 Bug

在提交 Bug 前，请：
1. 搜索现有 Issues，避免重复
2. 确认问题可以稳定复现

**Bug 报告应包含:**
- 📝 问题描述
- 🔄 复现步骤
- 💻 环境信息（浏览器版本、操作系统）
- 📸 截图或错误信息
- 🔍 控制台日志（如有）

## 💡 提出新功能

功能建议应包含：
- 🎯 功能描述
- 💪 使用场景
- 🎨 预期效果
- 🔧 实现思路（可选）

## 🧪 测试

在提交 PR 前，请确保：
- ✅ 在 ChatGPT 中测试通过
- ✅ 在 Claude 中测试通过
- ✅ 控制台无错误信息
- ✅ 不影响现有功能

## 📂 项目结构

```
Glimpse/
├── manifest.json       # 扩展配置
├── content.js         # 内容脚本（核心逻辑）
├── styles.css         # 样式文件
├── libs/              # 第三方库
│   ├── marked.min.js
│   └── html2canvas.min.js
├── icons/             # 图标资源
└── docs/              # 文档
```

## 🎨 代码审查

PR 将会经过以下审查：
- 代码质量和风格
- 功能完整性
- 测试覆盖
- 文档更新
- 兼容性

## 🤝 社区准则

- 尊重所有贡献者
- 保持友善和专业
- 欢迎新手参与
- 鼓励建设性反馈

## 📞 获取帮助

如有疑问，可以：
- 💬 在 Issues 中提问
- 📧 联系维护者
- 📚 查看文档和示例

## 🙏 感谢

感谢每一位贡献者！你的参与让 Glimpse 变得更好。

---

再次感谢你的贡献！🎉
