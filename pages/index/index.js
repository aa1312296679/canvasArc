//index.js
import Canvas from '../../utils/canvas.js'
//获取应用实例
const app = getApp()

Page({
  ...Canvas.options,
  data: {
    ...Canvas.data
  },
  onReady: function () {
    // 获得circle组件
    this.draw('runCanvas', 1, 1000);
  }
})
