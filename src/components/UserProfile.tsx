import React from "react"
import styled from "styled-components"
import { List, ListSubheader } from "@material-ui/core"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

interface Props {
  postCount :number
  subscriptions :any
  userName :string
}

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 1em;
`;

const Content = styled.div`
  border: solid;
  margin: 1em;
  min-width: 345px;
  height: 300px;
`;

const AdminBadge = styled.div`
  margin-left: 1em;
  display: flex;
  border-radius: 20px;
  padding: 0.1em;
  border: solid 1px;
`;

const UserProfile = ({ postCount, subscriptions, userName } :Props) => {
  return (
    <>
    <Content>
      <h1>{userName}</h1>
      <h3>Total Posts: {postCount}</h3>
      <List style={{maxHeight: '100%', overflow: 'auto'}}>
      <ListSubheader><h3>{`Your Subbed Groups`}</h3></ListSubheader>
        {subscriptions.map((group :any, index :number) => {
          return (
            <>
              <Div key={index}>
                <b>{group.name}</b>
                {group.is_admin && 
                  <AdminBadge>
                    <AccountCircleIcon/>
                    Admin
                  </AdminBadge>
                }
              </Div>
            </>
          );
        })}
      </List>
    </Content>
    </>
  );
};
export default UserProfile;
