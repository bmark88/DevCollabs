import React from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

interface Props {
  groups: object[]
  group: object
  setGroup: any
}

const Div = styled.div`
  border: solid 2px;
  border-color: #551a8b;
  border-radius: 6px;
  padding: 1em;
  min-width: 250px;
  margin: 1em;
  // min-height: 500px;
`

export default function GroupList({ groups, setGroup }: Props) {
  const GroupList = groups.map(group => {
    return (
      <GroupListItem
        key={group.id}
        id={group.id}
        name={group.name}
        setGroup={setGroup}
      />
    )
  })
  return <Div>{GroupList}</Div>
}
