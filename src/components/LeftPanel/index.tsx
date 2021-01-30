import * as React from "react";
import Stats from "../Stats";
import StockGraph from "../StockGraph";
import { StocksData } from "../StockRow";
import { Container } from "./styled";

type Props = {
  company: StocksData;
};

const LeftPanel: React.FC<Props> = ({ company }) => {
  return (
    <Container>
      <StockGraph company={company} />
      <Stats company={company} />
    </Container>
  );
};

export default LeftPanel;
