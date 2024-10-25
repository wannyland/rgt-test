import { ComponentPropsWithRef, useRef } from "react";
import { Input } from "../index.styled";

interface InputTextProps extends ComponentPropsWithRef<"input"> {
  type?: "text" | "number";
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  $disabled?: boolean;
}
const InputText = ({
  type = "text",
  value,
  $disabled = false,
  onChange,
  ...rest
}: InputTextProps) => {
  const inputRef = useRef<HTMLInputElement>(document.createElement("input"));
  const focusHandler = () => {
    inputRef.current.focus();
  };
  return (
    <Input.Container $disabled={$disabled} onClick={focusHandler}>
      <Input.Text
        ref={inputRef}
        type={type}
        value={value}
        $disabled={$disabled}
        onChange={onChange}
        {...rest}
      />
    </Input.Container>
  );
};

export default InputText;
