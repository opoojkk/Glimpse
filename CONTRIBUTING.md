# 贡献指南

欢迎参与 Glimpse 项目的开发。

## 开始之前

1. Fork 本仓库
2. 克隆到本地：
   ```bash
   git clone https://github.com/your-username/Glimpse.git
   cd Glimpse
   ```

3. 创建特性分支：
   ```bash
   git checkout -b feature-name
   ```

## 开发流程

### 本地测试

1. 打开浏览器扩展页面
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`

2. 开启"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择项目文件夹

### 主要文件

- `content.js` - 核心功能实现
- `styles.css` - 样式定义
- `manifest.json` - 扩展配置

### 提交更改

```bash
git add .
git commit -m "描述你的更改"
git push origin feature-name
```

然后在 GitHub 上创建 Pull Request。

## 代码规范

### JavaScript
- 使用 ES6+ 语法
- 变量命名清晰易懂
- 复杂逻辑添加注释
- 保持函数简洁

### 提交信息

建议使用清晰的提交信息，例如：

```
feat: 添加 JPEG 导出功能
fix: 修复代码块渲染问题
docs: 更新安装说明
```

参考 [Conventional Commits](https://www.conventionalcommits.org/) 规范更佳。

## Bug 报告

提交 Issue 前建议先搜索是否有类似问题。

### 应包含信息

- 浏览器版本
- 使用平台（ChatGPT/Claude）
- 复现步骤
- 控制台错误（F12）
- 截图（如有）

## 功能建议

描述功能需求和使用场景，说明预期效果。

## 测试要求

提交 PR 前请确保：
- 在 ChatGPT 和 Claude 上测试通过
- 控制台无错误
- 不影响现有功能

## 社区准则

- 保持友善和尊重
- 欢迎新手参与
- 鼓励建设性讨论

感谢你的贡献。
