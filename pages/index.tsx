import { Col, Row } from "antd";
import * as React from "react";
import RigthPanel from "../src/components/RightPanel";
import { Container } from "../styled";

const stocksData = [
  {
    name: "Starbucks Corporation",
    symbol: "SBUX",
    values: [
      { price: 120.05 },
      { price: 92.07 },
      { price: 100.37 },
      { price: 131.76 },
      { price: 84.09 },
      { price: 100.87 },
      { price: 105.06 },
    ],
  },
  {
    name: "American Express",
    symbol: "AMEX",
    values: [
      { price: 100.05 },
      { price: 102.07 },
      { price: 100.37 },
      { price: 101.76 },
      { price: 104.09 },
      { price: 100.87 },
      { price: 102.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBAX",
    values: [
      { price: 120.05 },
      { price: 92.07 },
      { price: 100.37 },
      { price: 131.76 },
      { price: 84.09 },
      { price: 100.87 },
      { price: 105.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBEX",
    values: [
      { price: 100.05 },
      { price: 102.07 },
      { price: 100.37 },
      { price: 101.76 },
      { price: 104.09 },
      { price: 100.87 },
      { price: 102.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBQX",
    values: [
      { price: 120.05 },
      { price: 92.07 },
      { price: 100.37 },
      { price: 131.76 },
      { price: 84.09 },
      { price: 100.87 },
      { price: 105.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBMX",
    values: [
      { price: 100.05 },
      { price: 102.07 },
      { price: 100.37 },
      { price: 101.76 },
      { price: 104.09 },
      { price: 100.87 },
      { price: 102.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBOX",
    values: [
      { price: 120.05 },
      { price: 92.07 },
      { price: 100.37 },
      { price: 131.76 },
      { price: 84.09 },
      { price: 100.87 },
      { price: 105.06 },
    ],
  },
  {
    name: "Starbucks Corporation",
    symbol: "SBPX",
    values: [
      { price: 100.05 },
      { price: 102.07 },
      { price: 100.37 },
      { price: 101.76 },
      { price: 104.09 },
      { price: 100.87 },
      { price: 102.06 },
    ],
  },
];

const Index: React.FC = () => {
  return (
    <Container>
      <Row style={{ width: "100%", height: "100%" }}>
        <Col span={16}>Hello</Col>
        <Col span={8} style={{ height: "100%" }}>
          <RigthPanel stocks={stocksData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
