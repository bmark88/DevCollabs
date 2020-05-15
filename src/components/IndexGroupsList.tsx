import React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import axios from "axios"

//hooks
import useApplicationData from "./hooks/useApplicationData"
import usePublic from "./hooks/usePublic"

//components
import IndexGroupsListItem from "./IndexGroupsListItem"

//helpers
import subscribeList from "../helpers/selectors"


export default function IndexGroupsList() {

  //state includes list of users groups state= { groups{[id:number ,name:string], ...} }
  const { state } = useApplicationData()
  const { publicGroups } = usePublic()
  const unsubscribe = "-"
  const toSubscribe = "+"

  // const [groupState, setGroupState] = useState({})
  const subscribeListResult = subscribeList(state, publicGroups)

  const groupsArr = publicGroups.groups
  useEffect(() => {
    // groupsArr.forEach(group => {
    //   if (subscribeListResult.includes(group.id)) {
    //     setGroupState(prev => ({ ...prev, [group.id]: true }))
    //   } else {
    //     setGroupState(prev => ({ ...prev, [group.id]: false }))
    //   }
    // })
  }, []) //[groupsArr.length, subscribeListResult.length])

  const onSubmitFunction = (event: any, groupId: number, button: string) => {
    event.preventDefault()
    const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
      .id
    const data = { userId }

    if (button === unsubscribe) {
      axios({
        method: "delete",
        url: `http://localhost:3001/group/subscription/delete/${groupId}`,
        data: data,
      }).then(res => {
        console.log(res.data)
      })
    }
    if (button === toSubscribe) {
      axios({
        method: "post",
        url: `http://localhost:3001/group/subscription/${groupId}`,
        data: data,
      }).then(res => {
        console.log(res.data)
      })
    }
  }

  const groupsList = groupsArr.map(group => {
    let button = toSubscribe
    if (subscribeListResult.includes(group.id)) {
      button = unsubscribe
    }

    return (
      <IndexGroupsListItem
        group={group}
        button={button}
        onSubmitFunction={onSubmitFunction}
      />
    )
  })
  return <div>{groupsList}</div>
}
