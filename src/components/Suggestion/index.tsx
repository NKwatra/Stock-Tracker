import { Divider } from "antd";
import * as React from "react";
import { MdDelete } from "react-icons/md";
import { FetchedStocksResponse } from "../../../pages/api/stocks";
import { GRAY } from "../../utils/colors";
import { hideMessage, showMessage } from "../../utils/miscellanious";
import { ErrorMessage } from "../../utils/network";
import { StocksData } from "../StockRow";
import { Container, Name, Symbol } from "./styled";

type Props = {
  symbol: string;
  name: string;
  existing?: boolean;
  removeSavedStock?: (index: number) => void;
  index?: number;
  addSuggestion?: (
    value: StocksData[] | ((prevValue: StocksData[]) => StocksData[])
  ) => void;
  clearText?: (value: string | ((prevValue: string) => string)) => void;
  setManagementMode?: (
    value: boolean | ((prevValue: boolean) => boolean)
  ) => void;
  setAddMode?: (value: boolean | ((prevValue: boolean) => boolean)) => void;
  setSuggestions?: (
    value:
      | { symbol: string; name: string }[]
      | ((
          prevValue: { symbol: string; name: string }[]
        ) => { symbol: string; name: string }[])
  ) => void;
  setLoading?: (value: boolean | ((prevValue: boolean) => boolean)) => void;
};

const Suggestion: React.FC<Props> = ({
  name,
  symbol,
  existing,
  removeSavedStock,
  index,
  addSuggestion,
  clearText,
  setManagementMode,
  setAddMode,
  setSuggestions,
  setLoading,
}) => {
  const addStock = async () => {
    if (existing) {
      return;
    }
    showMessage("Adding Stock");
    try {
      const response = await fetch(
        `/api/stocks?stocks=${symbol}&names=${name}`
      );
      const json: FetchedStocksResponse | ErrorMessage = await response.json();

      switch (json.status) {
        case "success":
          addSuggestion((current) => [...json.data, ...current]);
          hideMessage(true, "Stock added!");
          localStorage.setItem(
            "stocks",
            localStorage.getItem("stocks") === null
              ? `${symbol}`
              : localStorage.getItem("stocks") + `,${symbol}`
          );
          localStorage.setItem(
            "names",
            localStorage.getItem("names") === null
              ? `${name}`
              : localStorage.getItem("names") + `,${name}`
          );
          setAddMode(false);
          clearText("");
          setManagementMode(false);
          setSuggestions([]);
          setLoading(false);
          break;
        case "error":
          hideMessage(false, "Please try again!");
      }
    } catch (err) {
      console.error(err);
      hideMessage(false, "Please try again!");
    }
  };

  return (
    <>
      <Divider style={{ background: GRAY, margin: "8px 0" }} />
      <Container onClick={addStock}>
        <div>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </div>
        {existing ? (
          <MdDelete
            style={{ fontSize: "1.5rem" }}
            onClick={() => {
              showMessage("Removing...");
              removeSavedStock(index);
              const symbols = localStorage.getItem("stocks").split(",");
              const newStocks = [
                ...symbols.slice(0, index),
                ...symbols.slice(index + 1),
              ].join(",");
              const names = localStorage.getItem("names").split(",");
              const newNames = [
                ...names.slice(0, index),
                ...names.slice(index + 1),
              ].join(",");
              localStorage.setItem("stocks", newStocks);
              localStorage.setItem("names", newNames);
              hideMessage(true, "Removed");
            }}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Suggestion;
