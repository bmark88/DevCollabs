import React from "react"
import styled from "styled-components"

interface Props {
  group: object
  groups: object
  setGroup: any
  name: string
  id: any
}

const Li = styled.li`
  list-style: none;
  background-color: #551A8B;
  justify-content: center;
  color: white;
  border: solid;
  border-color: black;
  border-radius: 20px;
  display: flex;
  width: 200px;

  &:hover {
    background-color: white;
    color: #551A8B;
    border-color: #551A8B;
    font-weight: bold;
  }

  &:active {
    color: white;
    background-color: gray;
    border-color: black;
  }
`;

export default function GroupListItem({ id, name, setGroup } :Props) {
  return (
  <>
    <Li onClick={() => setGroup(id)}>{name}</Li>
  </>
  )
}
