// Game
// Copyright Rafi Khan
const gameloop = require('node-gameloop')
const FRAMES_PER_SECOND = 10

var Player = require('./player.js')

class Game {
  constructor (opts) {
    console.log('Game started')

    this.server = opts.server.emitter
    this.players = {}
  }

  init () {
    this.server.on('connect', (data) => {
      this.newPlayer(data)
    })

    this.server.on('disconnect', (data) => {
      this.disconnectPlayer(data)
    })

    this.server.on('left', (id) => {
      this.players[id].setVelocityX(-1)
    })

    this.server.on('right', (data) => {
      console.log(data)
      debugger;
      this.players[data.id].setVelocityX(1)
    })

    this.server.on('up', (id) => {
      this.players[id].setVelocityY(1)
    })

    this.server.on('down', (id) => {
      this.players[id].setVelocityY(-1)
    })

    this.id = gameloop.setGameLoop((delta) => {
      this.loop(delta)
    }, 1000 / FRAMES_PER_SECOND)
  }

  log (msg) {
    msg = `Game > ${msg}`
    console.log(msg)
    return msg
  }

  disconnectPlayer (data) {
    delete this.players[data.client.id]

    this.log('Player disconnected : ' + data.client.id)
  }

  newPlayer (wrapper) {
    var newPlayer = new Player(wrapper)
    this.players[newPlayer.id] = newPlayer

    wrapper.emit('registered', newPlayer.getPlayerInfo())
    this.log('Player connected: ' + newPlayer.id)

    this.sendToAll('newPlayer', newPlayer.getPlayerInfo(), newPlayer.id)
  }

  sendToAll (msg, data, except) {
    for (var id in this.players) {
      if (this.players[id] !== except) {
        this.players[id].emit(msg, data)
      }
    }
  }
  updateAllClients () {
    var send = []

    for (var id in this.players) {
      send.push(this.players[id].getPlayerInfo())
    }
    this.sendToAll('update', send)
  }

  loop (delta) {
    for (var id in this.players) {
      this.players[id].update(delta)
    }

    this.updateAllClients()
  }
}

module.exports = Game
