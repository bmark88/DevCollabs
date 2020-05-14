import React from "react"
import styled from "styled-components"

//hooks
import useApplicationData from "./hooks/useApplicationData"
import publicUse from "../components/hooks/publicUse"

import axios from "axios"

interface Props {}

export default function IndexGroupsList({}: Props) {
  //state includes list of users groups state= { groups{[id:number ,name:string], ...} }
  const { state } = useApplicationData()
  const { groups } = state
  const { publicGroups } = publicUse()

  const unsubscribe = "-"
  const toSubscribe = "+"

  const groupsArr = publicGroups.groups
  const groupsList = groupsArr.map(group => {
    let button = toSubscribe
    groups.map(subscribedGroup => {
      console.log(subscribedGroup)
      if (subscribedGroup.id === group.id) button = unsubscribe
    })
    const onSubmitFunction = (event: any) => {
      event.preventDefault()
      const userId: number = JSON.parse(localStorage.getItem("session") || "{}")
        .id
      const groupId = group.id
      const data = { userId }
      if (button === unsubscribe) {
        console.log("unsubscribe")

        axios({
          method: "delete",
          url: `http://localhost:3001/group/subscription/delete/${groupId}`,
          data: data,
        }).then(res => {
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
          console.log(res.data)
        })
      }
    }
    return (
      <div>
        {group.name}
        <button onClick={onSubmitFunction}>{button}</button>
      </div>
    )
  })
  return <div>{groupsList}</div>
}
