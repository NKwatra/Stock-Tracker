import { Input, List } from "antd";
import * as React from "react";
import { FiSearch } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { LIGHT_BLUE } from "../../utils/colors";
import StockRow, { StocksData } from "../StockRow";
import Suggestion from "../Suggestion";
import {
  Add,
  Panel,
  SearchContainer,
  StockHeader,
  StoredStocksContainer,
  SuggestionsContainer,
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
  const [suggestions, setSuggestions] = React.useState([] as suggestion[]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [visibleStocks, setVisibleStocks] = React.useState(stocks);

  let inputRef = React.useRef<Input>(null);

  React.useEffect(() => {
    if (showSuggestions) {
      const delayDebounce = setTimeout(() => {
        if (searchText === "") return;
      }, 200);

      return () => clearTimeout(delayDebounce);
    } else {
      setVisibleStocks(
        stocks.filter(
          (stock) =>
            stock.name.indexOf(searchText) !== -1 ||
            stock.symbol.indexOf(searchText) !== -1
        )
      );
    }
  }, [searchText, showSuggestions, stocks]);

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
          <Add rotate={showSuggestions ? "rotate(-45deg)" : ""}>
            <MdAdd
              onClick={() => {
                setShowSuggestions((current) => !current);
                setSearchText("");
                if (!showSuggestions) {
                  inputRef.current?.focus();
                } else {
                  inputRef.current?.blur();
                }
              }}
            />
          </Add>
        </div>
        {showSuggestions ? (
          <SuggestionsContainer>
            <List
              renderItem={(item) => <Suggestion {...item} />}
              dataSource={suggestions}
              rowKey={(item) => item.symbol}
            />
          </SuggestionsContainer>
        ) : null}
      </SearchContainer>
      <StoredStocksContainer>
        <StockHeader>Saved Items</StockHeader>
        <List
          dataSource={visibleStocks}
          renderItem={(item) => <StockRow {...item} />}
          rowKey={(item) => item.symbol}
        />
      </StoredStocksContainer>
    </Panel>
  );
};

export default RigthPanel;
