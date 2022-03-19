/** @format */

import Star from './Star'
export default class Application {
  constructor() {
    this.canvas = null // 画布
    this.ctx = null // 环境
    this.w = 0 // 画布宽
    this.h = 0 // 画布高
    this.starList = [] // 星星列表
    this.starColors = [
      [246, 241, 82],
      [216, 124, 156],
    ] // 星星颜色rgb
    this.init()
  }
  init() {
    // 初始化
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    window.addEventListener('resize', this.reset.bind(this))
    window.addEventListener('mousemove', this._mouseMove.bind(this), this)
    window.addEventListener('touchmove', this._mouseMove.bind(this), this)
    this.reset()
    this.render()
  }
  reset() {
    // 窗口改变
    this.w = this.canvas.width = this.ctx.width = window.innerWidth
    this.h = this.canvas.height = this.ctx.height = window.innerHeight
  }
  _mouseMove(e) {
    // if (e.changedTouches!==undefined){//如果是触屏
    //   let x = e.changedTouches[0]&&e.changedTouches[0].clientX;
    //   let y = e.changedTouches[0]&&e.changedTouches[0].clientY;
    //   this.drawStars(x, y)
    //   return
    // }
    let x = e.offsetX
    let y = e.offsetY
    this.drawStars(x, y)
  }
  render() {
    // 主逻辑
    this.step()
  }
  drawStars(x, y) {
    for (let i = 0; i < 5; i++) {
      let vx = Math.random() * 2 - 1
      let vy = Math.random() * 2 - 1
      const { ctx, starColors } = this
      this.starList.push(
        new Star({
          x,
          y,
          vx,
          vy,
          va: Math.random() * 0.01 - 0.02,
          scale: Math.random() * 0.5 + 0.5,
          color: starColors[~~(Math.random() * starColors.length)],
        }).render(ctx)
      )
    }
  }
  step(delta) {
    const { ctx, w, h } = this
    requestAnimationFrame(this.step.bind(this))
    ctx.clearRect(0, 0, w, h)
    this.starList.forEach((star, index) => {
      star.draw()
      if (!star.active) {
        this.starList.splice(index, 1)
      }
    })
  }
}
