import React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

//hooks
import useApplicationData from "./hooks/useApplicationData"
import usePublic from "./hooks/usePublic"

//components
import Button from "./Button"
import IndexGroupsListItem from "./IndexGroupsListItem"
//helpers
import subscribeList from "../helpers/selectors"

interface Props {}

export default function IndexGroupsList({}: Props) {
  //state includes list of users groups state= { groups{[id:number ,name:string], ...} }
  //   const { subscribeList } = subscribeList()
  const { state } = useApplicationData()
  //   const { groups } = state
  const { publicGroups } = usePublic()
  const unsubscribe = "-"
  const toSubscribe = "+"

  // const [button, setButton] = useState(toSubscribe)

  const [groupState, setGroupState] = useState({})
  const subscribeListResult = subscribeList(state, publicGroups)

  const groupsArr = publicGroups.groups
  console.log("HERE", groupsArr)
  useEffect(() => {
    groupsArr.forEach(group => {
      // let button = toSubscribe
      if (subscribeListResult.includes(group.id)) {
        console.log("HERE")
        // button = unsubscribe
        // setButton(unsubscribe)
        setGroupState(prev => ({ ...prev, [group.id]: true }))
      } else {
        setGroupState(prev => ({ ...prev, [group.id]: false }))
      }
    })
  }, []) //[groupsArr.length, subscribeListResult.length])

  const onSubmitFunction = (event: any, groupId:number, button) => {
    console.log("onSubmit")
    event.preventDefault()
    const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
      .id
    const data = { userId }
    // const groupId = group.id
    console.log("userId, groupId", userId, groupId)

    if (button === unsubscribe) {
      console.log("unsubscribe")
      axios({
        method: "delete",
        url: `http://localhost:3001/group/subscription/delete/${groupId}`,
        data: data,
      }).then(res => {
        // setButton(toSubscribe)
        console.log(res.data)
      })
    }
    if (button === toSubscribe) {
      console.log("toSubscribe")

      axios({
        method: "post",
        url: `http://localhost:3001/group/subscription/${groupId}`,
        data: data,
      }).then(res => {
        // setButton(unsubscribe)
        console.log(res.data)
      })
    }
  }

  const groupsList = groupsArr.map(group => {
    let button = toSubscribe
    if (subscribeListResult.includes(group.id)) {
      button = unsubscribe
      // setButton(unsubscribe)
    }
    // groups.map(subscribedGroup => {
    //   if (subscribedGroup.id === group.id) setButton(unsubscribe)
    // })

    return (
      <IndexGroupsListItem group={group} button={button} onSubmitFunction={onSubmitFunction}/>
      //   <>
      // <div>
      //   {group.name}
      //   <button onClick={(e) => onSubmitFunction(e, groupId, button)}>{button}</button>
      // </div>
      // </>
    )
  })
  return <div>{groupsList}</div>
}
