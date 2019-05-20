export default {
  data: {
    curPercentage: '',
    percentage: '', //百分比
    animTime: '', // 动画执行时间
  },
  options: {
    // 绘制圆形进度条方法
    run(c, w, h) {
      let that = this;
      //2*Π是因为一个圆是由两个扇形组成
      //100为百分比的总比例
      //c为当前百分比
      //-0.5为起始弧度1/2 因为圆是两个扇形组成 所以1/2
      var num = (2 * Math.PI / 100 * c) -0.5 * Math.PI;
      that.data.ctx2.arc(w, h, w - 8, -0.5 * Math.PI, num); //每个间隔绘制的弧度
      that.data.ctx2.setStrokeStyle("#ff5000");
      that.data.ctx2.setLineWidth("6");
      that.data.ctx2.setLineCap("butt");
      that.data.ctx2.stroke();
      that.data.ctx2.beginPath();
      that.data.ctx2.draw();
    },
    /** 动画效果实现
     * start 起始百分比
     * end 结束百分比
     * w,h 其实就是圆心横纵坐标
     */
    canvasTap(start, end, time, w, h) {
      start++;
      this.setData({
        curPercentage: start-1
      })
      if (start > end) {
        return false;
      }
      this.run(start, w, h);
      setTimeout(() => {
        this.canvasTap(start, end, time, w, h);
      }, time);
    },
    /**
     * id----------------canvas画板id
     * percent-----------进度条百分比
     * time--------------画图动画执行的时间  
     */
    draw: function(id, percent, animTime) {
      const ctx2 = wx.createCanvasContext(id);
      this.setData({
        ctx2: ctx2,
        percentage: percent,
        animTime: animTime
      });
      var time = this.data.animTime / this.data.percentage;
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function(rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2);
        console.log(w)
        var h = parseInt(rect.height / 2);
        this.canvasTap(0, this.data.percentage, time, w, h)
      }.bind(this)).exec();
    }
  }
}