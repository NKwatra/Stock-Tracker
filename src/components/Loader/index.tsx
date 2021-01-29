import {
  RectFive,
  RectFour,
  RectOne,
  RectThree,
  RectTwo,
  Spinner,
} from "./styled";

type Props = {
  width: string;
  height: string;
  color: string;
};

const Loader: React.FC<Props> = ({ width, height, color }) => {
  return (
    <Spinner width={width} height={height} color={color}>
      <RectOne />
      <RectTwo />
      <RectThree />
      <RectFour />
      <RectFive />
    </Spinner>
  );
};

export default Loader;
