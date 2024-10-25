import API from "api";
import Button from "components/Atoms/Button";
import Pagination from "components/Pagination";
import { Table, TableNoData, TBody, Td, Tr } from "components/Table";
import { BOOK_LIST_KEY_GET } from "config/queryKey/books";
import { returnSuccessBookList } from "config/queryOption/books";
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

  const { data: books, refetch: getBooksList } = useGetQuery(
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

  useEffect(() => {
    getBooksList();
  }, [search]);

  return (
    <S.MainContent>
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
          <col />
        </colgroup>
        <thead>
          <Tr>
            <th>No</th>
            <th>제목</th>
            <th>저자</th>
            <th>판매 수량</th>
            <th>등록일</th>
          </Tr>
        </thead>
        <TBody>
          {books && books.list.length > 0 ? (
            books?.list.map((_, i) => (
              <Tr key={`book_${_.id}`} onClick={() => navigate(`${_.id}`)}>
                <Td>{_.id}</Td>
                <Td>{_.name}</Td>
                <Td>{_.author}</Td>
                <Td>{_.count}</Td>
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
        currentPage={search.page}
        setCurrentPage={(e) => onChangeSearchHandler(e, "page")}
        limit={search.per}
        isLast={books?.isLast}
      />
    </S.MainContent>
  );
};

export default BookList;
