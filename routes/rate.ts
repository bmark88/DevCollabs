const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/:user_id", (req, res) => {
    const ratedUserId = req.params.user_id
    dbHelpers
      .getUserRating(ratedUserId)
      .then(data => {
         console.log(data)
         res.send(data)
      })
      .catch(e => console.error(e))
  })

  router.post("/:rated_id", (req, res) => {
    const ratedId = req.params.rated_id
    const { raterId, rating } = req.body
    console.log(ratedId, raterId, rating)
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
              console.log("rating added")
            })
            .catch(e => console.error(e))
        } else {
          //Change user rating if it does
          dbHelpers
            .updateRating(ratedId, raterId, rating)
            .then(data => {
              res.send(data)
              console.log(data)
              console.log("rating updated")
            })
            .catch(e => console.error(e))
        }
      })
      .catch(e => console.error(e))
  })

  return router
}
