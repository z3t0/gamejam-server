const color = require('random-hex')

class Player {
  constructor (opts) {
    this.emit = opts.emit

    this.id = opts.id
    this.x = 200
    this.y = 200

    this.sizeX = 0.5
    this.sizeY = 0.5

    this.heading = 0

    this.speed = 30
    this.turnSpeed = 0.5

    this.keys = {}
    this.keys.left = false
    this.keys.right = false
    this.keys.up = false
    this.keys.down = false

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
    info.color = this.color

    info.x = this.x
    info.y = this.y
    info.heading = this.heading

    info.sizeX = this.sizeX
    info.sizeY = this.sizeY

    info.speed = this.speed
    info.turnSpeed = this.turnSpeed
    info.keys = this.keys

    return info
  }

  update (deltaTime) {
    
  }

  setVelocityY (vy) {
  }

  setVelocityX (vx) {
  }
}

module.exports = Player
