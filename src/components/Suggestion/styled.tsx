import styled from "@emotion/styled";
import { GRAY } from "../../utils/colors";

export const Container = styled.div`
  cursor: pointer;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Symbol = styled.div`
  font-weight: bold;
  color: #ffffff;
`;

export const Name = styled.div`
  color: ${GRAY};
`;
