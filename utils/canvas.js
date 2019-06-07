export default {
  data: {
    curPercentage: '', //当前百分比进度
    animTime: '', // 动画执行时间
    showCanvas: true, //画布的显示与隐藏
    anticlockwise: 0 //递减动画结束时的画布隐藏间隔时间
  },
  options: {
    // 绘制圆形进度条方法
    run(c, w, h) {
      let that = this;
      //2*Π是因为一个圆是由两个扇形组成
      //100为百分比的总比例
      //c为当前百分比
      //0.5为 公式 l=n°πr÷180°
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
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
    canvasClockwise(start, end, time, w, h) {
      start++;
      this.setData({
        curPercentage: start - 1
      })
      if (start > end) {
        return false;
      }
      this.run(start, w, h);
      setTimeout(() => {
        this.canvasClockwise(start, end, time, w, h);
      }, time);
    },
    anticlockwise(start, time, w, h, endTime) {
      start--;
      this.setData({
        curPercentage: start
      })
      if (start < 1) {
        setTimeout(() => {
          this.setData({
            showCanvas: false
          })
        }, this.data.anticlockwise)
        return false
      }
      this.run(start, w, h);
      setTimeout(() => {
        this.anticlockwise(start, time, w, h);
      }, time);
    },
    /**
     * id----------------canvas画板id
     * percent-----------进度条百分比
     * time--------------画图动画执行的时间  
     */
    draw: function(id, percent, animTime, counterclockwise = false) {
      const ctx2 = wx.createCanvasContext(id);
      this.data['ctx2']=ctx2;
      this.data['percentage'] = percent;
      this.data['animTime'] = animTime;
      
      var time = this.data.animTime / this.data.percentage;
       //监听canvas的宽高
      wx.createSelectorQuery().select('#' + id).boundingClientRect(function(rect) {
        var w = parseInt(rect.width / 2);
        var h = parseInt(rect.height / 2);
        if (counterclockwise === false) {
          this.canvasClockwise(0, this.data.percentage, time, w, h)
        } else {
          this.anticlockwise(this.data.percentage + 1, time, w, h)
        }
      }.bind(this)).exec();
    }
  }
}