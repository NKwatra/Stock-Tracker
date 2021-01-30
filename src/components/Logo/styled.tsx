import styled from "@emotion/styled";
import { MEDIUM_BLUE } from "../../utils/colors";

export const Header = styled.h1`
  color: ${MEDIUM_BLUE};
  text-transform: uppercase;
  font-weight: 300;
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
  padding-bottom: 0;
  margin-bottom: 0;
`;

export const Subhead = styled.span`
  font-weight: 500;
  color: #ffffff;
  margin-left: 8px;
`;

export const Line = styled.div`
  height: 3px;
  width: 80%;
  background: #ffffff;
  margin-left: 10%;
  margin-top: 0;
`;
