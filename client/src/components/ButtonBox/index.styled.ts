import { StyledButton } from "components/Atoms/Button/index.styled";
import { styled } from "styled-components";

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  margin-top: auto;
  padding-block-start: 2rem;

  // 기존 스타일 했던 버튼
  ${StyledButton} {
    width: 14rem;
  }
`;
