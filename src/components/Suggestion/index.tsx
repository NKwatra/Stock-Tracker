import { Divider } from "antd";
import { MdDelete } from "react-icons/md";
import { GRAY } from "../../utils/colors";
import { Container, Name, Symbol } from "./styled";

type Props = {
  symbol: string;
  name: string;
  existing?: boolean;
  removeSavedStock?: (index: number) => void;
  index?: number;
};

const Suggestion: React.FC<Props> = ({
  name,
  symbol,
  existing,
  removeSavedStock,
  index,
}) => {
  return (
    <>
      <Divider style={{ background: GRAY, margin: "8px 0" }} />
      <Container>
        <div>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </div>
        {existing ? (
          <MdDelete
            style={{ fontSize: "1.5rem" }}
            onClick={() => removeSavedStock(index)}
          />
        ) : null}
      </Container>
    </>
  );
};

export default Suggestion;
