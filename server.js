var http = require('http')
var socket = require('socket.io')
var EventEmitter = require('eventemitter3')

function Server (opts) {
  this.http = http.createServer()
  this.io = socket(this.http)

  this.emitter = new EventEmitter()

  this.port = opts.port

  this.io.on('connection', (client) => {
    var wrapper = {}

    wrapper.emit = (msg, data) => {
      client.emit(msg, data)
    }

    wrapper.id = client.id

    this.emitter.emit('connect', wrapper)

    client.on('left', () => {
      this.emitter.emit('left', client.id)
    })

    client.on('right', () => {
      this.emitter.emit('right', client.id)
    })

    client.on('up', () => {
      this.emitter.emit('up', client.id)
    })

    client.on('down', () => {
      this.emitter.emit('down', client.id)
    })

    client.on('disconnect', () => {
      this.emitter.emit('disconnect', client)
    })
  })

  this.http.listen(this.port)
}

module.exports = Server
