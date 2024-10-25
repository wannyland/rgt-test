import API from "api";
import Button from "components/Atoms/Button";
import InputText from "components/Atoms/Input/Text";
import PageTitle from "components/Atoms/PageTitle";
import { InputTitle } from "components/Atoms/PageTitle/index.styled";
import {
  InputContainer,
  InputWrapper,
} from "components/Atoms/Wrapper/index.styled";
import { ButtonBox } from "components/ButtonBox/index.styled";
import { CREATE_BOOK_KEY_POST, POST } from "config/queryKey/books";
import useTMutation from "hooks/useTMuatation";
import { CreateBookModel } from "model/books";
import { GenericResponse } from "model/common";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "../index.styled";

const CreateBook = () => {
  const navigate = useNavigate();
  const [book, setBooks] = useState<CreateBookModel>({
    name: "",
    author: "",
    count: 0,
  });

  const { mutate: tryCreate, isLoading } = useTMutation(
    [CREATE_BOOK_KEY_POST, POST],
    (data: CreateBookModel) => API.books.create(data),
    (rs: GenericResponse<null>) => createBookSuccessCallback(rs)
  );

  const createBookSuccessCallback = (rs: GenericResponse<null>) => {
    alert(rs.message);

    if (rs.code === 200) {
      navigate("books");
      return;
    }
  };

  const onChangeInputTextHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof CreateBookModel
  ) => {
    setBooks((_) => ({
      ..._,
      [type]: e.target.value,
    }));
  };
  return (
    <S.MainContent>
      <PageTitle title="책 등록하기" />
      <InputWrapper>
        <InputContainer>
          <InputTitle>책 제목</InputTitle>
          <InputText
            value={book.name}
            onChange={(e) => onChangeInputTextHandler(e, "name")}
            placeholder="제목을 입력해 주세요."
          />
        </InputContainer>

        <InputContainer>
          <InputTitle>책 저자</InputTitle>
          <InputText
            value={book.author}
            onChange={(e) => onChangeInputTextHandler(e, "author")}
            placeholder="저자 또는 작가를 입력해 주세요."
          />
        </InputContainer>

        <InputContainer>
          <InputTitle>판매 수량</InputTitle>
          <InputText
            type="text"
            value={book.count}
            onChange={(e) => onChangeInputTextHandler(e, "count")}
            placeholder="판매 수량을 입력해 주세요."
          />
        </InputContainer>
      </InputWrapper>

      <ButtonBox>
        <Button
          $style="primary"
          onClick={() => tryCreate(book)}
          $loading={isLoading}
        >
          등록하기
        </Button>
      </ButtonBox>
    </S.MainContent>
  );
};

export default CreateBook;
