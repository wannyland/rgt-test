import styled from "styled-components";

const MainContent = styled.div`
  flex-grow: 1;
  padding: 50px;
  width: 100%;
  margin: 20px;
  border-radius: 12px;
  background-color: #fff;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;

  input {
    width: 590px;
    padding: 5px;
    font-size: 16px;
  }

  button {
    padding: 5px;
  }
`;

export const S = {
  MainContent,
  SearchBar,
};
