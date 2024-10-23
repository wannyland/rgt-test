import { ComponentPropsWithoutRef, PropsWithChildren } from "react";

// Navbar 공통 모델
export interface GlobalNav {
  navOpen: boolean;
}

// Table > Td Style Props
export interface StyledTdProps {
  $align?: "left" | "right" | "center";
}

// Table > Tr Style Props
export interface TrProps extends ComponentPropsWithoutRef<"tr"> {
  onClick?: VoidFunction;
}

// Table > Td Style Props
export interface TdProps
  extends ComponentPropsWithoutRef<"td">,
    PropsWithChildren {
  align?: "left" | "right" | "center";
}

// 검색 Param 기본 모델
export interface SearchParamModel extends PaginationModel {
  value?: string;
}

// 페이지네이션 기본 모델
export interface PaginationModel {
  per: number;
  page: number;
}
