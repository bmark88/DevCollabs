const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/:user_id", (req, res) => {
    const ratedUserId = req.params.user_id
    dbHelpers
      .getUserRating(ratedUserId)
      .then(data => res.send(data))
      .catch(e => res.status(400).send(e))
  })

  router.post("/:rated_id", (req, res) => {
    const ratedId = req.params.rated_id
    const { raterId, rating} = req.body
    console.log(ratedId, raterId, rating)
    dbHelpers
      .checkRatingExist(ratedId, raterId)
      .then(data => { // 
         if (!data) { //If rating doesnt exist create a rating 
            res.send("doesnt exist")
         } else {
            res.send('exist')
         }
      
      })
      .catch(e => res.status(400).send(e))
  })

  return router
}
