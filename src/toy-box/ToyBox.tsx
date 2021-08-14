import React from "react";
import styled from "styled-components";
import { TextAnimationGen } from "./Animations";

type Props = {
  text: string;
};

function initPosition(text: string) {
  const box = document.getElementById("box") as HTMLDivElement;
  console.log("Box", box?.getClientRects());

  const {
    x: boxX,
    y: boxY,
    width: boxW,
    height: boxH,
  } = box!.getClientRects()[0];

  text.split("").forEach((t, idx) => {
    const textSpan = document.getElementById(
      `text-${idx}-${t}`
    ) as HTMLSpanElement;
    console.log(`text-${idx}-${t}`, textSpan.getClientRects());
    const { x: textX, y: textY } = textSpan.getClientRects()[0];
    textSpan!.style.transform =
      "translateX(" +
      (boxX - textX + boxW / 2) +
      "px) " +
      "translateY(" +
      (boxY - textY + boxH / 2) +
      "px) " +
      "rotateY(-20deg)";
  });
}

function boxOpen() {
  const boxTopEl = document.getElementById("box-top");

  boxTopEl!.style.transition = "1.2s";
  boxTopEl!.style.transform = "rotateX(220deg)";
}

function ToyBox({ text }: Props) {
  React.useEffect(() => {
    initPosition(text);

    const boxTopEl = document.getElementById("box-top");
    boxTopEl?.addEventListener("transitionend", () => {
      text.split("").forEach((t, idx) => {
        setTimeout(() => {
          const textSpan = document.getElementById(
            `text-${idx}-${t}`
          ) as HTMLSpanElement;
          //   textSpan!.style.transition = "1s";
          //   textSpan!.style.transform = "";
          textSpan.classList.add("active");
        }, idx * 300);
      });
    });

    boxOpen();
  });

  return (
    <ToyBoxDimension>
      <TextWrap>
        {text.split("").map((t, idx) => (
          <TextItem key={idx} id={`text-${idx}-${t}`}>
            {t}
          </TextItem>
        ))}
      </TextWrap>
      <Box.Wrap id="box">
        {BOXSET.map((BoxItem, idx) => (
          <BoxItem key={idx} />
        ))}
      </Box.Wrap>
    </ToyBoxDimension>
  );
}

const ToyBoxDimension = styled.div`
  position: absolute;
  top: 150px;
  left: 150px;
  perspective: 1000px;
`;

const TextWrap = styled.div`
  margin: 0 0 100px -50px;
`;
const TextItem = styled.span`
  display: inline-block;
  margin: 0 16px 0 0;

  &.active {
    animation: ${TextAnimationGen({})} 1s;
  }
`;

const Box = {
  Wrap: styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;

    transform: rotateX(-20deg) rotateY(-20deg);

    & div {
      position: absolute;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      border: 1px solid black;
      box-sizing: border-box;

      background-color: #fff;
    }
  `,
  Front: styled.div`
    transform-origin: 50% 50%;
    transform: translateZ(50px);
  `,
  Back: styled.div`
    transform-origin: 50% 50%;
    transform: translateZ(-50px);

    transform-style: preserve-3d;
  `,
  Top: styled.div`
    transform-origin: 50% 0%;
    transform: rotateX(90deg);
  `,
  Bottom: styled.div`
    transform-origin: 50% 50%;
    transform: rotateX(90deg) translateZ(-50px);
  `,
  Left: styled.div`
    transform-origin: 50% 50%;
    transform: rotateY(90deg) translateZ(-50px);
  `,
  Right: styled.div`
    transform-origin: 50% 50%;
    transform: rotateY(90deg) translateZ(50px);
  `,
};

const BOXSET = [
  () => <Box.Front id="box-front" />,
  () => (
    <Box.Back id="box-back">
      <Box.Top id="box-top" />
    </Box.Back>
  ),
  () => <Box.Bottom id="box-bottom" />,
  () => <Box.Left id="box-left" />,
  () => <Box.Right id="box-right" />,
];

export default ToyBox;
