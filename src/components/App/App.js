import React from "react";
import styled from "styled-components";
import UserList from "../UserList";
import Map from "../Map";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  flex: 0 0 20rem;
  position: relative;
`;

const MapWrapper = styled.div`
  flex: auto;
`;

export const App = () => (
  <Wrapper>
    <Sidebar>
      <UserList />
    </Sidebar>
    <MapWrapper>
      <Map />
    </MapWrapper>
  </Wrapper>
);

export default App;
