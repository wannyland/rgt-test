import InputText from "components/Atoms/Input/Text";
import PageTitle from "components/Atoms/PageTitle";
import { InputTitle } from "components/Atoms/PageTitle/index.styled";
import {
  InputContainer,
  InputWrapper,
} from "components/Atoms/Wrapper/index.styled";
import { S } from "../index.styled";

const BookDetail = () => {
  return (
    <S.MainContent>
      <PageTitle title="책 상세" />
      <InputWrapper>
        <InputContainer>
          <InputTitle>책 제목</InputTitle>
          <InputText placeholder="제목을 입력해 주세요." />
        </InputContainer>

        <InputContainer>
          <InputTitle>책 저자</InputTitle>
          <InputText />
        </InputContainer>

        <InputContainer>
          <InputTitle>판매 수량</InputTitle>
          <InputText />
        </InputContainer>
      </InputWrapper>
    </S.MainContent>
  );
};

export default BookDetail;
