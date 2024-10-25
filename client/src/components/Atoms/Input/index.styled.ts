import { InputConTainerProps } from "model/common";
import { css, styled } from "styled-components";

const Container = styled.div<InputConTainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 30px;
  border: 1px solid;
  border-radius: 0.4rem;
  background-color: ${(p) => (p.$disabled ? "#f5f6f7" : "#fff")};
  cursor: text;

  &:has(input:read-only) {
    border: none;
    input {
      cursor: default;
    }
    .input_delete_value {
      display: none;
    }
  }
`;

const Text = styled.input<{ $disabled?: boolean }>`
  flex: 1;
  height: 100%;

  ${(p) =>
    p.$disabled &&
    css`
      background-color: #f5f6f7;
      input {
        cursor: default;
      }
    `}
`;
const Error = styled.p`
  padding-block-start: 8px;
  color: red;
  font-size: 1.3rem;
`;

export const Input = {
  Container,
  Text,
  Error,
};
