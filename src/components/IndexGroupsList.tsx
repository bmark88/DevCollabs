import React, { useEffect, useState } from "react"

import { IconButton, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import DeleteIcon from "@material-ui/icons/Delete"
import styled from "styled-components"

import axios from "axios"
import { toast } from "react-toastify"

interface Props {
  subscriptions: any
}

const toastNotif = (notification: string) => {
  const typesOfNotif: {
    [isAdmin: string]: string
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

const ElementDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonsDiv = styled.div`
  margin-right: 10px;
`
const useStyles = makeStyles({
  groupName: {
    alignSelf: "center",
    marginLeft: "15px",
  },
  groupButtons: {
    margin: "0px 5px 0px 5px",
  },
})

function GroupTestElement(props: any) {
  const { name, id } = props.group
  const subscription = props.subscription
  const userId = JSON.parse(localStorage.getItem("session") || "{}").id
  const [sub, setSub] = useState(false)
  const [disable, setDisable] = useState(false)
  const classes = useStyles()

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
      ? axios({
          method: "delete",
          url: `http://localhost:3001/group/subscription/delete/${id}`,
          data: data,
        })
          .then(() => {
            console.log("unsub success")
            toastNotif("removeSub")
          })
          .catch(() => console.log("unsub unsuccess"))
      : axios({
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
    setTimeout(function () {
      setDisable(false)
    }, 1000)
  }

  const handleDeleteGroup = () => {
    console.log(`delete this group id => ${id}`)
    axios({
      method: "DELETE",
      url: `http://localhost:3001/group/delete/${id}`,
      data: { id: userId },
    })
      .then(data => {
        console.log(data)
        axios.get("http://localhost:3001/group/public").then(data => {
          console.log(data.data)
          props.setAllGroups(data.data)
        })
      })
      .catch(e => console.log(e))
  }
  return (
    <ElementDiv>
      <Typography className={classes.groupName} variant="body1">
        {name}
      </Typography>
      <ButtonsDiv>
        {subscription.is_admin && (
          <IconButton
            className={classes.groupButtons}
            onClick={handleDeleteGroup}
            disabled={disable}
          >
            <DeleteIcon />
          </IconButton>
        )}
        <IconButton
          className={classes.groupButtons}
          onClick={handleSub}
          disabled={disable}
        >
          {sub ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
        </IconButton>
      </ButtonsDiv>
    </ElementDiv>
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

  const ListDiv = styled.div`
    margin: 1em;
    max-height: 368px;
    overflow: hidden;
    overflow-y: scroll;
  `

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
        setAllGroups={setAllGroups}
      />
    )
  })

  return <ListDiv>{List}</ListDiv>
}
