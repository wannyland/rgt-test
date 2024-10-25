import { InputConTainerProps } from "model/common";
import { styled } from "styled-components";

// $disabled 가 props 에 있지만 사용하지 않음
// readonly 사용
const Container = styled.div<InputConTainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  height: 30px;
  border-radius: 0.4rem;
  background-color: #fff;
  cursor: text;

  &:has(input:read-only) {
    border: none;
    background-color: #f5f6f7;
    input {
      cursor: default;
    }
  }
`;

const Text = styled.input`
  flex: 1;
  height: 100%;
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
