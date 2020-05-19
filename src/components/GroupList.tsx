import React from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

interface Props {
  groups: any
  group: any
  setGroup: any
}

const Div = styled.div`
  border: solid 2px;
  border-color: #551a8b;
  border-radius: 6px;
  padding: 1em;
  min-width: 250px;
  max-height: 80vh;
  margin: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
  
  @media (max-width:780px) {
    height: 150px;
  }
`;

export default function GroupList({ groups, setGroup }: Props) {
  const GroupList = groups.map((group :any) => {
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
