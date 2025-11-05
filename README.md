# Glimpse

一个浏览器插件，帮你把 ChatGPT 和 Claude 的对话生成好看的分享图片。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 这是什么？

最近经常用 ChatGPT 和 Claude，有时候想把一些有用的回答分享给朋友或者保存下来，但直接截图的话格式不太好看，代码块也不美观。所以就写了这个插件。

主要功能就是在 AI 回答下面加个分享按钮，点一下就能生成图片。图片会自动识别是 ChatGPT 还是 Claude，显示对应的 logo 和对话主题，代码块也用了 Material Design 的样式，看起来会比直接截图舒服一些。

## 适合什么场景？

想了想大概这几种情况会用到：

- 学习的时候把 AI 的解答保存下来做笔记
- 在技术群里分享一些有用的回答
- 发朋友圈或者微博的时候配图
- 写文章需要引用 AI 对话
- 工作汇报的时候展示用 AI 辅助的思路
- 纯粹觉得某个回答很有意思想收藏

## 主要功能

**界面和样式**
- 代码块用的 Material Design 风格，有蓝色的左边框，看着比较舒服
- 会自动识别你是在 ChatGPT 还是 Claude，显示对应的 logo
- 对话标题也会自动提取显示
- 文字、标题、列表的间距都调整过，看起来不会太挤

**预览和下载**
- 生成图片后会先弹出预览窗口让你看一眼
- 觉得 OK 再点下载按钮，不满意可以点背景或按 ESC 关闭
- 超长的对话可以滚动查看，不会被压缩
- 图片是 2 倍分辨率的，比较清晰

**支持的平台**
- ChatGPT (chat.openai.com 和 chatgpt.com 都行)
- Claude (claude.ai)
- 后面可能会加其他平台

**其他**
- 完全在本地浏览器处理，不会上传你的对话内容
- 鼠标悬停在回答上就会显示分享按钮

## 怎么安装？

Chrome / Edge / Brave 都可以用：

1. **下载代码**

   克隆仓库：
   ```bash
   git clone https://github.com/opoojkk/Glimpse.git
   cd Glimpse
   ```

   或者直接下载 ZIP 文件：
   - 打开 https://github.com/opoojkk/Glimpse
   - 点绿色的 "Code" 按钮
   - 选 "Download ZIP"
   - 下载后解压

2. **装到浏览器**
   - Chrome 打开 `chrome://extensions/`
   - Edge 打开 `edge://extensions/`
   - Brave 打开 `brave://extensions/`

   把右上角的"开发者模式"打开，点"加载已解压的扩展程序"，选择刚才解压的文件夹就行了。

Firefox 的话要改 manifest.json 里面的版本号，或者用开发者版本。暂时没测试过 Firefox，可能会有问题。

## 怎么用？

很简单：

1. 打开 ChatGPT 或者 Claude，正常和 AI 聊天
2. 看到喜欢的回答，把鼠标移上去
3. 下面会出现一个"分享为图片"按钮，点一下
4. 等几秒钟，会弹出预览窗口
5. 看一眼觉得没问题就点"下载图片"，不喜欢就点旁边或者按 ESC 关掉
6. 图片会保存到你浏览器的下载文件夹

就这么简单。图片会包含平台的 logo、对话主题，代码块也会美化一下。

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

## 技术细节

用的是原生 JavaScript，不依赖框架。主要用了两个库：
- marked.js 来解析 Markdown
- html2canvas 来生成图片

代码结构很简单：
- `manifest.json` - 扩展配置
- `content.js` - 主要逻辑（检测平台、添加按钮、生成图片等）
- `styles.css` - 样式
- `libs/` - 第三方库

## 后续计划

现在功能比较基础，后面想加这些：

**样式方面**（v1.1）
- 多种主题可以选（现在只有一种）
- 能自己调字体大小、配色
- 可以加水印
- 针对微博、Twitter 这些优化尺寸

**选择对话**（v1.2）
- 现在只能选单条回答，后面想支持多选
- 可以把整个对话串都导出
- 能编辑一下，比如删掉不想要的部分

**导出格式**（v1.3）
- 现在只有 PNG，想支持 JPEG、WebP、PDF 这些
- 也可以导出成 Markdown 或者纯文本
- 能直接复制到剪贴板就更方便了

**其他想法**（v2.0）
- 加个快捷键会更快
- 做个历史记录功能
- 收藏常用的回答
- 也许可以做个多语言界面

这些都是想法，具体什么时候做看时间和精力吧。如果你有好的建议或者想帮忙实现某个功能，随时欢迎。

## 想改代码？

欢迎！流程大概是这样：

1. Fork 这个项目
2. 改你想改的
3. 在浏览器里重新加载插件测试一下
4. 没问题就提个 Pull Request

代码不复杂，主要就三个文件：
- `content.js` - 核心逻辑都在这
- `styles.css` - 样式
- `manifest.json` - 配置

建议改完在 ChatGPT 和 Claude 都测试一下，确保两边都能用。

## 遇到问题？

如果遇到 bug 或者有什么建议，可以：

- 在 [Issues](https://github.com/opoojkk/Glimpse/issues) 里提，说清楚问题就行
- 或者直接提 PR 修复

提 bug 的时候最好能说明：
- 用的什么浏览器
- 在哪个平台（ChatGPT 还是 Claude）
- 具体什么情况下出现的
- 控制台有没有报错（F12 打开看看）

提功能建议的话，说说为什么需要这个功能，怎么用会比较好。

## 一些说明

**关于隐私**

所有处理都在你的浏览器本地完成，不会上传任何对话内容到服务器。代码是开源的，可以自己看看。

**使用限制**

- 目前只在桌面浏览器测试过（Chrome、Edge、Brave）
- 很长的对话生成图片可能要等几秒
- 需要在 ChatGPT 或 Claude 官网用，API 模式不行

**已知问题**

- 有些新的 CSS 颜色格式（oklch）可能会导致生成失败，已经尽量修复了
- 对话里有很多图片的话会比较慢
- 某些其他扩展可能会冲突，遇到问题可以试试关掉其他插件

## 许可证

MIT License - 简单说就是随便用，改了也可以，但要保留原作者信息。

## 感谢

- [marked.js](https://marked.js.org/) - Markdown 解析
- [html2canvas](https://html2canvas.hertzen.com/) - 生成图片
- 还有所有提 issue 和 star 的朋友

---

项目地址：https://github.com/opoojkk/Glimpse

觉得有用的话可以给个 Star ⭐
