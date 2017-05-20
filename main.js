const Game = require('./game.js')
const Server = require('./server.js')

const server = new Server({port: 3000})
const game = new Game({server: server})
game.init()
