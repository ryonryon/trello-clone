import { useEffect } from "react";
import { CSSProperties, FormEvent, KeyboardEvent, useRef, useState } from "react";
import styled from "styled-components";

export interface RootBodyProps {
  value?: string;
  placeholder?: string;
  onBlur?: (value: string) => void;
  onChange?: (inputStr: string) => void;
  className?: string;
  style?: CSSProperties;
}

export default function EditableLabel({
  value: initValue = "",
  onBlur = () => {},
  onChange,
  ...props
}: RootBodyProps): JSX.Element {
  const [value, setValue] = useState<string>(initValue);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange && onChange(e.currentTarget.value);
  };

  const handleBlur = () => {
    onBlur(value);
  };

  const handleKeyDown = ({ key }: KeyboardEvent) => {
    if (key === "Enter" || key === "Escape") {
      ref.current?.blur();

      onBlur(value);
    }
  };

  return (
    <Root
      aria-label="editable-label"
      ref={ref}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
}

const Root = styled.input`
  border: none;
  background-color: inherit;
  padding-left: 4px;
  min-height: 24px;
  font-size: 16px;
`;
