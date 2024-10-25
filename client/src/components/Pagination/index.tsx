import { useEffect, useState } from "react";
import { P } from "./index.styled";

interface Props {
  totalItem: number; // Item 의 총 갯수
  currentPage: number; // 현재 페이지 default 1
  setCurrentPage: (e: number) => void; // 클릭 페이지 set
  limit: number; // 페이지당 아이템 수
  isLast?: boolean; // 다음 페이지가 없는지 여부
}

const Pagination = ({
  isLast,
  totalItem,
  currentPage,
  setCurrentPage,
  limit,
}: Props) => {
  const next = limit;
  const total = totalItem ? totalItem : 1;
  const totalPage =
    totalItem % limit !== 0
      ? Math.floor(totalItem / next) + 1
      : Math.floor(totalItem / next);

  const pagePre = 5;

  // 현재 페이지 상태
  const [page, setPage] = useState(currentPage ? currentPage : 1);

  // 현재 표시되는 페이지 번호 목록
  const [pageList, setPageList] = useState<Array<number>>([]);

  const onClickPage = (e: number) => {
    if (e <= 0) return;

    setPage(e);
    setCurrentPage(e);
  };

  // 다음 페이지
  const onClickNextPage = () => {
    // 현재 페이지가 어느 페이지 그룹에 속하는지 계산
    let current =
      page % pagePre !== 0
        ? Math.floor(page / pagePre) + 1
        : Math.floor(page / pagePre);

    // 사용자가 다음 페이지 그룹으로 이동할 때의 첫 번째 페이지 산정
    const nextPage =
      current * pagePre + 1 < totalPage ? current * pagePre + 1 : totalPage;

    onClickPage(nextPage);
  };

  // 페이지 그룹을 동적으로 생성
  useEffect(() => {
    // 현재 페이지가 어느 페이지 그룹에 속하는지 계산
    let current =
      page % pagePre !== 0
        ? Math.floor(page / pagePre) + 1
        : Math.floor(page / pagePre);
    current = current > 0 ? current : 1;

    // 페이지 목록 생성
    const pl = [];
    for (let i = 0; i < pagePre; i++) {
      const p = i + 1 + (current - 1) * pagePre;

      if (p <= totalPage) pl.push(p); // 페이지 목록에 추가
    }
    setPageList(pl); // 페이지 목록 상태 업데이트
  }, [page, total]);

  return (
    <P.Container>
      <P.Arrow
        onClick={() => onClickPage(1)}
        disabled={totalItem < 1 || page <= 1}
      >
        &lt;
      </P.Arrow>
      {pageList.length > 0 ? (
        pageList.map((_, i) => {
          return (
            <P.Number
              key={`page_${_}`}
              onClick={() => onClickPage(_)}
              active={currentPage === i + 1}
            >
              {_}
            </P.Number>
          );
        })
      ) : (
        <P.Number active={true}>1</P.Number>
      )}
      <P.Arrow onClick={onClickNextPage} disabled={isLast}>
        &gt;
      </P.Arrow>
    </P.Container>
  );
};

export default Pagination;
