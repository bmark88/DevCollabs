const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get('/:userID', (req, res) => {
    const userID = req.params.userID;

    Promise.all([
      Promise.resolve(dbHelpers.getUserPostsCount(userID)),
      Promise.resolve(dbHelpers.getAllUserSubscriptions(userID))
    ]).then((all) => {
      res.send({ 
        totalPosts: all[0],
        userSubscriptions: all[1]
      })
    })
    .catch(e => console.error('error in profile.ts', e.stack));
    // dbHelpers
    //   .getUserPostsCount(userID)
    //   .then(result => res.send(result))
    //   .catch(e => console.error('error in profile.ts', e.stack))
  });

  return router;
}