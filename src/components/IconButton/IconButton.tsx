import { CSSProperties } from "react";
import styled from "styled-components";

export interface Props {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function IconButton({ children, ...props }: Props): JSX.Element {
  return (
    <Root data-testid="icon_button" {...props}>
      {children}
    </Root>
  );
}

const Root = styled.div`
  display: block;
  width: 20px;
  height: 20px;
  padding: 4px;
  border-radius: 2px;
  cursor: pointer;

  &:hover {
    background-color: #091e4214;
  }

  & > svg {
    font-size: 20px;
    color: #6b778c;
  }
`;
