import styled from "@emotion/styled";
import { GRAY } from "../../utils/colors";

export const Container = styled.section`
  background: radial-gradient(circle at center, #07060b 5%, #24232d 85%);
  width: 100%;
  height: 100%;
  border: solid 4px ${GRAY};
  border-right-width: 1px;
  border-left-width: 1px;
  padding: 1rem;
`;
