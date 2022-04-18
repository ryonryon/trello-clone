import { CSSProperties, ReactChild } from "react";
import styled from "styled-components";

export interface Props {
  onClick?: () => void;
  children?: ReactChild | ReactChild[];
  className?: string;
  style?: CSSProperties;
}

export default function Card({ children, ...props }: Props) {
  return <Root {...props}>{children}</Root>;
}

const Root = styled.div`
  display: inline-block;
  border-radius: 8px;
  box-shadow: 0 1px 0 #091e4240;
`;
