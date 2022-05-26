import { useEffect } from "react";
import { CSSProperties, FormEvent, KeyboardEvent, useRef, useState } from "react";
import styled from "styled-components";

import Card from "../Card";

export interface EditableTicketProps {
  value?: string;
  placeholder?: string;
  onBlur?: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}

export default function EditableTicket({
  value: _value = "",
  placeholder = "",
  onBlur = () => {},
  className,
  style,
}: EditableTicketProps): JSX.Element {
  const [value, setValue] = useState(_value);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === "Enter" || key === "Escape") {
      ref.current?.blur();

      onBlur(value);
    }
  };

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <_Card className={className} style={style}>
      <Content>
        <Textarea
          aria-label="editable-ticket"
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      </Content>
    </_Card>
  );
}

const _Card = styled(Card)`
  box-sizing: border-box;
  background-color: #ffffff;
  padding: 6px 4px 4px 8px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;

  & > div:last-child {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
`;

const Textarea = styled.textarea`
  border: none;
  background-color: inherit;
  padding-left: 4px;
  min-height: 24px;
  font-size: 16px;
  width: 100%;
  min-height: 80px;
  resize: none;

  &:focus {
    outline: none;
  }
`;