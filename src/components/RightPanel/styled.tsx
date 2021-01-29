import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { GRAY, INPUT_COLOR, LIGHT_BLUE } from "../../utils/colors";

type AddProps = {
  rotate: string;
};

export const StoredStocksContainer = styled.div`
  color: #ffffff;
`;

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg)
  }

  50% {
    transform: rotate(180deg)
  }

  100% {
    transform: rotate(360deg)
  }
`;

export const Panel = styled.section`
  background: radial-gradient(
    circle farthest-side at 100%,
    #07060b 5%,
    #24232d 85%
  );
  height: 100%;
  padding: 32px 24px;
  border: solid 4px ${GRAY};
  border-left-width: 1px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: scroll;
  input[type="text"] {
    background-color: ${INPUT_COLOR};
    color: ${LIGHT_BLUE};
  }
  & span {
    background-color: ${INPUT_COLOR};
    border-color: ${INPUT_COLOR};
    color: ${LIGHT_BLUE};
    border-radius: 8px;
  }
  & span:hover {
    border-color: ${INPUT_COLOR};
  }
  & span:focus {
    outline: none;
    border: none;
    box-shadow: 0px 0px !important;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
`;

export const StockHeader = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: ${GRAY};
  margin-bottom: -24px;
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const SuggestionsContainer = styled.div`
  position: absolute;
  left: 4px;
  right: 44px;
  top: 40px;
  background: BLACK;
  z-index: 100;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-bottom: 8px;
`;

export const Add = styled.span<AddProps>`
  color: ${LIGHT_BLUE};
  font-size: 1.5rem;
  margin-left: 16px;
  cursor: pointer;
  background: transparent !important;
  padding: 0;
  padding-top: 4px;
  transform: ${(props) => props.rotate};
  transition: transform 0.5s;
`;

export const Spin = styled.span`
  animation: ${loaderAnimation} 1s linear infinite;
`;
