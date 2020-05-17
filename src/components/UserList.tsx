import React from "react";
import styled from "styled-components";

interface Props {
  users :any
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Ul = styled.ul`
  list-style: none;
`;

const UserList = ({ users } :Props) => {
  // console.log(users.map(user => user))
  return (
    <UserContainer>
      <h1>Users List</h1>
      <Ul>
        {users.map((user :any, index :number) => {
          return (
            <div key={index}>
              <li>{user.username}</li>
              <button>Add rating</button>
              {/* <div>{user.email}</div> */}
            </div>
          )
        })}
      </Ul>
    </UserContainer>
    )
}

export default UserList;