# chrome-extension-boilerplate

## 基于 React18，TypeScript，Vite，NextUI 的 Manifest Version 3 的谷歌浏览器插件开发木板

[English](https://github.com/newObjectccc/chrome-extension-boilerplate) | 简体中文

## 功能

- ✨ 通过监控你的src目录下的代码触发编译更新dist代码
- 💥 基于Vite@5.1
- 💫 使用NextUI@2.2
- 🧨 使用Manifest V3.
- 💖 使用TypeScript
- 💥 基于Vite@5.1

## 使用说明

1. ```git clone git@github.com:newObjectccc/chrome-extension-boilerplate.git```
2. ```pnpm install```
3. ```pnpm dev```

> [!important]
> 请注意！模板会自动加载你的extension. 当代码更新后，dist代码虽然重新编译了，但是在chrome://extensions界面仍然需要手动刷新插件。

**构建时会根据`src/manifest.js`去生成对应的`manifest.json`，你可以在`vite.config.ts`里看到会动态生成`content_script`，如有需要可以自行配置。**

> [!warning]
> 建议把对应的资源写在对应的目录下。

整个项目结构

```js
src
├── background 
├── content 
├── popup 
├── sidepanel 
└── manifest.js 扩展程序清单
```

打包后

```js
dist
├── background 对应插件主线程
├── content 对应插件内容脚本
├── popup 对应插件弹出页面
├── sidepanel 对应插件sidepanel
└── manifest.json 由manifest生成而来
```

## 参考文档

[Chrome开发文档](https://developer.chrome.com/docs?hl=zh-cn)
