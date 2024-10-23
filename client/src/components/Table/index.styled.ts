import { StyledTdProps } from "model/common";
import styled from "styled-components";

export const StyledTable = styled.div`
  overflow: auto hidden;
  overflow-y: auto;

  .scrollBox {
    display: flex;
    flex-wrap: nowrap;

    table {
      width: 100%;
      table-layout: fixed;

      thead {
        background-color: rgb(244, 246, 249);
      }
    }
  }
`;

export const StyledTd = styled.td<StyledTdProps>`
  padding-block: 1.4rem;
  font-weight: 400;
  font-size: 1.3rem;
  text-align: ${(p) => p.$align};
  padding-inline: 1.2rem;
  border-bottom: 1px solid #e6e8ec;

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  img {
    width: 56px;
    height: 56px;
  }
`;

export const StyledTr = styled.tr`
  position: relative;
  -webkit-transform: translateZ(0);

  .cursor_pointer {
    cursor: pointer;
  }

  &.nodata {
    height: 48.5px;
    ${StyledTd} {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export const StyledTBody = styled.tbody`
  ${StyledTr} {
    &:hover {
      background-color: rgba(242, 248, 254, 0.5);
    }
  }
`;
