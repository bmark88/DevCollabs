const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get('/:userID', (req, res) => {
    const userID = req.params.userID;

    dbHelpers
      .getUserPostsCount(userID)
      .then(postCount => postCount)
      .catch(e => console.error('error in profile.ts', e.stack))
    
      res.send()
  })

  return router
}