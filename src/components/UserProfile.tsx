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
import { RoomCard} from '../components/rooms'
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

const Content = styled.div`
  border: solid;
  margin: 1em;
  min-width: 10%;
  height: 400px;
`

const AdminBadge = styled.div`
  margin-left: 1em;
  display: flex;
  border-radius: 20px;
  padding: 0.1em;
  border: solid 1px;
`

const ListTitle = styled.h3`
  background-color: white;
`

const UserProfile = ({ postCount, subscriptions, userName }: Props) => {
  return (
    <RoomCard title= {userName} image="https://hackernoon.com/hn-images/1*TYAzzTJ60x-qg5N81ElU9A.png" >
        <div>
        <Typography variant="h6" gutterBottom>
            Total Posts: {postCount}
          </Typography>
          <Divider />
          <ListSubheader></ListSubheader>
            <ListTitle>{`Your Subbed Groups`}</ListTitle>
          
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
          </div>
    </RoomCard>
    
  )
}
export default UserProfile
