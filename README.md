# Glimpse

一个浏览器扩展，用于将 ChatGPT 和 Claude 的对话生成精美的分享图片。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 项目简介

在使用 ChatGPT 和 Claude 时，常常遇到需要保存或分享对话内容的场景。传统的截图方式存在格式不美观、代码块显示不佳等问题，因此开发了这个插件。

插件会在 AI 回答下方添加分享按钮，点击后生成图片。图片会自动识别平台（ChatGPT/Claude），显示对应的 logo 和对话主题，代码块采用 Material Design 风格渲染。

## 使用场景

- 保存 AI 解答作为学习笔记
- 在技术社区分享解决方案
- 为文章或博客添加配图
- 工作汇报中展示 AI 辅助的思路
- 收藏有价值的对话内容

## 主要功能

### 界面设计
- Material Design 风格的代码块，带蓝色左边框
- 自动识别平台并显示对应 logo（ChatGPT/Claude）
- 自动提取并显示对话标题
- 优化的文字、标题、列表间距

### 预览与导出
- 生成后先显示预览窗口
- 支持点击背景或按 ESC 关闭预览
- 超长对话支持滚动查看
- 2x 高分辨率输出

### 平台支持
- ChatGPT (chat.openai.com, chatgpt.com)
- Claude (claude.ai)
- 更多平台支持计划中

### 隐私安全
- 完全本地处理，不上传任何数据
- 悬停显示分享按钮

## 安装方法

支持 Chrome、Edge、Brave 等 Chromium 内核浏览器。

### 步骤

1. **获取代码**

   克隆仓库：
   ```bash
   git clone https://github.com/opoojkk/Glimpse.git
   cd Glimpse
   ```

   或下载 ZIP：
   - 访问 https://github.com/opoojkk/Glimpse
   - 点击 "Code" 按钮
   - 选择 "Download ZIP"
   - 解压到本地

2. **加载扩展**
   - Chrome: 打开 `chrome://extensions/`
   - Edge: 打开 `edge://extensions/`
   - Brave: 打开 `brave://extensions/`

   开启"开发者模式"，点击"加载已解压的扩展程序"，选择项目文件夹。

### 注意

Firefox 需要修改 `manifest.json` 中的 `manifest_version` 为 2，或使用 Firefox Developer Edition。目前未在 Firefox 上充分测试。

## 使用方法

1. 打开 ChatGPT 或 Claude，正常对话
2. 将鼠标悬停在 AI 回答上
3. 点击显示的"分享为图片"按钮
4. 等待几秒，预览窗口弹出
5. 确认无误后点击"下载图片"，或按 ESC/点击背景取消
6. 图片将保存至浏览器默认下载目录

生成的图片包含平台 logo、对话主题以及格式化的代码块。

## 技术栈

- 原生 JavaScript（无框架依赖）
- [marked.js](https://marked.js.org/) - Markdown 解析
- [html2canvas](https://html2canvas.hertzen.com/) - 图片生成

### 项目结构

```
Glimpse/
├── manifest.json       # 扩展配置
├── content.js         # 核心逻辑
├── styles.css         # 样式定义
└── libs/              # 第三方库
```

## 开发计划

### 近期功能

1. **多种图片样式**
   - 提供多个主题模板可选
   - 自定义颜色、字体、布局
   - 针对不同社交平台优化尺寸

2. **多个对话**
   - 支持选择多条回答生成一张图
   - 包含用户问题和 AI 回答
   - 可编辑和重新排序对话内容

3. **多种图片格式**
   - 导出为 PNG、JPEG、WebP 等格式
   - 支持 PDF 文档导出
   - 复制到剪贴板功能

欢迎在 [Issues](https://github.com/opoojkk/Glimpse/issues) 提出建议或参与开发。

## 参与开发

欢迎贡献代码或提出建议。

### 开发流程

1. Fork 本项目
2. 创建特性分支
3. 在浏览器中重新加载扩展进行测试
4. 提交 Pull Request

### 测试要求

- 在 ChatGPT 和 Claude 两个平台上验证功能
- 确保控制台无错误
- 不影响现有功能

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 问题反馈

提交 Issue 时请包含：
- 浏览器版本
- 使用平台（ChatGPT/Claude）
- 复现步骤
- 控制台错误信息（F12）

功能建议请说明使用场景和预期效果。

## 注意事项

### 隐私
所有处理在浏览器本地完成，不会上传任何对话数据。代码开源，可自行审查。

### 限制
- 目前仅在桌面浏览器（Chrome、Edge、Brave）上测试
- 长对话生成时间可能需要 5-10 秒
- 需要在官网使用，不支持 API 模式

### 已知问题
- 部分 CSS 颜色格式（如 oklch）可能导致渲染失败，已做兼容处理
- 包含大量图片的对话生成较慢
- 可能与某些浏览器扩展冲突

## 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE)。

## 致谢

- [marked.js](https://marked.js.org/)
- [html2canvas](https://html2canvas.hertzen.com/)
- 所有贡献者

---

**项目地址**: https://github.com/opoojkk/Glimpse

如果觉得有用，欢迎 Star ⭐
