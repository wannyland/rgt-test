import { ButtonStyleType } from "model/common";
import { ComponentPropsWithRef } from "react";
import { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";
import { StyledButton } from "./index.styled";

interface ButtonProps
  extends ComponentPropsWithRef<
    IStyledComponent<
      "web",
      Substitute<
        React.DetailedHTMLProps<
          React.ButtonHTMLAttributes<HTMLButtonElement>,
          HTMLButtonElement
        >,
        {}
      >
    >
  > {
  $style?: ButtonStyleType;
  type?: "button" | "submit" | "reset";
  $loading?: boolean;
  children: React.ReactNode;
}
const Button = ({
  children,
  $loading,
  $style,
  type = "button",
  ...rest
}: ButtonProps) => {
  return (
    <StyledButton $style={$style} type={type} $loading={$loading} {...rest}>
      <span>{children}</span>
    </StyledButton>
  );
};

export default Button;
