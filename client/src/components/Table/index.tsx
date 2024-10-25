import { TdProps, TrProps } from "model/common";
import { ComponentPropsWithoutRef } from "react";
import { IStyledComponent } from "styled-components";
import { Substitute } from "styled-components/dist/types";
import { StyledTable, StyledTBody, StyledTd, StyledTr } from "./index.styled";

interface TableProps
  extends ComponentPropsWithoutRef<
    IStyledComponent<
      "web",
      Substitute<
        React.DetailedHTMLProps<
          React.HTMLAttributes<HTMLDivElement>,
          HTMLDivElement
        >,
        {}
      >
    >
  > {}

const Table = ({ ...rest }: TableProps) => {
  return (
    <>
      <StyledTable>
        <div className="scrollBox">
          <table {...rest} />
        </div>
      </StyledTable>
    </>
  );
};

const TBody = ({ ...rest }: ComponentPropsWithoutRef<"tbody">) => {
  return <StyledTBody {...rest} />;
};

const Tr = ({ onClick, ...rest }: TrProps) => {
  return (
    <StyledTr
      onClick={onClick}
      className={onClick ? "cursor_pointer" : ""}
      {...rest}
    />
  );
};

const Td = ({
  color = "black",
  align = "center",
  children,
  ...rest
}: TdProps) => {
  return (
    <StyledTd className="ellipsis" $align={align} {...rest}>
      {children}
    </StyledTd>
  );
};

const TableNoData = ({ msg = "등록된 데이터가 없습니다." }) => {
  return (
    <Tr className="nodata">
      <Td>{msg}</Td>
    </Tr>
  );
};

export { Table, TableNoData, TBody, Td, Tr };
