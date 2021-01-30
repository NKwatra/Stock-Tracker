import { Col, Divider, Row } from "antd";
import moment from "moment";
import React from "react";
import { FetchedStocksResponse } from "../../../pages/api/stocks";
import { GRAY, LIGHT_GREEN } from "../../utils/colors";
import { ErrorMessage } from "../../utils/network";
import Loader from "../Loader";
import StockChart from "../StockChart";
import { StocksData } from "../StockRow";
import { Bold, Change, Container, Name, Tab, TabContainer } from "./styled";

type Props = {
  company: StocksData;
};

type graphParams = [string, number, number];

const tabs = ["1D", "1W", "1M", "3M", "6M", "1Y"];

const StockGraph: React.FC<Props> = ({ company }) => {
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState(1);
  const [values, setValues] = React.useState([] as { price: number }[]);
  const [graphParams, setGraphParams] = React.useState(
    ([] as unknown) as graphParams
  );

  React.useEffect(() => {
    const [resolution, from, to] = getResolution(selected);
    setGraphParams([resolution as string, from as number, to as number]);
  }, [selected]);

  const getSeconds = React.useCallback((resolution: string) => {
    switch (resolution) {
      case "5":
      case "60":
        return parseInt(resolution) * 60;
      case "D":
        return 24 * 60 * 60;
      default:
        return 7 * 24 * 60 * 60;
    }
  }, []);

  const getResolution = React.useCallback((index: number) => {
    let resolution: string, from: number, to: number;
    to = moment().unix();
    switch (index) {
      case 0:
        resolution = "5";
        from = moment().subtract(1, "d").unix();
        break;
      case 1:
        resolution = "60";
        from = moment().subtract(1, "w").unix();
        break;
      case 2:
        resolution = "D";
        from = moment().subtract(1, "M").unix();
        break;
      case 3:
        resolution = "D";
        from = moment().subtract(3, "M").unix();
        break;
      case 4:
        resolution = "W";
        from = moment().subtract(6, "M").unix();
        break;
      default:
        resolution = "W";
        from = moment().subtract(1, "y").unix();
        break;
    }
    return [resolution, from, to];
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const [resolution, from, to] =
      graphParams.length > 0 ? graphParams : getResolution(selected);
    console.log(resolution, graphParams);
    fetch(
      `/api/stocks?stocks=${company.symbol}&names=${company.name}&resolution=${resolution}&from=${from}&to=${to}`
    ).then((response) => {
      response.json().then((json: ErrorMessage | FetchedStocksResponse) => {
        switch (json.status) {
          case "success":
            setValues(json.data.map((entry) => entry.values)[0]);
            break;
          case "error":
            setValues([]);
            alert("error in fetching data");
            break;
        }
        setLoading(false);
      });
    });
  }, [company]);

  const onTabClick = (index: number) => {
    setSelected(index);
    setLoading(true);
    const [resolution, from, to] = getResolution(index);
    fetch(
      `/api/stocks?stocks=${company.symbol}&names=${company.name}&resolution=${resolution}&from=${from}&to=${to}`
    )
      .then((response) => response.json())
      .then((json: ErrorMessage | FetchedStocksResponse) => {
        switch (json.status) {
          case "success":
            setValues(json.data.map((entry) => entry.values)[0]);
            break;
          case "error":
            setValues([]);
            alert("error in fetching data");
            break;
        }
        setLoading(false);
      });
  };

  const chartContainerRef = React.useRef<HTMLDivElement>(null);

  const increase = company?.values
    ? company?.values[company?.values?.length - 1].price -
      company?.values[0].price
    : 0.0;

  if (Object.keys(company).length === 0) return null;

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
      <TabContainer>
        {tabs.map((tab, index) => (
          <Tab
            key={tab}
            selected={index === selected}
            onClick={() => onTabClick(index)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      <div
        ref={chartContainerRef}
        style={{ marginTop: 16, width: "100%", height: "100%" }}
      >
        {loading ? (
          <Loader
            width="100%"
            height="30%"
            color={LIGHT_GREEN}
            top="20%"
            left="0%"
          />
        ) : (
          <StockChart
            width={chartContainerRef.current.clientWidth}
            height={300}
            grid
            increase={values[values.length - 1].price >= values[0].price}
            values={values}
            tooltip
            axis
            start={graphParams[1]}
            resolution={getSeconds(graphParams[0])}
          />
        )}
      </div>
    </Container>
  );
};

export default StockGraph;
