import { Header, Line, Subhead } from "./styled";

const Logo: React.FC = () => {
  return (
    <>
      <Header>
        <span>Stock</span>
        <Subhead>Tracker</Subhead>
      </Header>
      <Line />
    </>
  );
};

export default Logo;
