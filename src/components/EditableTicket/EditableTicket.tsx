import { useEffect, CSSProperties, FormEvent, KeyboardEvent, useRef, useState } from "react";
import styled from "styled-components";

import Card from "../Card";

export interface EditableTicketProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  style?: CSSProperties;
}

export default function EditableTicket({
  value: _value = "",
  placeholder = "",
  onChange = () => {},
  onEnter = () => {},
  onBlur = () => {},
  className,
  style,
}: EditableTicketProps): JSX.Element {
  const [value, setValue] = useState(_value);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
    onChange(event.currentTarget.value);
  };

  const handleBlur = () => {
    setValue("");
    onBlur();
  };

  const handleKeyDown = ({ key }: KeyboardEvent<HTMLTextAreaElement>) => {
    if (key === "Enter") {
      ref.current?.blur();
      setValue("");
      onEnter(value);
    }

    if (key === "Escape") {
      ref.current?.blur();
      setValue("");
      onBlur();
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
  font-family: inherited;

  &:focus {
    outline: none;
  }
`;
