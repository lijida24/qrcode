# QRcode 二维码生成器

## version
* 0.1.0

## 下载

* npm: ```npm install --save l-qrcode```

## 引用

* es2015: `import qrcode from 'l-qrcode'`
* commonJs:  `var qrcode = require('l-qrcode');`
* amd: `define(["./js/qrcode.min.js"], function(qrcode){})`
* window.qrcode: `<script src="./js/qrcode.min.js"></script>`

## 方法

```javascript
new qrcode($ele, options)
```

## 参数

* $ele - 为二维码外层所要包裹的对象
* options - 配置参数 {String} 对应的文字；{Object} 对应如下

```
{
  text: '', // 对应的文字
  render: 'canvas', // 渲染方式 默认canvas，浏览器不兼容降为table形式
  width: 256, // 二维码 宽度 默认 256
  height: 256, // 二维码 高度 默认 256
  correctLevel: 2 // 容错率 默认为高
  background: '#ffffff', // 背景色 默认白色
  foreground: '#000000' // 前景色 默认黑色
}
```

## 容错率

| 概念 | 数值 | 容错率 |
| --- | --- | --- |
| L (Low) | 1 | ~7% |
| M (Medium) | 0 | ~15% |
| Q (Quartile) | 3 | ~25% |
| H (High) | 2 | ~30% |
