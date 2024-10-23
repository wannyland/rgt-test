import Pagination from "components/Pagination";
import { Table, TBody, Td, Tr } from "components/Table";
import { SearchParamModel } from "model/common";
import { useEffect, useState } from "react";
import styled from "styled-components";

// Types 정의
interface Item {
  id: number;
  name: string;
  description: string;
}

const BookList = () => {
  const [search, setSearch] = useState<SearchParamModel>({
    per: 10,
    page: 1,
  });

  const [data, setData] = useState<Item[]>([]);

  // 데이터 로드
  useEffect(() => {
    // 예시 데이터 로드 (여기서는 목업 데이터를 사용)
    const fetchData = async () => {
      const mockData: Item[] = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
        description: `Description of Item ${i + 1}`,
      }));
      setData(mockData);
    };

    fetchData();
  }, []);

  const onChangeSearchHandler = (
    e: string | number,
    type: "value" | "page"
  ) => {
    setSearch((_) => ({
      ..._,
      [type]: e,
    }));
  };

  return (
    <MainContent>
      <SearchBar>
        <input
          type="text"
          placeholder="제목 또는 저자를 입력하세요"
          value={search.value}
          onChange={(e) => onChangeSearchHandler(e.target.value, "value")}
        />

        <button>추가하기</button>
      </SearchBar>
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
          </Tr>
        </thead>
        <TBody>
          {data.map((item) => (
            <Tr key={item.id} onClick={() => {}}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.description}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      <Pagination
        totalItem={data.length ?? 0}
        currentPage={1}
        setCurrentPage={(e) => onChangeSearchHandler(e, "page")}
        limit={search.per}
        isLast={false}
      />
    </MainContent>
  );
};

export default BookList;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 50px;
  width: 100%;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  input {
    width: 590px;
    padding: 10px;
    font-size: 16px;
  }
`;
