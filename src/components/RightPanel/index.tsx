import { Input, List } from "antd";
import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { MdAdd, MdSettings } from "react-icons/md";
import { LIGHT_BLUE } from "../../utils/colors";
import StockRow, { StocksData } from "../StockRow";
import Suggestion from "../Suggestion";
import {
  Add,
  Panel,
  SearchContainer,
  StockHeader,
  StoredStocksContainer,
} from "./styled";

type Props = {
  stocks: StocksData[];
};

type suggestion = {
  name: string;
  symbol: string;
};

const RigthPanel: React.FC<Props> = ({ stocks }) => {
  const [searchText, setSearchText] = React.useState("");
  const [visibleStocks, setVisibleStocks] = React.useState(stocks);
  const [managementMode, setManagementMode] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([
    { name: "Apple", symbol: "AAPL" },
    { name: "Microsoft", symbol: "MSFT" },
  ] as suggestion[]);
  const [addMode, setAddMode] = React.useState(false);

  let inputRef = React.useRef<Input>(null);

  const removeSavedStock = (index: number) => {
    setVisibleStocks((current) => [
      ...current.slice(0, index),
      ...current.slice(index + 1),
    ]);
  };

  React.useEffect(() => {
    setVisibleStocks(
      stocks.filter(
        (stock) =>
          stock.name.indexOf(searchText) !== -1 ||
          stock.symbol.indexOf(searchText) !== -1
      )
    );
  }, [searchText, stocks]);

  return (
    <Panel>
      <SearchContainer>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            prefix={<FiSearch style={{ color: LIGHT_BLUE }} />}
            placeholder="Search"
            value={searchText}
            onChange={(evt) => setSearchText(evt.target.value)}
            ref={inputRef}
          />
          <Add rotate={managementMode ? "rotate(360deg)" : ""}>
            <MdSettings
              onClick={() => {
                setManagementMode((mode) => !mode);
                setAddMode(false);
              }}
            />
          </Add>
        </div>
      </SearchContainer>
      <StoredStocksContainer>
        <StockHeader>
          Saved Items
          {managementMode ? (
            <MdAdd
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() => {
                inputRef.current.focus();
                setAddMode(true);
              }}
            />
          ) : null}
        </StockHeader>
        {!addMode ? (
          <List
            dataSource={visibleStocks}
            renderItem={(item, index) =>
              managementMode ? (
                <Suggestion
                  {...item}
                  existing={true}
                  removeSavedStock={removeSavedStock}
                  index={index}
                />
              ) : (
                <StockRow {...item} />
              )
            }
            rowKey={(item) => item.symbol}
            style={managementMode ? { marginTop: 32 } : {}}
          />
        ) : (
          <List
            renderItem={(item) => <Suggestion {...item} />}
            dataSource={suggestions}
            rowKey={(item) => item.symbol}
            style={{ marginTop: 32 }}
          />
        )}
      </StoredStocksContainer>
    </Panel>
  );
};

export default RigthPanel;
