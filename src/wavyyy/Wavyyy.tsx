import React from "react";
import styled, { keyframes } from "styled-components";

function Wavyyy() {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <Screen
      className={active ? "active" : ""}
      onClick={() => setActive(true)}
    />
  );
}

const WavyAni = keyframes`
    0% {transform: translate(-50%, 0) rotateZ(0deg);}
    50% {transform: translate(-50%, -2%) rotateZ(180deg);}
    100% {transform: translate(-50%, 0%) rotateZ(360deg);}
`;

const ActiveAni = keyframes`
    100% {
        transform: translate(-10%) rotateZ(90deg);
        border-radius: 45%;
    }
`;
const Screen = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #3e606f;
  font-family: Roboto;
  overflow: hidden;

  /* &:before, */
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    min-width: 300vw;
    min-height: 300vw;
    background-color: #fcfff5;
  }

  &:not(.active) {
    /* &:before, */
    &:after {
      animation: ${WavyAni} 10s infinite linear;
    }
  }

  &.active {
    &:after {
      animation: ${ActiveAni} 1s forwards;
    }
  }

  /* &:before {
    bottom: 7vh;
    border-radius: 45%;
  } */

  &:after {
    bottom: 5vh;
    opacity: 0.5;
    border-radius: 45%;
  }
`;

export default Wavyyy;
