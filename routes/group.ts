const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.get("/:group_id", (req, res) => {
    const { group_id } = req.params
    dbHelpers.getPostWithGroupID(group_id).then(queryResults => {
      console.log(queryResults)
      const { username, data, created_at, avatar_image } = queryResults
      console.log(username, data, created_at, avatar_image)
      console.log(JSON.parse(data))
      res.send({
        username,
        data: JSON.parse(data),
        created_at,
        avatar_image,
      })
    })
  })

  router.post("/:name", (req, res) => {
    dbHelpers.addGroup(req.params.name).then(data => console.log(data))
  })

  router.delete("/:group_id", (req, res) => {
    let data = JSON.parse(window.localStorage.getItem("session"))
    console.log('1-data', data)
    dbHelpers.getSubscriptionsWithUser(data.id, req.params.group_id).then(subscription => {
      console.log('2-subscription', subscription)
      if (subscription.is_admin === true) {
        dbHelpers.deleteGroup(group_id).then(data => console.log(data))
      } else {
        throw new Error("error: unable to delete group")
      }
    })
  })

  return router
}
