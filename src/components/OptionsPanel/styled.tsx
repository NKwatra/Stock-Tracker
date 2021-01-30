import styled from "@emotion/styled";
import { GRAY } from "../../utils/colors";

export const Container = styled.section`
  height: 100%;
  width: 100%;
  background: radial-gradient(
    circle farthest-side at 0%,
    #07060b 5%,
    #24232d 85%
  );
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border: solid 4px ${GRAY};
  border-right-width: 1px;
`;
