import React from "react";
import { Area, AreaChart, CartesianGrid, Tooltip } from "recharts";
import { BLACK, GREEN, LIGHT_GREEN, MEHROON, RED } from "../../utils/colors";

type Props = {
  increase: boolean;
  width: number;
  height: number;
  grid?: boolean;
  values: { price: number }[];
  tooltip?: boolean;
  resolution?: number;
  start?: number;
  axis?: boolean;
};

const StockChart: React.FC<Props> = ({
  increase,
  width,
  height,
  grid,
  values,
  tooltip,
  start,
  resolution,
  axis,
}) => {
  let horizontalPoints: number[] = [],
    verticalPoints: number[] = [];
  for (let i = 0; i < 6; i++) {
    horizontalPoints.push((i * height) / 5);
  }
  for (let i = 0; i < 13; i++) {
    verticalPoints.push((i * width) / 12);
  }
  return (
    <AreaChart data={values} width={width} height={height}>
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
        fill={increase ? "url(#gradientIncrease)" : "url(#gradientDecrease)"}
        stroke={increase ? LIGHT_GREEN : RED}
        strokeWidth={3}
        dataKey="price"
      />
      {grid ? (
        <CartesianGrid
          horizontalPoints={horizontalPoints}
          verticalPoints={verticalPoints}
          style={{ stroke: "rgba(86,86,92,0.5)" }}
        />
      ) : null}
      {tooltip ? <Tooltip /> : null}(
      {/* {axis ? (
        <XAxis
          tickFormatter={(_: any, index: number) => {
            console.log(
              index,
              moment.unix(start + index * resolution).format("do MMM, YYYY"),
              resolution,
              start
            );
            return moment
              .unix(start + index * resolution)
              .format("do MMM, YYYY");
          }}
        />
      ) : null} */}
    </AreaChart>
  );
};

export default StockChart;
