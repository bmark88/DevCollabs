const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/:user_id", (req, res) => {
    const ratedUserId = req.params.user_id
    dbHelpers
      .getUserRating(ratedUserId)
      .then(data => {
         res.send(data)
      })
      .catch(e => e.stack)
  })

  router.post("/:rated_id", (req, res) => {
    const ratedId = req.params.rated_id
    const { raterId, rating } = req.body

    dbHelpers
      .checkRatingExist(ratedId, raterId)
      .then(data => {
        //
        if (!data) {
          //If rating doesnt exist create a rating
          dbHelpers
            .rateUser(ratedId, raterId, rating)
            .then(data => {
              res.send(data)
            })
            .catch(e => e.stack)
        } else {
          //Change user rating if it does
          dbHelpers
            .updateRating(ratedId, raterId, rating)
            .then(data => {
              res.send(data)
            })
            .catch(e => e.stack)
        }
      })
      .catch(e => e.stack)
  })

  return router
}
