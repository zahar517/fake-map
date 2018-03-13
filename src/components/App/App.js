import React from "react";
import styled from "styled-components";
import UserList from "../UserList";
import Map from "../Map";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  flex: 0 0 25vw;
`;

export const App = () => (
  <Wrapper>
    <Sidebar>
      <UserList />
    </Sidebar>
    <Map />
  </Wrapper>
);

export default App;
