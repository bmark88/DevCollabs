import React from "react"
import styled from "styled-components"
import GroupListItem from "./GroupListItem"

interface Props {
  groups: any
  // group: any
  setGroup: any
}

const Div = styled.div`
  border: solid 2px;
  border-color: #551A8B;
  border-radius: 6px;
  padding: 1em;
  min-width: 250px;
  max-height: 85vh;
  margin: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;

  @media (min-width: 999px) {
    max-height: 20.5vh;
  }

  @media (min-width: 621px) {
    max-height: 110.5vh;
  }
  
  @media (max-width: 620px) {
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
