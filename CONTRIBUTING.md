# 贡献指南

想帮忙改进这个项目？太好了！

## 怎么开始

1. Fork 这个仓库
2. Clone 到本地：
   ```bash
   git clone https://github.com/your-username/Glimpse.git
   cd Glimpse
   ```

3. 创建一个新分支：
   ```bash
   git checkout -b my-feature
   ```

## 开发流程

**测试你的改动**

1. 打开 Chrome 的 `chrome://extensions/`
2. 开启"开发者模式"
3. "加载已解压的扩展程序"，选择项目文件夹
4. 在 ChatGPT 和 Claude 里都测试一下

**主要文件**
- `content.js` - 核心功能
- `styles.css` - 样式
- `manifest.json` - 配置

**提交代码**

```bash
git add .
git commit -m "简单描述你改了什么"
git push origin my-feature
```

然后去 GitHub 提个 Pull Request 就行。

## 代码规范

没有特别严格的要求，基本上：

- 用 ES6+ 的语法
- 变量名起得能看懂就行
- 复杂的地方加个注释
- 函数不要写得太长

**提交信息**

随意一点也没关系，能看懂改了啥就行。比如：

```
feat: 加了 JPEG 导出
fix: 修了某某bug
docs: 更新了 README
```

当然用 [Conventional Commits](https://www.conventionalcommits.org/) 格式更好，但不强求。

## 报告 Bug

提 issue 之前可以先搜一下有没有人提过类似的。

**最好包含这些信息：**
- 什么浏览器，什么版本
- 在 ChatGPT 还是 Claude
- 怎么复现这个问题
- 控制台有没有报错（F12 打开看）
- 截个图会更清楚

## 建议新功能

直接说你想要什么功能，为什么需要就行。能说说具体使用场景就更好了。

## 测试

提 PR 之前记得：
- ChatGPT 和 Claude 都测试一下
- 控制台没报错
- 不影响现有功能

## 其他

- 友善一点，大家都是来帮忙的
- 新手也欢迎，不懂就问
- 有问题直接在 Issues 里讨论

感谢！
