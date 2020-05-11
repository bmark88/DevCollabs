const router = require("express").Router()

module.exports = io => {
  const nsp = io.of("/room")
  nsp.on("connect", socket => {
    console.log("someone connected")
    socket.on("initial", data => {
      console.log(data)
    })
  })

  return router
}
