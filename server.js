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

    client.on('left', (data) => {
      this.emitter.emit('left', data)
    })

    client.on('right', (data) => {
      this.emitter.emit('right', data)
    })

    client.on('up', (data) => {
      this.emitter.emit('up', data)
    })

    client.on('down', (data) => {
      this.emitter.emit('down', data)
    })

    client.on('disconnect', () => {
      this.emitter.emit('disconnect', client)
    })
  })

  this.http.listen(this.port)
}

module.exports = Server
