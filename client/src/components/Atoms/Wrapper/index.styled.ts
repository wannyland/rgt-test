import styled from "styled-components";

// 인풋 기본 wrapper 스타일
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-block-end: 2rem;
  gap: 5px;
  flex: 1 1 calc(calc(100% / 3) - calc(2rem * 2 / 3));
`;

// 페이지 제목 스타일
export const PageTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  // 부모 padding 만큼
  margin-top: -52px;

  justify-content: space-between;
  padding: 2rem 0;
`;
