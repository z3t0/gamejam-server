const color = require('random-hex')

class Player {
    constructor (opts) {
    this.emit = opts.emit

    this.id = opts.id
    this.x = 0
    this.y = 0

    this.sizeX = 0.05
    this.sizeY = 0.05

    this.vx = 0
    this.vy = 1

    this.speed = 30
    var c = color.generate()
    c = c.substring(1, c.length)
    this.color = parseInt(c, 16)
  }

  send(msg, data) {
    this.emit(msg, data)
  }

  getPlayerInfo () {
    var info = {}

    info.id = this.id

    info.x = this.x
    info.y = this.y

    info.sizeX = this.sizeX
    info.sizeY = this.sizeY

    info.vx = this.vx
    info.vy = this.vy

    info.speed = this.speed
    info.color = this.color

    return info
  }

  update (deltaTime) {
    this.x += this.vx * this.speed * deltaTime
    this.y += this.vy * this.speed * deltaTime
  }
  setVelocityY (vy) {
    this.vy = vy
  }

  setVelocityX (vx) {
    this.vx = vx
  }
}

module.exports = Player
