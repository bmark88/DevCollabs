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
  
  router.get("/group/:id", (req, res) => {
    dbHelpers.getGroup(req.params.id).then(data => res.send(data))
  })

  router.post("/group/:name", (req, res) => {
    dbHelpers.addGroup(req.params.name).then(data => console.log(data))
  })

  return router
}
