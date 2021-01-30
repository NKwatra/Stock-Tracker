import { StocksData } from "../StockRow";
import { Container, Heading } from "./styled";

type Props = {
  company: StocksData;
};

const Stats: React.FC<Props> = ({ company }) => {
  if (Object.keys(company).length === 0) return null;
  return (
    <Container>
      <Heading>Statistics Overview</Heading>
    </Container>
  );
};

export default Stats;
