const color = require('random-hex')

class Player {
    constructor (opts) {
    this.emit = opts.emit

    this.id = opts.id
    this.x = 0
    this.y = 0

    this.sizeX = 0.05
    this.sizeY = 0.05

    this.speed = 30
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

    info.speed = this.speed

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
