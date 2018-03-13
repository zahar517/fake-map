import React from "react";
import styled from "styled-components";

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  & + & {
    border-top: 1px solid #eee;
  }
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  width: 3rem;
  height: 3rem;
`;

const Avatar = styled.img`
  display: block;
  width: 100%;
`;

const UserInfo = styled.div`
  margin-left: 1rem;
  font-size: 0.75rem;
`;

const UserName = styled.div``;
const UserEmail = styled.div``;

export const UserCard = ({ user }) => (
  <Wrapper>
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
export default UserCard;
