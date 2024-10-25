import { ComponentPropsWithRef, useRef } from "react";
import { Input } from "../index.styled";

interface InputTextProps extends ComponentPropsWithRef<"input"> {
  type?: "text" | "number";
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputText = ({
  type = "text",
  value,
  onChange,
  ...rest
}: InputTextProps) => {
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
  const focusHandler = () => {
    inputRef.current.focus();
  };
  return (
    <Input.Container onClick={focusHandler}>
      <Input.Text
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Input.Container>
  );
};

export default InputText;
