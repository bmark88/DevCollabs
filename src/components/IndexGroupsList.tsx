import React from "react"
import { useEffect, useState } from "react"

import axios from "axios"

import { toast } from "react-toastify"

interface Props {
  subscriptions: any
}

const toastNotif = (notification: string) => {
  const typesOfNotif: {
    isAdmin: string
    addSub: string
    removeSub: string
  } = {
    isAdmin:
      "You are the admin! To remove subscription, you must delete the group",
    addSub: "You have subscribed!",
    removeSub: "You have unsubscribed!",
  }
  toast(`${typesOfNotif[notification]}`, {
    position: "bottom-right",
    autoClose: 2500,
    closeOnClick: false,
    pauseOnHover: false,
    hideProgressBar: true,
  })
}

function GroupTestElement(props: any) {
  const { name, id } = props.group
  const subscription = props.subscription

  const userId = JSON.parse(localStorage.getItem("session") || "{}").id
  const [sub, setSub] = useState(false)
  const [disable, setDisable] = useState(false)

  //   console.log("sub true or not", props.sub)
  //   console.log("from grouptestelent", name)
  //   console.log("from goruptestele", id)
  //   console.log("sub-->", sub)
  //   console.log("-------------")

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3001/group/${id}/${userId}`,
    }).then(isSubbed => {
      setSub(isSubbed.data)
    })
  }, [])


  const handleSub = () => {
    const data = { userId }

    if (subscription.is_admin) return toastNotif("isAdmin")

    sub
      ?( axios({
          method: "delete",
          url: `http://localhost:3001/group/subscription/delete/${id}`,
          data: data,
        })
          .then(() => {
            console.log("unsub success")
            toastNotif("removeSub")
          })
          .catch(() => console.log("unsub unsuccess"))
      ) : axios({
          method: "post",
          url: `http://localhost:3001/group/subscription/${id}`,
          data: data,
        })
          .then(() => {
            console.log("sub success")
            toastNotif("addSub")
          })
          .catch(() => console.log("sub unsuccess"))
    setSub(!sub)
    setDisable(true)
    setTimeout(function() {setDisable(false)}, 1000)
  }

  return (
    <div>
      <p key={id}>{name}</p>
      <button onClick={handleSub} disabled={disable}>
        {sub ? "-" : "+"}
      </button>
    </div>
  )
}

export default function IndexGroupList({ subscriptions }: Props) {
  const [allGroups, setAllGroups] = useState([])
  //   const [groupBelong, setGroupBelong] = useState([])

  useEffect(() => {
    const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
      .id
    console.log("userID", userId)
    axios.get("http://localhost:3001/group/public").then(data => {
      console.log(data.data)
      setAllGroups(data.data)
    })
    //     axios.get(`http://localhost:3001/group/u/${userId}`).then(data => {
    //       const groupNameBelongArr = data.data.map(group => {
    //          return group.name
    //        })
    //        console.log("groupArr", groupNameBelongArr)
    //       setGroupBelong(groupNameBelongArr)
    //     })
  }, [])

  const List = allGroups.map(group => {
    // if (groupBelong.includes(group.name)) {
    //    return <GroupTestElement group={group} sub={true} />
    // } else {
    //
    // }
    let subscription = subscriptions
      ? subscriptions.find(sub => sub.group_id === group.id)
      : {}
    if (subscription === undefined) subscription = {}

    return (
      <GroupTestElement
        group={group}
        subscription={subscription}
        key={group.id}
      />
    )
  })

  return <div>{List}</div>
}
