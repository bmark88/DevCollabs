const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/", (req, res) => {
    dbHelpers
      .getUserWithEmail("alice@hotmail.com")
      .then(data => res.send(data))
  })

  router.post("/register", (req, res) => {
    const firstName = req.body
    console.log('Got body:', firstName);
    res.send("ok")
  })
  return router
}
