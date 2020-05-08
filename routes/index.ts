const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/", (req, res) => {
    dbHelpers.getUserWithEmail("alice@hotmail.com").then(data => res.send(data))
  })

  router.post("/register", (req, res) => {
    const user = req.body
    dbHelpers.addUser(user).then(data => console.log(data))
  })

  router.post("/login", (req, res) => {
    const { username, password } = req.body
    dbHelpers.checkForUser(username).then(user => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
              const id = user.id
              const email = user.email
              res.json({token , username, email, id })
            })
        } else {
          res.status(400).send("Wrong Password")
        }
      } else {
        res.status(400).send("User Not Found")
      }
    })
    .catch(e => console.error(e))
  })

  return router
}
