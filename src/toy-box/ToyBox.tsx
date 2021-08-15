import React from "react";
import styled, { css } from "styled-components";

type Props = {
  text: string;
  size: number;
  fontSize?: number;
};

function boxOpen() {
  const boxTopEl = document.getElementById("box-top");

  boxTopEl!.style.transition = "1.2s";
  boxTopEl!.style.transform = "rotateX(220deg)";
}

function transition_1(t: string, idx: number) {
  const textSpan = document.getElementById(
    `text-${idx}-${t}`
  ) as HTMLSpanElement;
  const textShadowSpan = document.getElementById(`shadow-text-${idx}-${t}`);
  const boxEl = document.getElementById("box");

  console.log("Text Offset:", textSpan?.getClientRects());
  console.log("Shadow Offset:", textShadowSpan?.getClientRects());

  const { x: text_x, y: text_y } = textSpan.getClientRects()[0];
  const { x: shadow_x, y: shadow_y } = textShadowSpan!.getClientRects()[0];
  const { width: boxWidth } = boxEl!.getClientRects()[0];
  const err = {
    x: text_x - shadow_x,
    y: text_y - shadow_y,
  };

  textSpan!.addEventListener("transitionend", () => {
    textSpan!.style.transition = "0.6s linear";
    textSpan!.style.transform =
      "translateX(" + err.x * -1 + "px)" + "translateY(" + err.y * -1 + "px)";
  });
  console.log("boxWidth", boxWidth);
  const boxHalfWidth = boxWidth / 2;
  console.log("boxHalfWidth", boxHalfWidth);
  console.log("ERR X", err.x);

  const errType = err.x < 0 ? -1 : 1;
  const tranX =
    (err.x * errType) / 2 > boxHalfWidth
      ? boxHalfWidth * errType * -1
      : (err.x / 2) * -1;
  textSpan!.style.transition = "0.2s linear";
  textSpan!.style.transform =
    "translateX(" +
    tranX +
    "px)" +
    "translateY(" +
    (err.y / 2.25) * -1 +
    "px) ";
}

function ToyBox({ text, size, fontSize }: Props) {
  React.useEffect(() => {
    const boxTopEl = document.getElementById("box-top");
    boxTopEl?.addEventListener("transitionend", () => {
      text.split("").forEach((t, idx) => {
        setTimeout(() => {
          transition_1(t, idx);
        }, idx * 300);
      });
    });
    boxOpen();
  });

  return (
    <ToyBoxDimension size={size}>
      <TextWrap size={size}>
        {text.split("").map((t, idx) => (
          <TextItem
            key={idx}
            id={`shadow-text-${idx}-${t}`}
            fontSize={fontSize}
          >
            {t}
          </TextItem>
        ))}
      </TextWrap>
      <Box.Wrap id="box" size={size}>
        {text.split("").map((t, idx) => (
          <AniText key={idx} id={`text-${idx}-${t}`} fontSize={fontSize}>
            {t}
          </AniText>
        ))}
        {BOXSET.map((BoxItem, idx) => (
          <BoxItem key={idx} size={size} />
        ))}
      </Box.Wrap>
    </ToyBoxDimension>
  );
}

type StyleProps = {
  size?: number;
  fontSize?: number;
};

const ToyBoxDimension = styled.div<StyleProps>`
  position: absolute;
  top: 150px;
  left: ${({ size }) => size! / 2}px;
  perspective: 1000px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.div<StyleProps>`
  margin: 0 0 ${({ size }) => size! + 40}px ${({ size }) => size! / 2}px;
  opacity: 0;
`;

const TextItem = styled.span<StyleProps>`
  display: inline-block;
  margin: 0 12px 0 0;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}/* 
  color: rgba(0, 0, 0, 0.3); */
`;

const AniText = styled.span<StyleProps>`
  position: absolute;
  ${({ fontSize }) =>
    fontSize &&
    css`
      font-size: ${fontSize}px;
    `}
`;

const Box = {
  Wrap: styled.div<StyleProps>`
    position: relative;
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    transform-style: preserve-3d;

    transform: rotateX(-20deg) rotateY(-20deg);
    display: flex;
    justify-content: center;
    align-items: center;

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
  Front: styled.div<StyleProps>`
    transform-origin: 50% 50%;
    transform: translateZ(${({ size }) => size! / 2}px);
  `,
  Back: styled.div<StyleProps>`
    transform-origin: 50% 50%;
    transform: translateZ(-${({ size }) => size! / 2}px);

    transform-style: preserve-3d;
  `,
  Top: styled.div<StyleProps>`
    transform-origin: 50% 0%;
    transform: rotateX(90deg);
  `,
  Bottom: styled.div<StyleProps>`
    transform-origin: 50% 50%;
    transform: rotateX(90deg) translateZ(-${({ size }) => size! / 2}px);
  `,
  Left: styled.div<StyleProps>`
    transform-origin: 50% 50%;
    transform: rotateY(90deg) translateZ(-${({ size }) => size! / 2}px);
  `,
  Right: styled.div<StyleProps>`
    transform-origin: 50% 50%;
    transform: rotateY(90deg) translateZ(${({ size }) => size! / 2}px);
  `,
};

const BOXSET = [
  (props: React.PropsWithRef<StyleProps>) => (
    <Box.Front id="box-front" {...props} />
  ),
  (props: React.PropsWithRef<StyleProps>) => (
    <Box.Back id="box-back" {...props}>
      <Box.Top id="box-top" {...props} />
    </Box.Back>
  ),
  (props: React.PropsWithRef<StyleProps>) => (
    <Box.Bottom id="box-bottom" {...props} />
  ),
  (props: React.PropsWithRef<StyleProps>) => (
    <Box.Left id="box-left" {...props} />
  ),
  (props: React.PropsWithRef<StyleProps>) => (
    <Box.Right id="box-right" {...props} />
  ),
];

export default ToyBox;
