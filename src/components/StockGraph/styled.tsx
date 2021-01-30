import styled from "@emotion/styled";
import { BLACK, GRAY, LIGHT_GREEN, RED } from "../../utils/colors";

type PriceProps = {
  readonly increase: boolean;
};

type BoldProps = {
  center?: boolean;
};

export const Container = styled.section`
  background: ${BLACK};
  padding: 1.5rem;
  border-radius: 10px;
  border-color: solid 1px ${GRAY};
  height: 60%;
  color: #ffffff;
`;

export const Name = styled.div`
  color: ${GRAY};
`;

export const Bold = styled.div<BoldProps>`
  color: #ffffff;
  font-weight: bold;
  font-size: 1.2rem;
  align-self: ${(props) => (props.center ? "center" : "flex-start")};
`;

export const Change = styled.div<PriceProps>`
  color: ${(props) => (props.increase ? LIGHT_GREEN : RED)};
  font-weight: 700;
  align-self: center;
`;
