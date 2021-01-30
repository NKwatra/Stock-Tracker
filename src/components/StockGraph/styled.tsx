import styled from "@emotion/styled";
import { BLACK, GRAY, LIGHT_GRAY, LIGHT_GREEN, RED } from "../../utils/colors";

type PriceProps = {
  readonly increase: boolean;
};

type BoldProps = {
  center?: boolean;
};

type TabProps = {
  selected?: boolean;
};

export const Container = styled.section`
  background: radial-gradient(
    circle farthest-corner at top left,
    #1c1d28 5%,
    ${BLACK} 95%
  );
  padding: 1.5rem;
  border-radius: 10px;
  border: solid 1px ${GRAY};
  height: 66%;
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

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Tab = styled.div<TabProps>`
  color: ${(props) => (props.selected ? "#ffffff" : GRAY)};
  font-weight: 600;
  cursor: pointer;
  background: ${(props) => (props.selected ? LIGHT_GRAY : "transparent")};
  padding: 4px;
  text-align: center;
`;

export const ChartContainer = styled((props) => <div {...props} />)`
  margin-top: 16px;
`;
