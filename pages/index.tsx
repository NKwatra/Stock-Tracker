import { Col, Row } from "antd";
import * as React from "react";
import LeftPanel from "../src/components/LeftPanel";
import Loader from "../src/components/Loader";
import RigthPanel from "../src/components/RightPanel";
import { StocksData } from "../src/components/StockRow";
import { LIGHT_GREEN } from "../src/utils/colors";
import { ErrorMessage } from "../src/utils/network";
import { Container } from "../styled";
import { FetchedStocksResponse } from "./api/stocks";

const Index: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [stocksData, setStocksData] = React.useState([] as StocksData[]);

  React.useEffect(() => {
    const stocks = localStorage.getItem("stocks");
    const names = localStorage.getItem("names");
    if (stocks !== null) {
      fetch(`/api/stocks?stocks=${stocks}&names=${names}`).then((response) => {
        response.json().then((json: ErrorMessage | FetchedStocksResponse) => {
          switch (json.status) {
            case "success":
              setStocksData(json.data);
              break;
            case "error":
              setStocksData([]);
              alert("error in fetching data");
              break;
          }
          setLoading(false);
        });
      });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <Container>
      <Row style={{ width: "100%", height: "100%" }}>
        {loading ? (
          <Col
            span={24}
            style={{
              width: "100%",
              height: "100%",
              background: `radial-gradient( circle farthest-corner at top left,#07060b 5%,#24232d 85%)`,
            }}
          >
            <Loader color={LIGHT_GREEN} width="10%" height="30%" />
          </Col>
        ) : (
          <Col
            span={22}
            style={{ height: "90%", marginTop: "2.5%" }}
            offset={1}
          >
            <Row style={{ height: "100%" }}>
              <Col span={16}>
                <LeftPanel />
              </Col>
              <Col span={8} style={{ height: "100%" }}>
                <RigthPanel stocks={stocksData} setStocksData={setStocksData} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Index;
