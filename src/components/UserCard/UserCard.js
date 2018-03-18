import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
`;

export const Avatar = styled.img`
  display: block;
  width: 100%;
`;

const UserInfo = styled.div`
  margin-left: 1rem;
  font-size: 0.75rem;
`;

const UserName = styled.div``;
const UserEmail = styled.div``;

export const UserCard = ({ user, selectCurrentUser }) => {
  const selectUser = () => selectCurrentUser(user.id);

  return (
    <Wrapper onClick={selectUser}>
      <AvatarWrapper>
        <Avatar src={user.properties.avatar} alt="avatar" />
      </AvatarWrapper>
      <UserInfo>
        <UserName>
          <b>Name:</b> {user.properties.userName}
        </UserName>
        <UserEmail>
          <b>Email:</b> {user.properties.email}
        </UserEmail>
      </UserInfo>
    </Wrapper>
  );
};

export default UserCard;
