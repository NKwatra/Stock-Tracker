import { Col, Divider, Row } from "antd";
import * as React from "react";
import { GRAY } from "../../utils/colors";
import StockChart from "../StockChart";
import { Bold, Change, Entry, Name } from "./styled";

export interface StocksData {
  name: string;
  symbol: string;
  values: { price: number }[];
}

interface Props extends StocksData {
  selected: boolean;
  onClick: () => void;
}

const StockRow: React.FC<Props> = ({
  name,
  symbol,
  values,
  onClick,
  selected,
}) => {
  const increase = values[values.length - 1].price >= values[0].price;
  return (
    <Entry selected={selected}>
      <Divider
        style={{
          background: GRAY,
        }}
      />
      <Row style={{ cursor: "pointer" }} onClick={onClick}>
        <Col span={10}>
          <Bold>{symbol}</Bold>
          <Name>{name}</Name>
        </Col>
        <Col span={8}>
          <StockChart
            width={150}
            height={60}
            values={values}
            increase={increase}
          />
        </Col>
        <Col span={6} style={{ paddingLeft: 24 }}>
          <Bold>{values[values.length - 1].price.toFixed(2)}</Bold>
          <Change increase={increase}>
            {increase ? "+" : ""}
            {(values[values.length - 1].price - values[0].price).toFixed(2)}
          </Change>
        </Col>
      </Row>
    </Entry>
  );
};

export default StockRow;
