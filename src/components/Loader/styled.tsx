import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

type SpinnerProps = {
  width: string;
  height: string;
  color: string;
};

const anim = keyframes`
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
`;

export const Spinner = styled.div<SpinnerProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  text-align: center;
  font-size: 10px;
  margin-left: 45%;
  margin-top: 20%;
  & > div {
    background-color: ${(props) => props.color};
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-left: 2px;
    margin-right: 2px;
    -webkit-animation: ${anim} 1.2s infinite ease-in-out;
    animation: ${anim} 1.2s infinite ease-in-out;
  }
`;
export const RectOne = styled.div``;
export const RectTwo = styled.div`
  -webkit-animation-delay: -1.1s !important;
  animation-delay: -1.1s !important;
`;
export const RectThree = styled.div`
  -webkit-animation-delay: -1s !important;
  animation-delay: -1s !important;
`;
export const RectFour = styled.div`
  -webkit-animation-delay: -0.9s !important;
  animation-delay: -0.9s !important;
`;

export const RectFive = styled.div`
  -webkit-animation-delay: -0.8s !important;
  animation-delay: -0.8s !important;
`;
