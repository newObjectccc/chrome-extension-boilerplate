# chrome-extension-boilerplate

## 基于 React18，TypeScript，Vite，NextUI 的 Manifest Version 3 的谷歌浏览器插件开发木板

[English](https://github.com/newObjectccc/chrome-extension-boilerplate) | 简体中文

## 功能

- ✨ 通过监控你的src目录下的代码触发编译更新dist代码
- 💥 基于Vite@5.1
- 💫 使用NextUI@2.2
- 🧨 使用Manifest V3.
- 💖 使用TypeScript

## 使用说明

1. ```git clone git@github.com:newObjectccc/chrome-extension-boilerplate.git```
2. ```pnpm install```
3. ```pnpm start```

当chrome浏览器打开之后，在地址栏输入chrome://extensions后回车，然后加载未压缩，选择dist目录即可。

请注意！当代码更新后，dist代码虽然重新编译了，但是在chrome://extensions界面仍然需要手动刷新插件。

## TODO

vite v5.1.4 building for production...

✓ 33 modules transformed.

dist/index.html                   0.38 kB │ gzip:  0.25 kB

dist/assets/react-CHdo91hT.svg    4.13 kB │ gzip:  2.05 kB

dist/assets/index-DiwrgTda.css    1.39 kB │ gzip:  0.72 kB

dist/assets/index-C7lZPRrh.js   142.63 kB │ gzip: 45.83 kB

thanks to React framework, the js bundle has 142kb at least. i think its too big, so i considering to change to an other lightly framework.

## 参考文档

[Chrome开发文档](https://developer.chrome.com/docs?hl=zh-cn)
