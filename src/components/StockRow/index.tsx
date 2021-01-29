import { Col, Divider, Row } from "antd";
import * as React from "react";
import { Area, AreaChart } from "recharts";
import {
  BLACK,
  GRAY,
  GREEN,
  LIGHT_GREEN,
  MEHROON,
  RED,
} from "../../utils/colors";
import { Bold, Change, Name } from "./styled";

export interface StocksData {
  name: string;
  symbol: string;
  values: { price: number }[];
}

const StockRow: React.FC<StocksData> = ({ name, symbol, values }) => {
  const increase = values[values.length - 1].price >= values[0].price;
  return (
    <>
      <Divider
        style={{
          background: GRAY,
        }}
      />
      <Row style={{ cursor: "pointer" }}>
        <Col span={10}>
          <Bold>{symbol}</Bold>
          <Name>{name}</Name>
        </Col>
        <Col span={8}>
          <AreaChart data={values} width={150} height={60}>
            <defs>
              <linearGradient id="gradientDecrease" x1={0} x2={0} y1={0} y2={1}>
                <stop offset="0%" stopColor={RED} />
                <stop offset="80%" stopColor={MEHROON} />
                <stop offset="100%" stopColor={BLACK} />
              </linearGradient>
              <linearGradient id="gradientIncrease" x1={0} x2={0} y1={0} y2={1}>
                <stop offset="0%" stopColor={LIGHT_GREEN} />
                <stop offset="70%" stopColor={GREEN} />
                <stop offset="100%" stopColor={BLACK} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              fill={
                increase ? "url(#gradientIncrease)" : "url(#gradientDecrease)"
              }
              stroke={increase ? LIGHT_GREEN : RED}
              strokeWidth={3}
              dataKey="price"
            />
          </AreaChart>
        </Col>
        <Col span={6} style={{ paddingLeft: 24 }}>
          <Bold>{values[values.length - 1].price.toFixed(2)}</Bold>
          <Change increase={increase}>
            {increase ? "+" : ""}
            {(values[values.length - 1].price - values[0].price).toFixed(2)}
          </Change>
        </Col>
      </Row>
    </>
  );
};

export default StockRow;
