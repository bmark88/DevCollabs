const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db);

  router.get("/", (req, res) => {
      dbHelpers.getUserWithEmail("alice@hotmail.com").then((data)=> res.send(data))
  })
  return router;
}
