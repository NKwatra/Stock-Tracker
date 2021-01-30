import { Input, List } from "antd";
import * as React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { MdAdd, MdSettings } from "react-icons/md";
import { SuggestionResponse } from "../../../pages/api/search";
import { LIGHT_BLUE } from "../../utils/colors";
import { ErrorMessage } from "../../utils/network";
import StockRow, { StocksData } from "../StockRow";
import Suggestion from "../Suggestion";
import {
  Add,
  Panel,
  SearchContainer,
  Spin,
  StockHeader,
  StoredStocksContainer,
} from "./styled";

type Props = {
  stocks: StocksData[];
  setStocksData: (
    value: StocksData[] | ((prevValue: StocksData[]) => StocksData[])
  ) => void;
  selected: StocksData;
  setSelected: (
    value: StocksData | ((prevValue: StocksData) => StocksData)
  ) => void;
};

type suggestion = {
  name: string;
  symbol: string;
};

const RigthPanel: React.FC<Props> = ({
  stocks,
  setStocksData,
  setSelected,
  selected,
}) => {
  const [searchText, setSearchText] = React.useState("");
  const [visibleStocks, setVisibleStocks] = React.useState(stocks);
  const [managementMode, setManagementMode] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState([] as suggestion[]);
  const [addMode, setAddMode] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);

  let inputRef = React.useRef<Input>(null);

  const removeSavedStock = (index: number) => {
    setStocksData((current) => [
      ...current.slice(0, index),
      ...current.slice(index + 1),
    ]);
  };

  React.useEffect(() => {
    if (addMode && searchText !== "") {
      setShowLoading(true);
      const delayDebounce = setTimeout(async () => {
        const response = await fetch(`/api/search?search=${searchText}`);
        const data:
          | { suggestions: SuggestionResponse[]; status: "success" }
          | ErrorMessage = await response.json();
        switch (data.status) {
          case "success":
            setSuggestions(data.suggestions);
            break;
          case "error":
            setSuggestions([]);
        }
        setShowLoading(false);
      }, 200);
      return () => clearTimeout(delayDebounce);
    } else {
      setVisibleStocks(
        stocks.filter(
          (stock) =>
            stock?.name?.indexOf(searchText) !== -1 ||
            stock?.symbol?.indexOf(searchText) !== -1
        )
      );
    }
  }, [searchText, stocks, addMode]);

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
            suffix={
              showLoading ? (
                <Spin>
                  <AiOutlineLoading3Quarters style={{ color: LIGHT_BLUE }} />
                </Spin>
              ) : null
            }
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
                <StockRow
                  {...item}
                  onClick={() => {
                    setSelected({ ...item });
                    setSearchText("");
                  }}
                  selected={selected.symbol === item.symbol}
                />
              )
            }
            rowKey={(item) => item.symbol}
            style={managementMode ? { marginTop: 32 } : {}}
          />
        ) : (
          <List
            renderItem={(item) => (
              <Suggestion
                {...item}
                addSuggestion={setStocksData}
                setAddMode={setAddMode}
                clearText={setSearchText}
                setSuggestions={setSuggestions}
                setManagementMode={setManagementMode}
                setLoading={setShowLoading}
              />
            )}
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
