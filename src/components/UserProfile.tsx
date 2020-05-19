import React from "react"
import styled from "styled-components"
import { List, ListSubheader } from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import { Divider } from "@material-ui/core"
import { RoomCard } from "../components/rooms"
interface Props {
  postCount: number
  subscriptions: any
  userName: string
}

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 1em;

`

const Ul = styled.ul`
  position: relative;
  max-height: 288px;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 0px;
  width: 100%;
  
`

const AdminBadge = styled.div`
  margin-left: 1em;
  display: flex;
  border-radius: 20px;
  padding: 0.1em;
  border: solid 1px;
  position: absolute;
  right: 0px;
  
  @media (max-width:1200px) {
    margin: 10px;
  }
`

const ListTitle = styled.h3`
  background-color: white;
  @media (max-width:1200px) {
    margin: 10px;
  }
`

const UserProfile = ({ postCount, subscriptions, userName }: Props) => {
  return (
    <RoomCard
      title={userName}
      image="https://hackernoon.com/hn-images/1*TYAzzTJ60x-qg5N81ElU9A.png"
    >
      <div>
        <Typography variant="h6" gutterBottom>
          Total Posts: {postCount}
        </Typography>
        <Divider />
        <ListSubheader></ListSubheader>
        <ListTitle>{`Your Subbed Groups`}</ListTitle>
        <Ul>
          {subscriptions.map((group: any, index: number) => {
            return (
              <Div key={index}>
                <b>{group.name}</b>
                {group.is_admin && (
                  <AdminBadge>
                    <AccountCircleIcon />
                    Admin
                  </AdminBadge>
                )}
              </Div>
            )
          })}
        </Ul>
      </div>
    </RoomCard>
  )
}
export default UserProfile
