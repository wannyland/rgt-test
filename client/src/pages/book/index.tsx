import API from "api";
import Button from "components/Atoms/Button";
import PageTitle from "components/Atoms/PageTitle";
import Pagination from "components/Pagination";
import { Table, TableNoData, TBody, Td, Tr } from "components/Table";
import { BOOK_LIST_KEY_GET } from "config/queryKey/books";
import { returnSuccessBookList } from "config/queryOption/books";
import { addNumberComma } from "function";
import useDebounce from "hooks/useDebounce";
import useGetQuery from "hooks/useGetQuery";
import { SearchParamModel } from "model/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { S } from "./index.styled";

// Types 정의
interface Item {
  id: number;
  name: string;
  description: string;
}

const BookList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<SearchParamModel>({
    word: "",
    per: 10,
    page: 1,
  });

  const {
    data: books,
    refetch: getBooksList,
    isLoading,
  } = useGetQuery(
    [BOOK_LIST_KEY_GET],
    () => API.books.get(search),
    returnSuccessBookList
  );

  // 페이지네이션, word 검색 이벤트 핸들러
  const onChangeSearchHandler = (e: string | number, type: "word" | "page") => {
    setSearch((_) => ({
      ..._,
      [type]: e,
    }));
  };

  // debounce 적용
  const debounceSearch = useDebounce(getBooksList, 300);

  useEffect(() => {
    debounceSearch();
  }, [search]);

  return (
    <S.MainContent>
      <PageTitle title="책 관리" />
      <S.SearchBar>
        <input
          type="text"
          placeholder="제목 또는 저자를 입력하세요"
          value={search.word}
          onChange={(e) => onChangeSearchHandler(e.target.value, "word")}
        />

        <Button onClick={() => navigate("create")} $style="primary">
          추가하기
        </Button>
      </S.SearchBar>
      <Table>
        <colgroup>
          <col />
          <col width={"280px"} />
          <col width={"80px"} />
          <col width={"150px"} />
        </colgroup>
        <thead>
          <Tr>
            <th>제목</th>
            <th>저자</th>
            <th>판매 수량</th>
            <th>등록일</th>
          </Tr>
        </thead>
        <TBody>
          {books && books.list && books.list.length > 0 ? (
            books?.list.map((_, i) => (
              <Tr key={`book_${i}_${_.id}`} onClick={() => navigate(`${_.id}`)}>
                <Td>{_.name}</Td>
                <Td>{_.author}</Td>
                <Td>{addNumberComma(_.count)}</Td>
                <Td>{_.registeredAt}</Td>
              </Tr>
            ))
          ) : (
            <TableNoData />
          )}
        </TBody>
      </Table>
      <Pagination
        totalItem={books?.totalCount ?? 0}
        currentPage={search.page ?? 1}
        setCurrentPage={(e) => onChangeSearchHandler(e, "page")}
        limit={search.per ?? 10}
        isLast={books?.isLast}
      />
    </S.MainContent>
  );
};

export default BookList;
