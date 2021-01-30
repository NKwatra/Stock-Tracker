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
  left: string;
  top: string;
};

const Loader: React.FC<Props> = ({ width, height, color, left, top }) => {
  return (
    <Spinner width={width} height={height} color={color} left={left} top={top}>
      <RectOne />
      <RectTwo />
      <RectThree />
      <RectFour />
      <RectFive />
    </Spinner>
  );
};

export default Loader;
