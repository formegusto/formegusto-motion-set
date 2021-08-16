import React from "react";
import styled, { css } from "styled-components";

interface StyleProps {
  size?: number;
  color?: string;
}

interface Props {
  text: string[];
  style?: StyleProps;
}

const PART = ["one", "two", "three", "four"];

function FloatWord({ text, style }: Props) {
  const returnPosition: any = React.useCallback(function (
    this: HTMLSpanElement,
    e: TransitionEvent
  ) {
    this.style.transition = `${Math.random() * 3 + 3}s linear`;

    this.style.transform = `translateX(${Math.random() * 125}px) translateY(${
      Math.random() * 125
    }px)`;
  },
  []);

  const resetPosition = React.useCallback(() => {
    console.log("Reset Position");
    text.forEach((t, ti) => {
      t.split("").forEach((w, wi) => {
        const textEl = document.querySelector<HTMLSpanElement>(
          `#word-${ti}-${wi}-${w}`
        );
        textEl?.removeEventListener("transitionend", returnPosition);
        textEl!.style.transition = `0.8s linear`;
        textEl!.style.transform = "";
        console.log(`text:${w}`, textEl?.style.transform);
      });
    });
  }, [text, returnPosition]);

  const restartPosition = React.useCallback(() => {
    console.log("Restart Position");
    text.forEach((t, ti) => {
      t.split("").forEach((w, wi) => {
        const textEl = document.querySelector<HTMLSpanElement>(
          `#word-${ti}-${wi}-${w}`
        );
        textEl!.style.transition = `${Math.random() * 10}s linear`;
        textEl!.style.transform = `translateX(${
          Math.random() * 125
        }px) translateY(${Math.random() * 125}px)`;
        textEl?.addEventListener("transitionend", returnPosition);
        console.log(`text:${w}`, textEl?.style.transform);
      });
    });
  }, [text, returnPosition]);

  React.useEffect(() => {
    text.forEach((t, ti) => {
      t.split("").forEach((w, wi) => {
        const textEl = document.querySelector<HTMLSpanElement>(
          `#word-${ti}-${wi}-${w}`
        );
        textEl!.style.transition = `${Math.random() * 10}s linear`;
        textEl!.style.transform = `translateX(${
          Math.random() * 125
        }px) translateY(${Math.random() * 125}px)`;
        textEl?.addEventListener("transitionend", returnPosition);
        console.log(`text:${w}`, textEl?.style.transform);
      });
    });
  });
  return (
    <Wrap
      {...style}
      onMouseEnter={() => resetPosition()}
      onMouseLeave={() => restartPosition()}
    >
      <HorizontalLine className="horizontal line" />
      <VerticalLine className="vertical line" />
      {text.map((t, ti) => (
        <WordWrap className={`wrap ${PART[ti]}`} key={`ti-${ti}`}>
          {t.split("").map((w, wi) => (
            <Word
              key={`ti-${ti}-wi-${wi}`}
              id={`word-${ti}-${wi}-${w}`}
              style={{
                transform:
                  "translateX(" +
                  Math.random() * 125 +
                  "px) translateY(" +
                  Math.random() * 125 +
                  "px)",
              }}
            >
              {w}
            </Word>
          ))}
        </WordWrap>
      ))}
    </Wrap>
  );
}

const Wrap = styled.div<StyleProps>`
  position: relative;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;

  & > .line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    flex: 1;

    ${({ color }) =>
      color
        ? css`
            border: 1px solid ${color};
          `
        : css`
            border: 1px solid #333;
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
  /* position: absolute; */
  /* top: 0;
  left: 0; */
  width: 50%;
  height: 50%;

  /* overflow: hidden; */
  transition: 0.7s;
  display: flex;
  box-sizing: border-box;

  &.one {
    border-radius: 100% 0 0 0;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0 8px 8px 0;
  }

  &.two {
    border-radius: 0 100% 0 0;
    align-items: flex-end;
    padding: 0 0 8px 8px;
  }

  &.three {
    border-radius: 0 0 100% 0;
    justify-content: flex-end;
    padding: 8px 8px 0 0;
  }

  &.four {
    border-radius: 0 0 0 100%;
    padding: 8px 0 0 8px;
  }
`;
const Word = styled.span`
  /* position: absolute; */

  font-size: 2rem;
`;

export default FloatWord;
