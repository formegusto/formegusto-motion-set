import { keyframes } from "styled-components";

type TextAniProps = {
  x?: number;
  y?: number;
};

export const TextAnimationGen = ({ x = 30, y = 30 }: TextAniProps) => keyframes`
    30% {
        transform: translateY(${y / 2}px)
    } 70% {
        transform: translateX(${x / 2} px) translateY(${y / 4}px)
    } 100% {
        transform: translateX(0px) translateY(0px) forwards !important;
    }
`;
