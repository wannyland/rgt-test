import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Number = styled.button<{ active: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${({ active }) => (active ? "#007bff" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#000")};
  border: 1px solid #ddd;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
    color: #fff;
  }
`;

const Arrow = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  border: 1px solid #ddd;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:hover:not(:disabled) {
    background-color: #007bff;
    color: #fff;
  }
`;

export const P = {
  Container,
  Number,
  Arrow,
};
