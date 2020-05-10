const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/", (req, res) => {
    dbHelpers.getUserWithEmail("alice@hotmail.com").then(data => res.send(data))
  })

  router.post("/register", (req, res) => {
    const user = req.body
    dbHelpers.addUser(user).then(data => console.log(data))
  })

  router.post("/settings", (req, res) => {
    const user = req.body
    console.log(user)
    dbHelpers.changeUserInfo(user)
      .then(data => console.log({data}))
  })

  router.get("/final", (req, res) => {
  })

  return router
} 