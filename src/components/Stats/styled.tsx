import styled from "@emotion/styled";
import { BLACK, GRAY } from "../../utils/colors";

export const Container = styled.section`
  background: radial-gradient(
    circle farthest-corner at top left,
    #1c1d28 5%,
    ${BLACK} 95%
  );
  width: 100%;
  height: 33%;
  margin-top: 1%;
  border: solid 1px ${GRAY};
  border-radius: 10px;
  padding: 16px;
`;

export const Heading = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 16px;
  text-transform: uppercase;
  color: #ffffff;
`;
