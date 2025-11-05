# AI Response Share - AI 回答分享插件

一个浏览器扩展插件，可以在 ChatGPT 和 Claude 中将 AI 的回答按照 Markdown 格式解析并生成精美的分享图片。

## ✨ 功能特点

- 🎨 **精美排版**：自动解析 Markdown 格式，生成美观的分享图片
- 🔄 **多平台支持**：同时支持 ChatGPT 和 Claude AI
- 📱 **一键分享**：点击分享按钮即可生成并下载图片
- 🌙 **深色模式**：自动适配深色主题
- ⚡ **轻量高效**：纯前端实现，无需后端服务

## 📦 安装方法

### Chrome / Edge / Brave 浏览器

1. 下载或克隆此仓库到本地：
   ```bash
   git clone https://github.com/your-username/Glimpse.git
   cd Glimpse
   ```

2. 打开浏览器扩展管理页面：
   - Chrome: 访问 `chrome://extensions/`
   - Edge: 访问 `edge://extensions/`
   - Brave: 访问 `brave://extensions/`

3. 开启"开发者模式"（右上角开关）

4. 点击"加载已解压的扩展程序"

5. 选择本项目的根目录（包含 `manifest.json` 的文件夹）

6. 安装完成！

### Firefox 浏览器

Firefox 需要将 `manifest.json` 中的 `manifest_version` 改为 2，或使用 Firefox Developer Edition 测试 Manifest V3。

## 🚀 使用方法

1. 访问 ChatGPT (https://chat.openai.com 或 https://chatgpt.com) 或 Claude (https://claude.ai)

2. 与 AI 进行对话

3. 将鼠标悬停在 AI 的回答上，会在回答下方显示"分享为图片"按钮

4. 点击按钮，插件会自动生成并下载分享图片

5. 生成的图片会自动保存到浏览器的默认下载目录

## 📁 项目结构

```
Glimpse/
├── manifest.json          # 扩展配置文件
├── content.js            # 主要功能脚本
├── styles.css            # 样式文件
├── libs/                 # 第三方库
│   ├── marked.min.js     # Markdown 解析库
│   └── html2canvas.min.js # HTML 转图片库
├── icons/                # 图标文件
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # 说明文档
```

## 🛠️ 技术栈

- **Markdown 解析**: [marked.js](https://marked.js.org/) - 快速的 Markdown 解析器
- **图片生成**: [html2canvas](https://html2canvas.hertzen.com/) - 将 HTML 转换为 Canvas
- **原生 JavaScript**: 无需其他框架依赖

## 🎯 支持的平台

- ✅ ChatGPT (chat.openai.com, chatgpt.com)
- ✅ Claude AI (claude.ai)

## 🔧 开发

如果你想修改或扩展插件功能：

1. 克隆仓库
2. 修改相关文件
3. 在浏览器扩展页面点击"重新加载"图标
4. 刷新 ChatGPT 或 Claude 页面查看效果

### 主要文件说明

- **manifest.json**: 定义扩展的基本信息和权限
- **content.js**: 核心功能实现，包括：
  - 检测当前平台（ChatGPT/Claude）
  - 创建分享按钮
  - 生成分享图片
  - 处理 Markdown 内容
- **styles.css**: 分享按钮和提示框的样式

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [marked.js](https://marked.js.org/) - Markdown 解析
- [html2canvas](https://html2canvas.hertzen.com/) - HTML 截图
- 感谢所有贡献者

## ⚠️ 注意事项

- 本插件仅在客户端运行，不会收集或上传任何数据
- 生成的图片质量取决于回答的内容和长度
- 对于特别长的回答，生成图片可能需要几秒钟
- 目前仅支持桌面端浏览器

## 📞 反馈

如有问题或建议，欢迎通过以下方式反馈：
- 提交 GitHub Issue
- 发送邮件至项目维护者

---

Made with ❤️ for the AI community
