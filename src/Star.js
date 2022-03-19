/** @format */

export default class Star {
  constructor(options) {
    this.x = 0 // x轴坐标
    this.y = 0 // y轴坐标
    this.vx = 0 // x轴速度
    this.vy = 0 // y轴速度
    this.r = 6 // 星星内环
    this.R = 12 // 星星外环
    this.color = [246, 241, 82] // 默认颜色
    this.scale = 1 // 缩放大小
    this.opacity = 1 // 透明度
    this.angle = 0 // 角度
    this.va = 0 // 角度增量
    Object.assign(this, options)
    this.active = true // 是否被激活
    return this
  }
  render(ctx) {
    // 主渲染
    if (!ctx) throw new Error('context is undefined.')
    this.ctx = ctx
    this.draw()
    return this
  }
  draw() {
    // 绘制
    const { color, scale, x, y, ctx, r, R, opacity, angle, va } = this
    ctx.save()
    ctx.translate(x, y)
    ctx.scale(scale, scale)
    ctx.rotate(angle)
    ctx.beginPath()
    // 绘制星星
    for (let i = 0; i < 5; i++) {
      ctx.lineTo(
        Math.cos(((18 + i * 72) / 180) * Math.PI) * R + R,
        -Math.sin(((18 + i * 72) / 180) * Math.PI) * R + R
      )
      ctx.lineTo(
        Math.cos(((54 + i * 72) / 180) * Math.PI) * r + R,
        -Math.sin(((54 + i * 72) / 180) * Math.PI) * r + R
      )
    }
    ctx.closePath()
    ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${opacity})`
    ctx.fill()
    ctx.restore()
    this.x += this.vx
    this.y += this.vy
    this.opacity -= 0.022
    this.angle += va
    if (this.opacity < 0) {
      this.active = false
    }
    return this
  }
}
