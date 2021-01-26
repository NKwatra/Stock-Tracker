import { Divider } from "antd";
import { GRAY } from "../../utils/colors";
import { Container, Name, Symbol } from "./styled";

type Props = {
  symbol: string;
  name: string;
};

const Suggestion: React.FC<Props> = ({ name, symbol }) => {
  return (
    <Container>
      <Symbol>{symbol}</Symbol>
      <Name>{name}</Name>
      <Divider style={{ background: GRAY, margin: "4px 0" }} />
    </Container>
  );
};

export default Suggestion;
