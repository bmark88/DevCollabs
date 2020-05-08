const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/:group_id", (req, res) => {
    const { group_id } = req.params
    dbHelpers.getPostWithGroupID(group_id).then(queryResults => {
      console.log(queryResults)
      const { username, data, created_at, avatar_image } = queryResults
      console.log(username, data, created_at, avatar_image)
      
      res.send({
        username, 
        data,
        created_at,
        avatar_image
      })

    })
  })

  router.post("/:name", (req, res) => {
    dbHelpers.addGroup(req.params.name).then(data => console.log(data))
  })


  return router
}
