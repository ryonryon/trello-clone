import { CSSProperties } from "react";
import styled from "styled-components";

export interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Card({ children, ...props }: Props): JSX.Element {
  return <Root {...props}>{children}</Root>;
}

const Root = styled.div`
  display: inline-block;
  border-radius: 4px;
  box-shadow: 0 1px 0 #091e4240;
`;
