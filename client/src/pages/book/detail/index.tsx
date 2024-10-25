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
import {
  DETAIL_BOOK_KEY_GET,
  EDIT_BOOK_KEY_PUT,
  PUT,
} from "config/queryKey/books";
import { returnSuccessBookDetail } from "config/queryOption/books";
import useGetQuery from "hooks/useGetQuery";
import useTMutation from "hooks/useTMuatation";
import { BookModel } from "model/books";
import { GenericResponse } from "model/common";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { S } from "../index.styled";

interface EditStatus {
  readonly: boolean;
}
const BookDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [status, setStatus] = useState<EditStatus>({
    readonly: true,
  });

  const [book, setBook] = useState<BookModel>({
    id: -1,
    name: "",
    author: "",
    count: 0,
  });

  // 책 기존 정보 불러오기
  const { data: bookInfo, refetch: getBookInfo } = useGetQuery(
    [DETAIL_BOOK_KEY_GET],
    () => API.books.get({ id }),
    {
      ...returnSuccessBookDetail,
      onSuccess: (data) => {
        setBook(data);
      },
    }
  );

  // 수정하기
  const { mutate: tryEdit, isLoading: editLoading } = useTMutation(
    [EDIT_BOOK_KEY_PUT, PUT],
    (data: BookModel) => API.books.edit(data),
    (rs: GenericResponse<null>) => bookSuccessCallback(rs)
  );

  // 삭제하기
  const { mutate: tryDelete, isLoading: deleteLoading } = useTMutation(
    [EDIT_BOOK_KEY_PUT, PUT],
    (id: number) => API.books.delete(id),
    (rs: GenericResponse<null>) => bookSuccessCallback(rs)
  );

  // 수정 및 삭제 성공 콜백
  const bookSuccessCallback = (rs: GenericResponse<null>) => {
    alert(rs.message);

    if (rs.code === 200) {
      navigate("/books");
      return;
    }
  };
  const onChangeInputTextHandler = (
    e: ChangeEvent<HTMLInputElement>,
    type: keyof BookModel
  ) => {
    setBook((_) => ({
      ..._,
      [type]: e.target.value,
    }));
  };

  const statusHandler = (status: boolean) => {
    setStatus((_) => ({
      ..._,
      readonly: status,
    }));
  };

  useEffect(() => {
    getBookInfo();
  }, []);
  return (
    <S.MainContent>
      <PageTitle title={`책 ${status.readonly ? "상세" : "수정"}`} />
      <InputWrapper>
        <InputContainer>
          <InputTitle>책 제목</InputTitle>
          <InputText
            value={book.name}
            onChange={(e) => onChangeInputTextHandler(e, "name")}
            readOnly={status.readonly}
            placeholder="제목을 입력해 주세요."
          />
        </InputContainer>

        <InputContainer>
          <InputTitle>책 저자</InputTitle>
          <InputText
            value={book.author}
            onChange={(e) => onChangeInputTextHandler(e, "author")}
            readOnly={status.readonly}
            placeholder="저자 또는 작가를 입력해 주세요."
          />
        </InputContainer>

        <InputContainer>
          <InputTitle>판매 수량</InputTitle>
          <InputText
            type="text"
            value={book.count}
            onChange={(e) => onChangeInputTextHandler(e, "count")}
            readOnly={status.readonly}
            placeholder="판매 수량을 입력해 주세요."
          />
        </InputContainer>
      </InputWrapper>

      <ButtonBox>
        <Button
          $style="negative"
          onClick={() => tryDelete(book.id)}
          disabled={status.readonly}
        >
          삭제하기
        </Button>
        <Button
          $style="primary"
          onClick={
            status.readonly ? () => statusHandler(false) : () => tryEdit(book)
          }
        >
          {`${status.readonly ? "수정" : "등록"}`}하기
        </Button>
      </ButtonBox>
    </S.MainContent>
  );
};

export default BookDetail;
