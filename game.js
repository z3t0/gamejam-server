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
      console.log('player connected')
      this.newPlayer(data)
    })

    this.server.on('disconnect', (data) => {
      this.disconnectPlayer(data)
      console.log('player disconnected')
    })

    this.server.on('left', (id) => {
      console.log('left key pressed')
    })

    this.server.on('right', (data) => {
      console.log('right key pressed')
    })

    this.server.on('up', (id) => {
      console.log('up key pressed')
    })

    this.server.on('down', (id) => {
      console.log('down key pressed')
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

    this.sendToAll('update')
    // this.updateAllClients()
  }
}

module.exports = Game
