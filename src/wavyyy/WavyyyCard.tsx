import React from "react";
import styled, { keyframes } from "styled-components";

const SkyColor = "#D3E0EC";
const SeaColor = "#708AAD";

function WavyyyCard() {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <Screen onClick={() => setActive(active ? false : true)}>
      <WavyTool className={active ? "active" : ""} />
    </Screen>
  );
}

const WavyAni = keyframes`
    0% {
        transform: translate(-50%) rotateZ(0deg)
    } 50% {
        transform: translate(-50%, -2%) rotateZ(180deg)
    } 100% {
        transform: translate(-50%) rotateZ(360deg)
    }
`;
const Screen = styled.div`
  position: relative;

  width: 100vw;
  height: 100vh;

  background-color: ${SeaColor};
  overflow: hidden;
`;

const WavyTool = styled.div`
  position: absolute;

  bottom: 12vh;
  left: 50%;

  width: 150vw;
  height: 300vh;

  background-color: ${SkyColor};

  border-radius: 45%;

  animation: ${WavyAni} 10s linear infinite;
  &.active {
    transition: 1s;
    transform: translate(-50%) rotateZ(0deg);
    animation: none;
    border-radius: 0;
  }
  /* transform: translate(-50%) rotateZ(95deg); */
`;

export default WavyyyCard;
