import React from "react";
import styled, { keyframes } from "styled-components";

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoaderDiv = styled.div`
  display: block;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border: 5px solid transparent;
  border-top: 5px solid #aad3df;
  border-left: 5px solid #aad3df;
  border-radius: 50%;
  animation: ${rotate360} 1.5s linear infinite;
`;

const Loader = () => (
  <LoaderWrapper>
    <LoaderDiv />
  </LoaderWrapper>
);

export default Loader;
