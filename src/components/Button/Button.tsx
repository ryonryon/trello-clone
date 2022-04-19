import { CSSProperties, ReactChild, ReactElement } from "react";
import styled, { css } from "styled-components";

export interface Props {
  title: string;
  textLeft?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function Button({
  title,
  textLeft,
  icon,
  onClick,
  ...props
}: Props) {
  return (
    <Root textLeft={textLeft} onClick={onClick} {...props}>
      {icon ? (
        <Content>
          <IconWrapper>{icon}</IconWrapper>

          {title}
        </Content>
      ) : (
        title
      )}
    </Root>
  );
}

const Root = styled.button<{ textLeft?: boolean }>`
  display: inline-block;
  padding: ${(props) =>
    props.textLeft ? css`8px 24px 8px 8px` : css`8px 24px`};
  text-align: center;
  background-color: #ebecf0;
  border: none;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  color: #6b778c;

  &:hover {
    background-color: #091e4214;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2px;

  & > svg {
    font-size: 18px;
  }
`;
