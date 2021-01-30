import { Col, Divider, Row } from "antd";
import React from "react";
import { GRAY } from "../../utils/colors";
import { StocksData } from "../StockRow";
import { Bold, Change, Container, Name } from "./styled";

type Props = {
  company: StocksData;
};

const StockGraph: React.FC<Props> = ({ company }) => {
  const increase =
    company.values[company.values.length - 1].price - company.values[0].price;

  return (
    <Container>
      <Row>
        <Col span={18}>
          <Bold>{company.symbol}</Bold>
          <Name>{company.name}</Name>
        </Col>
        <Col span={6} style={{ display: "flex", flexDirection: "column" }}>
          <Bold center>
            $ {company.values[company.values.length - 1].price.toFixed(2)}
          </Bold>
          <Change increase={increase >= 0}>({increase.toFixed(2)})</Change>
        </Col>
      </Row>
      <Divider style={{ background: GRAY, marginTop: 8, marginBottom: 8 }} />
    </Container>
  );
};

export default StockGraph;
