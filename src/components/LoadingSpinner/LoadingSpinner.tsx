import styled from "styled-components";

type Size = "S" | "M" | "L";

const SMALL_CIRCLE = "15px";
const MEDIUM_CIRCLE = "30px";
const LARGE_CIRCLE = "50px";

const SMALL_BORDER = "2.5px";
const MEDIUM_BORDER = "3.5px";
const LARGE_BORDER = "5px";

const getCircleSize = (size: Size) => (size === "S" ? SMALL_CIRCLE : size === "M" ? MEDIUM_CIRCLE : LARGE_CIRCLE);
const getBorderSize = (size: Size) => (size === "S" ? SMALL_BORDER : size === "M" ? MEDIUM_BORDER : LARGE_BORDER);

interface LoadingSpinnerProps {
  size: Size;
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps): JSX.Element {
  return <Spinner size={size}></Spinner>;
}

const Spinner = styled.div<{ size: LoadingSpinnerProps["size"] }>`
  animation: rotate 1s linear infinite;
  width: ${({ size }) => getCircleSize(size)};
  height: ${({ size }) => getCircleSize(size)};
  border: ${({ size }) => getBorderSize(size)} solid #f3f3f3;
  border-top: ${({ size }) => getBorderSize(size)} solid #383636;
  border-radius: 50%;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;
