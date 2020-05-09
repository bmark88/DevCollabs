const router = require("express").Router()

module.exports = db => {
  const dbHelpers = require("./dbHelpers/dbHelpers.ts")(db)

  router.post("/:groupId/post/create", (req, res) => {
    //req.body should be JSON of { "userId" : id, "data": "string"}
    const { groupId } = req.params
    const { userId, data } = req.body
    dbHelpers
      .createPost(groupId, userId, data)
      .then(post => res.send(`Post #${post.id} 
      Data: ${post.data}
      created by group:${post.group_id} by user:${post.user_id}`))
      .catch(e => res.status(400).send("Could not create post"))
  })

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
        avatar_image,
      })
    })
  })

  router.post("/:name", (req, res) => {
    const subscription = { group_id: "", user_id: "" }
    dbHelpers
      .addGroup(req.params.name)
      .then(group => {
        subscription.group_id = group.id
        console.log("1-subscription group", subscription)
      })
      .then(() => {
        dbHelpers
          .getUserWithEmail("alice@hotmail.com")
          .then(user => {
            subscription.user_id = user.id
            console.log("2-subscription user", subscription)
          })
          .then(() => {
            console.log("3-subscription object: ", subscription),
              dbHelpers
                .addSubscription(subscription)
                .then(result => console.log("result ", result))
          })
      })
  })

  router.delete("/delete/:group_id", (req, res) => {
    console.log(req.body)
    console.log(req.params)
    const userId = req.body.id
    const groupId = req.params.group_id

    dbHelpers.getSubscriptionsWithUser(userId, groupId).then(subscription => {
      console.log("2-subscription", subscription)
      if (subscription.is_admin === true) {
        dbHelpers.deleteGroup(groupId).then(data => console.log(data))
      } else {
        throw new Error("error: unable to delete group")
      }
    })
  })

  return router
}
