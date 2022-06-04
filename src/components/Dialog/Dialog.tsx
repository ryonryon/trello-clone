import { CSSProperties, KeyboardEvent } from "react";
import { Close } from "@material-ui/icons";
import styled from "styled-components";
import _IconButton from "../IconButton";

interface DialogProps {
  isOpen: boolean;
  disableCloseButton?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function Dialog({
  isOpen,
  disableCloseButton = false,
  onClose = () => {},
  children,
  ...props
}: DialogProps): JSX.Element {
  const handleKeyDown = ({ key }: KeyboardEvent<HTMLDivElement>) => {
    if (key === "Escape") {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <Root data-testid="dialog" onKeyDown={handleKeyDown}>
          {!disableCloseButton && (
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          )}

          <Container>
            <Content {...props}>{children}</Content>
          </Container>
        </Root>
      )}
    </>
  );
}

const Root = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #000000a3;
  z-index: 10;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  juestify-content: center;

  & > div {
    margin-bottom: 16px;
  }

  & > div:last-child {
    margin-bottom: 0;
  }
`;

const IconButton = styled(_IconButton)`
  position: fixed;
  top: 0;
  right: 0;
  margin: 8px;

  & > svg {
    color: #fff9;
  }

  &:hover > svg {
    color: #fff;
  }
`;

const Content = styled.div``;
