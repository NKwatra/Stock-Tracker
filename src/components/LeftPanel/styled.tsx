import styled from "@emotion/styled";
import { GRAY } from "../../utils/colors";

export const Container = styled.section`
  background: radial-gradient(
    circle farthest-corner at top left,
    #07060b 5%,
    #24232d 85%
  );
  width: 100%;
  height: 100%;
  border: solid 4px ${GRAY};
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right-width: 1px;
`;
