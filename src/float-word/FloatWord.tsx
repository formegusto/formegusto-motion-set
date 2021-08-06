import React from "react";
import { useCallback } from "react";
import styled, { css } from "styled-components";

interface StyleProps {
  size?: number;
  color?: string;
}

interface Props {
  text: string;
  style?: StyleProps;
}

function FloatWord({ text, style }: Props) {
  const returnPosition: any = useCallback(function (
    this: HTMLSpanElement,
    e: TransitionEvent
  ) {
    this.style.transition = `${Math.random() * 3 + 3}s linear`;

    this.style.transform = `translateX(${
      Math.random() * 218 - Number.parseFloat(this.style.left.replace("px", ""))
    }px) translateY(${
      Math.random() * 218 - Number.parseFloat(this.style.top.replace("px", ""))
    }px)`;
  },
  []);
  React.useEffect(() => {
    text.split("").forEach((t, idx) => {
      const textEl = document.querySelector<HTMLSpanElement>(`#word-${idx}`);
      textEl!.style.transition = `${Math.random() * 10}s linear`;
      textEl!.style.transform = `translateX(${
        Math.random() * 218 -
        Number.parseFloat(textEl!.style.left.replace("px", ""))
      }px) translateY(${
        Math.random() * 218 -
        Number.parseFloat(textEl!.style.top.replace("px", ""))
      }px)`;
      textEl?.addEventListener("transitionend", returnPosition);

      console.log(`text:${t}`, textEl?.style.transform);
    });
  });
  return (
    <Wrap {...style}>
      <HorizontalLine className="horizontal line" />
      <VerticalLine className="vertical line" />
      <WordWrap className="wrap">
        {text.split("").map((t, idx) => (
          <Word
            key={idx}
            id={`word-${idx}`}
            style={{
              top: Math.random() * 218,
              left: Math.random() * 218,
            }}
          >
            {t}
          </Word>
        ))}
      </WordWrap>
    </Wrap>
  );
}

const Wrap = styled.div<StyleProps>`
  position: relative;
  cursor: pointer;

  & > .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    box-sizing: border-box;

    ${({ color }) =>
      color
        ? css`
            border: 2px solid ${color};
          `
        : css`
            border: 2px solid #333;
          `}
    border-radius: 100%;
    transition: 0.7s;
  }

  &:hover {
    & > .vertical {
      top: calc(50% - 125px);
      left: calc(50% - 0.5px);
      width: 1px;
      height: 100%;

      /* border-radius: 0; */
    }
    & > .horizontal {
      top: calc(50% - 0.5px);
      left: calc(50% - 125px);
      width: 100%;
      height: 1px;

      /* border-radius: 0; */
    }

    & > .wrap {
      border-radius: 0;
    }
  }

  ${({ size }) =>
    size
      ? css`
          width: ${size}px;
          height: ${size}px;
        `
      : css`
          width: ${250}px;
          height: ${250}px;
        `}
`;

const HorizontalLine = styled.div``;

const VerticalLine = styled.div``;

const WordWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  border-radius: 100%;

  overflow: hidden;
  transition: 0.7s;
`;
const Word = styled.span`
  position: absolute;

  font-size: 2rem;
`;

export default FloatWord;
