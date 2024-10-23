import { useEffect, useState } from "react";
import { P } from "./index.styled";

interface Props {
  totalItem: number; // Item 의 총 갯수
  currentPage: number; // 현재 페이지 default 1
  setCurrentPage: (e: number) => void; // 클릭 페이지 set
  limit: number; // limit
  isLast?: boolean;
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

  const [page, setPage] = useState(currentPage ? currentPage : 1);
  const [pageList, setPageList] = useState<Array<number>>([]);

  const onClickPage = (e: number) => {
    if (e <= 0) return;

    setPage(e);
    setCurrentPage(e);
  };

  const onClickNextPage = () => {
    let current =
      page % pagePre !== 0
        ? Math.floor(page / pagePre) + 1
        : Math.floor(page / pagePre);
    const nextPage =
      current * pagePre + 1 < totalPage ? current * pagePre + 1 : totalPage;

    onClickPage(nextPage);
  };

  useEffect(() => {
    let current =
      page % pagePre !== 0
        ? Math.floor(page / pagePre) + 1
        : Math.floor(page / pagePre);
    current = current > 0 ? current : 1;

    const pl = [];
    for (let i = 0; i < pagePre; i++) {
      const p = i + 1 + (current - 1) * pagePre;

      if (p <= totalPage) pl.push(p);
    }
    setPageList(pl);
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
        <P.Number active={false}>1</P.Number>
      )}
      <P.Arrow onClick={onClickNextPage} disabled={isLast}>
        &gt;
      </P.Arrow>
    </P.Container>
  );
};

export default Pagination;
